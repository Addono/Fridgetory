import { Card, Space, Typography, Button } from 'antd'

import { gql, useMutation } from '@apollo/client'

import { Product, QUERY_PLACES } from '../Places'
import AddProduct from '../AddProduct'
import Items from '../Items'
import { EditableTitle } from '../EditableTitle'

import { sortByStringField, removeNonAscii } from '../util'
import useSharedSearch from '../Search/useSharedSearch'

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

const sortProductByName = sortByStringField<Product>((product) => product.productType.name, removeNonAscii)

const HiddenItemsText = ({ amount }: { amount: number }) => {
  const { resetSearchQuery } = useSharedSearch()

  if (amount <= 0) {
    return null
  }

  return (
    <>
      <Typography.Text>
        {amount} {amount == 1 ? 'item is' : 'items are'} hidden
      </Typography.Text>
      <Button type={'link'} onClick={() => resetSearchQuery()}>
        Reset search filter
      </Button>
    </>
  )
}

const isVisible = ({ productType: { name } }: Product): boolean => {
  const { searchQuery } = useSharedSearch()

  // Format both the name and search query to be case insensitive
  const formattedName = name.trim().toLowerCase()
  const formattedQuery = searchQuery.trim().toLowerCase()

  // Check if the name includes the search query
  return formattedName.includes(formattedQuery)
}

const Place = ({ id, name, products }: { id: number; name: string; products: Product[] }) => {
  const labeledProducts = Array.from(products).map((product) => ({
    product,
    // Case check if the items should be visible
    visible: isVisible(product),
  }))

  const visibleProducts: Product[] = labeledProducts
    .filter(({ visible }) => visible) // Remove all non-visible products
    .map(({ product }) => product) // Extract all products

  const hiddenProductCount: number = labeledProducts.filter(({ visible }) => !visible).length

  return (
    <Card title={<Title name={name} id={id} />}>
      <Space direction={'vertical'} style={{ width: '100%' }}>
        {visibleProducts
          // Sort the products based on their name
          .sort(sortProductByName)
          // Render each product
          .map(({ id, items, productType: { name } }) => (
            <Items productId={id} key={name} name={name} items={items} />
          ))}
        <HiddenItemsText amount={hiddenProductCount} />
        <AddProduct placeId={id} existingProducts={products} />
      </Space>
    </Card>
  )
}

export default Place
