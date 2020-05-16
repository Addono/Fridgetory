import {gql, useQuery} from "@apollo/client";

import {Space, Spin} from "antd";

import Place from "../Place";
import AddPlace from "./AddPlace";

export interface Item {
    id: number,
    quantity: number,
    unit: string,
}

export interface Product {
    id: number
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
                id
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
    const {loading, error, data} = useQuery<QueryAllItemsByPlace>(QUERY_PLACES, { pollInterval: 1000})

    if (loading) return <Spin />
    if (error) return <p>Something didn't really work out 😿</p>
    if (!data) return <p>Couldn't find anything, try adding something!</p>

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