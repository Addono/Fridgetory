import {useState} from "react";

import {Card, Divider, Tag, Select} from 'antd';

const {Option} = Select;

const quantities = [1, 5, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
const quantityOptions = quantities
    .map(q => `${q}g`)
    .map((quantity, index) => (
        <Option key={index} value={quantity} style={{width: "100px"}}>{quantity}</Option>
    ))

const Product = ({name}) => {
    const [amount, setAmount] = useState<{ quantity: string }[]>([])

    return (
        <div style={{width: '400px'}}>
            <Divider>{name}</Divider>
            {amount.map(({quantity}, index) => (
                <Tag closable key={index} onClose={(e) => {
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

const availableProducts = [
    'Broccoli',
    'Eggplant 🍆',
    'Corn 🌽',
]
const availableProductOptions = availableProducts.map((product) => (
    <Option key={product} value={product}>{product}</Option>
))

const Drawer = ({title}) => {
    const [products, setProducts] = useState<{ name: string }[]>([])

    return (
        <Card title={title} style={{width: "100%"}}>
            <Select
                onSelect={(product: string) => setProducts(products.concat([{name: product}]))}
                placeholder={"Add product"}
            >
                {availableProductOptions}
            </Select>
            {products
                .sort(({name: nameThis}, {name: nameOther}) => nameThis.localeCompare(nameOther))
                .map(({name}) => <Product name={name}/>)}
        </Card>
    )
}

export default Drawer

