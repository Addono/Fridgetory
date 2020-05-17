import {Divider, Select, Tag} from "antd";
import {ApolloClient, gql, useApolloClient, useMutation} from "@apollo/client";
import {Item, QUERY_PLACES, QueryAllItemsByPlace} from "../Places";

const quantities = [1, 5, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    .map(quantity => ({quantity, unit: "g"}))

const quantityOptions = quantities
    .map(({quantity, unit}, index) => (
        <Select.Option key={index} value={index} style={{width: "100px"}}>{quantity}{unit}</Select.Option>
    ))

const MUTATION_ADD_ITEM = gql`
    mutation AddItem($productId: Int!, $quantity: Float!, $unit: String!) {
        createOneItem(data: {
            product: {connect: {id: $productId}}
            quantity: $quantity
            unit: $unit
        }) {
            id
        }
    }
`

const updateItemInData = ({places, ...args}: QueryAllItemsByPlace, productId: number, item: Item): QueryAllItemsByPlace => ({
    ...args,
    places: places.map(({products, ...args}) => (
        {
            ...args,
            products: products.map(({id, items, ...args}) => (
                {
                    id,
                    ...args,
                    items: productId === id ? items.concat([item]) : items,
                })
            )
        })
    )
})

const addItemToCache = ({productId, client, item}: { productId: number, client: ApolloClient<Object>, item: Item }) => {
    const data: QueryAllItemsByPlace | null = client.readQuery({query: QUERY_PLACES})

    // Only update the data if there was actually something in the cache
    if (data) {
        client.writeQuery({
            query: QUERY_PLACES,
            data: updateItemInData(data, productId, item)
        })
    }
}

const MUTATION_DELETE_ITEM = gql`
    mutation DeleteItem($id: Int!) {
        deleteOneItem(where: {id: $id}) {
            id
        }
    }
`

const Items = ({productId, name, items}: { productId: number, name: string, items: Item[] }) => {
    const [addItemMutation, {loading}] = useMutation(MUTATION_ADD_ITEM, {refetchQueries: [{query: QUERY_PLACES}]})
    const [deleteItem] = useMutation(MUTATION_DELETE_ITEM, {refetchQueries: [{query: QUERY_PLACES}]})
    const client = useApolloClient()

    const addItem = ({quantity, unit}: { quantity: number, unit: string }) => {
        // Update the cache to immediately reflect the change
        addItemToCache({productId, item: {quantity, unit, id: -1}, client})

        // Execute the mutation for persistent storage of the change
        addItemMutation({variables: {quantity, unit, productId}})
    }

    return (
        <div style={{width: '100%'}}>
            <Divider>{name}</Divider>
            {items.map(({quantity, unit, id}, index) => (
                <Tag
                    closable={id >= 0} // Hide the close button for items merely existing in cache
                    key={id}
                    onClose={(e: Event) => {
                        e.preventDefault();
                        deleteItem({variables: {id}})
                    }}>
                    {quantity}{unit}
                </Tag>
            ))}
            <Select
                style={{width: '5em'}}
                placeholder="Add"
                value={[]}
                onSelect={(index) => addItem(quantities[index])}
            >
                {quantityOptions}
            </Select>
        </div>
    )
}

export default Items
