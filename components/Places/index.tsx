import { gql, useQuery } from '@apollo/client'

import { Space, Result, Button } from 'antd'

import Place from '../Place'
import AddPlace from './AddPlace'
import Loading from '../Loading'
import { useState } from 'react'

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

const RetryButton = ({ refetch, duration = 2000 }: { refetch: () => void; duration?: number }) => {
  const [refetching, setRefetching] = useState<boolean>(false)

  return (
    <Button
      type={'primary'}
      onClick={() => {
        refetch()
        setRefetching(true)
        setTimeout(() => setRefetching(false), duration)
      }}
      loading={refetching}
    >
      Retry
    </Button>
  )
}

const Places = () => {
  const { loading, error, data, refetch } = useQuery<QueryAllItemsByPlace>(QUERY_PLACES, {
    pollInterval: 60000,
    fetchPolicy: 'cache-first',
  })

  if (loading) return <Loading />
  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong when getting the latest data."
        extra={<RetryButton refetch={refetch} />}
      />
    )
  }
  if (!data) {
    return <Result status="404" title="It's empty" subTitle="Nothing here. Try adding something!" />
  }

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
