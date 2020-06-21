import { gql, useQuery } from '@apollo/client'

import { Space } from 'antd'

import Place from '../Place'
import AddPlace from './AddPlace'
import Loading from '../Loading'

export interface Item {
  id: number
  quantity: number
  unit: string
}

export interface Product {
  id: number
  productType: {
    name: string
  }
  items: Item[]
}

export interface IPlace {
  id: number
  name: string
  products: Product[]
}

export interface QueryAllItemsByPlace {
  places: IPlace[]
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
  const { loading, error, data } = useQuery<QueryAllItemsByPlace>(QUERY_PLACES, {
    pollInterval: 60000,
    fetchPolicy: 'cache-first',
  })

  if (loading) return <Loading />
  if (error)
    return <p>Ooh no, something went wrong 😿. Sometimes reloading the page works, so you could try that 🤷🏻‍♀️.</p>
  if (!data) return <p>Couldn't find anything, try adding something!</p>

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {data.places.map(({ id, name, products }) => (
        <Place key={id} id={id} name={name} products={products} />
      ))}
      <AddPlace />
    </Space>
  )
}

export default Places
