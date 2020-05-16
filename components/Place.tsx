import {Card, Divider, Tag, Select, Spin} from 'antd';

import {Item, Product, QUERY_PLACES} from "./Places";
import AddProduct from "./AddProduct";
import {gql, useMutation} from "@apollo/client";


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

const Items = ({productId, name, items}: { productId: number, name: string, items: Item[] }) => {
    const [addItem, { loading }] = useMutation(MUTATION_ADD_ITEM, { refetchQueries: [{query: QUERY_PLACES}]})

    return (
        <div style={{width: '400px'}}>
            <Divider>{name}</Divider>
            {items.map(({quantity}, index) => (
                <Tag closable key={index} onClose={(e: Event) => {
                    e.preventDefault();
                    // setAmount(amount.filter((_, i) => i !== index))
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
            { loading && <Spin />}
        </div>
    )
}

const Place = ({id, name, products}: { id: number, name: string, products: Product[] }) => (
    <Card title={name} style={{width: "100%"}}>
        {products.map(({id, items, productType: {name}}) => <Items productId={id} key={name} name={name} items={items}/>)}
        <Divider/>
        <AddProduct placeId={id} existingProducts={products}/>
    </Card>
)


export default Place

