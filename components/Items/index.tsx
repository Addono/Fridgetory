import {Divider, Select, Spin, Tag} from "antd";
import {gql, useMutation} from "@apollo/client";
import {Item, QUERY_PLACES} from "../Places";

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

const MUTATION_DELETE_ITEM = gql`
    mutation DeleteItem($id: Int!) {
        deleteOneItem(where: {id: $id}) {
            id
        }
    }
`

const Items = ({productId, name, items}: { productId: number, name: string, items: Item[] }) => {
    const [addItem, {loading}] = useMutation(MUTATION_ADD_ITEM, {refetchQueries: [{query: QUERY_PLACES}]})
    const [deleteItem] = useMutation(MUTATION_DELETE_ITEM, {refetchQueries: [{query: QUERY_PLACES}]})

    return (
        <div style={{width: '400px'}}>
            <Divider>{name}</Divider>
            {items.map(({quantity, id}, index) => (
                <Tag closable key={id} onClose={(e: Event) => {
                    e.preventDefault();
                    deleteItem({variables: {id}})
                }}>
                    {quantity}
                </Tag>
            ))}
            <Select
                style={{width: '5em'}}
                placeholder="Add"
                value={[]}
                onSelect={(index) => addItem({variables: {...quantities[index], productId}})}
            >
                {quantityOptions}
            </Select>
            {loading && <Spin/>}
        </div>
    )
}

export default Items
