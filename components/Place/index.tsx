import {Card, Divider} from 'antd';

import {Product} from "../Places";
import AddProduct from "../AddProduct";
import Items from "../Items";


const Place = ({id, name, products}: { id: number, name: string, products: Product[] }) => (
    <Card title={name} style={{width: "100%"}}>
        {products.map(({id, items, productType: {name}}) =>
            <Items productId={id}
                   key={name}
                   name={name}
                   items={items}
            />)}
        <Divider/>
        <AddProduct placeId={id} existingProducts={products}/>
    </Card>
)

export default Place
