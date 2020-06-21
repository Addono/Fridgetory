import { Card, Space } from 'antd'

import { gql, useMutation } from '@apollo/client'

import { Product, QUERY_PLACES } from '../Places'
import AddProduct from '../AddProduct'
import Items from '../Items'
import { EditableTitle } from '../EditableTitle'

const MUTATION_EDIT_NAME_FOR_PLACE = gql`
  mutation EditNameForPlace($name: String!, $id: Int!) {
    updateOnePlace(where: { id: $id }, data: { name: $name }) {
      id
    }
  }
`

const MUTATION_DELETE_PLACE = gql`
  mutation DeletePlace($id: Int!) {
    deleteOnePlace(where: { id: $id }) {
      id
    }
  }
`

const Title = ({ name, id }: { name: string; id: number }) => {
  const [setNameMutation] = useMutation(MUTATION_EDIT_NAME_FOR_PLACE, {
    refetchQueries: [{ query: QUERY_PLACES }],
  })
  const [deletePlace] = useMutation(MUTATION_DELETE_PLACE, {
    refetchQueries: [{ query: QUERY_PLACES }],
  })

  return (
    <EditableTitle
      name={name}
      setName={(name) => setNameMutation({ variables: { name, id } })}
      onDelete={() => deletePlace({ variables: { id } })}
    />
  )
}

const removeNonAscii = (s: string): string => s.replace(/[^\x00-\x7F]/g, '')

const sortProductByName = (
  { productType: { name: nameThis } }: Product,
  { productType: { name: nameOther } }: Product
): number => removeNonAscii(nameThis).trim().localeCompare(removeNonAscii(nameOther).trim())

const Place = ({ id, name, products }: { id: number; name: string; products: Product[] }) => (
  <Card title={<Title name={name} id={id} />}>
    <Space direction={'vertical'} style={{ width: '100%' }}>
      {Array.from(products)
        .sort(sortProductByName)
        .map(({ id, items, productType: { name } }) => (
          <Items productId={id} key={name} name={name} items={items} />
        ))}
      <AddProduct placeId={id} existingProducts={products} />
    </Space>
  </Card>
)

export default Place
