import {gql, useQuery} from "@apollo/client";

import {Space} from "antd";

import Place from "../Place";
import AddPlace from "./AddPlace";

export interface Item {
    id: number,
    quantity: number,
    unit: string,
}

export interface Product {
    productType: {
        name: string
    },
    items: Item[]
}

interface QueryAllItemsByPlace {
    places: [{
        id: number,
        name: string,
        products: Product[]
    }]
}

export const QUERY_PLACES = gql`
    query GetPlaces {
        places {
            id
            name
            products {
                productType {
                    name
                }
                items {
                    id
                    quantity
                    unit
                }
            }
        }
    }
`

const Places = () => {
    const {loading, error, data} = useQuery<QueryAllItemsByPlace>(QUERY_PLACES)

    console.log(loading)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Something didn't really work out 😿</p>
    if (!data) return <p>Couldn't find anything, try adding something!</p>

    console.log(data)

    return (
        <Space direction="vertical" style={{width: "100%"}}>
            {data.places.map(({id, name, products}) => (
                <Place key={id} id={id} name={name} products={products}/>
            ))}
            <AddPlace/>
        </Space>
    )
}

export default Places