import { gql, useQuery } from '@apollo/client'

import { Space, Result, Button, Empty } from 'antd'

import Place from '../Place'
import AddPlace from './AddPlace'
import Loading from '../Loading'
import { useState } from 'react'
import ServerErrorAnimatedIcon from '../Error/ServerErrorAnimatedIcon'

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
        items(orderBy: { createdAt: asc }) {
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
      {refetching ? 'Retrying' : 'Retry?'}
    </Button>
  )
}

const Places = () => {
  const { loading, error, data, refetch } = useQuery<QueryAllItemsByPlace>(QUERY_PLACES, {
    pollInterval: 5000,
    fetchPolicy: 'cache-first',
  })

  // Show a loading indicator
  if (loading) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', width: '100%', marginTop: '3em' }}>
        <Loading />
      </div>
    )
  }

  // Handle the case if there's an error
  if (error) {
    return (
      <Result
        title={'Oops!'}
        subTitle={"This shouldn't have happened."}
        icon={
          <Space align={'center'} style={{ width: '50%', height: '50%' }}>
            <ServerErrorAnimatedIcon />
          </Space>
        }
        extra={<RetryButton refetch={refetch} />}
      />
    )
  }

  // Handle the case where we received no data
  if (!data) {
    return <Result status="404" title="It's empty" subTitle="Nothing here. Try adding something!" />
  }

  return (
    <Space data-cy={'places'} direction="vertical" style={{ width: '100%' }}>
      {data.places.length === 0 ? (
        <Empty description={'No places added yet. Create one below.'} style={{ padding: '2em' }} />
      ) : (
        data.places.map(({ id, name, products }) => <Place key={id} id={id} name={name} products={products} />)
      )}
      <AddPlace />
    </Space>
  )
}

export default Places
