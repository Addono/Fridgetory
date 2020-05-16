import {useState} from "react";

import {Card, Divider, Tag, Select} from 'antd';
import { Product } from "./Places";
import AddProduct from "./AddProduct";


const quantities = [1, 5, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
const quantityOptions = quantities
    .map(q => `${q}g`)
    .map((quantity, index) => (
        <Select.Option key={index} value={quantity} style={{width: "100px"}}>{quantity}</Select.Option>
    ))

const Items = ({name}: {name: string}) => {
    const [amount, setAmount] = useState<{ quantity: string }[]>([])

    return (
        <div style={{width: '400px'}}>
            <Divider>{name}</Divider>
            {amount.map(({quantity}, index) => (
                <Tag closable key={index} onClose={(e: Event) => {
                    e.preventDefault();
                    setAmount(amount.filter((_, i) => i !== index))
                }}>
                    {quantity}
                </Tag>
            ))}
            <Select
                style={{width: '5em'}}
                placeholder="Add"
                value={[]}
                onSelect={(value) => setAmount(amount.concat([{quantity: value}]))}
            >
                {quantityOptions}
            </Select>
        </div>
    )
}

const Place = ({id, name, products}: { id: number, name: string, products: Product[] }) => {

    return (
        <Card title={name} style={{width: "100%"}}>
            {products.map(({items, productType: {name}}) => <Items key={name} name={name} />)}
            <Divider/>
            <AddProduct placeId={id} existingProducts={products}/>
        </Card>
    )
}

export default Place

