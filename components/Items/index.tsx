import { Divider, Select, Tag } from 'antd'
import { ApolloClient, gql, useApolloClient, useMutation } from '@apollo/client'
import { Item, QUERY_PLACES, QueryAllItemsByPlace } from '../Places'
import ProductTypeTitle from './ProductTypeTitle'

const amountsWithUnit = [1, 5, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

const quantities = [
  ...amountsWithUnit.map((quantity) => ({ quantity, unit: 'g' })),
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => ({ quantity, unit: '' })),
  ...amountsWithUnit.map((quantity) => ({ quantity, unit: 'ml' })),
]

const quantityOptions = quantities.map(({ quantity, unit }, index) => (
  <Select.Option key={index} value={index} style={{ width: '100px' }}>
    {quantity}
    {unit}
  </Select.Option>
))

const MUTATION_ADD_ITEM = gql`
  mutation AddItem($productId: Int!, $quantity: Float!, $unit: String!) {
    createOneItem(data: { product: { connect: { id: $productId } }, quantity: $quantity, unit: $unit }) {
      id
    }
  }
`

const updateItemInData = (
  { places, ...args }: QueryAllItemsByPlace,
  productId: number,
  modifyTargettedItems: (items: Item[]) => Item[]
): QueryAllItemsByPlace => ({
  ...args,
  places: places.map(({ products, ...args }) => ({
    ...args,
    products: products.map(({ id, items, ...args }) => ({
      id,
      ...args,
      items: productId === id ? modifyTargettedItems(items) : items,
    })),
  })),
})

const modifyItemsInCache = ({
  productId,
  client,
  modifyItems,
}: {
  productId: number
  client: ApolloClient<Object>
  modifyItems: (items: Item[]) => Item[]
}) => {
  const data: QueryAllItemsByPlace | null = client.readQuery({
    query: QUERY_PLACES,
  })

  // Only update the data if there was actually something in the cache
  if (data) {
    client.writeQuery({
      query: QUERY_PLACES,
      data: updateItemInData(data, productId, modifyItems),
    })
  }
}

const addItemToCache = ({ item, ...args }: { productId: number; client: ApolloClient<Object>; item: Item }) => {
  modifyItemsInCache({
    modifyItems: (items) => items.concat([item]),
    ...args,
  })
}

const removeItemFromCache = ({
  id: targetId,
  ...args
}: {
  productId: number
  client: ApolloClient<Object>
  id: number
}) => {
  modifyItemsInCache({
    modifyItems: (items) =>
      items.map(({ id, ...args }) => ({
        id: id === targetId ? -id : id,
        ...args,
      })),
    ...args,
  })
}

const MUTATION_DELETE_ITEM = gql`
  mutation DeleteItem($id: Int!) {
    deleteOneItem(where: { id: $id }) {
      id
    }
  }
`

const Items = ({ productId, name, items }: { productId: number; name: string; items: Item[] }) => {
  const [addItemMutation] = useMutation(MUTATION_ADD_ITEM, {
    refetchQueries: [{ query: QUERY_PLACES }],
  })
  const [deleteItemMutation] = useMutation(MUTATION_DELETE_ITEM, {
    refetchQueries: [{ query: QUERY_PLACES }],
  })
  const client = useApolloClient()

  const addItem = ({ quantity, unit }: { quantity: number; unit: string }) => {
    // Update the cache to immediately reflect the change
    addItemToCache({
      productId,
      item: { quantity, unit, id: -items.length },
      client,
    })

    // Execute the mutation for persistent storage of the change
    addItemMutation({ variables: { quantity, unit, productId } })
  }

  const deleteItem = ({ id }: { id: number }) => {
    // Remove item from cache to immediately reflect the desired changes
    removeItemFromCache({ productId, id, client })

    // Send the query
    deleteItemMutation({ variables: { id } })
  }

  return (
    <div style={{ width: '100%' }}>
      <b>
        <ProductTypeTitle productId={productId} name={name} canDelete={items.length === 0} />
      </b>
      <Divider type={'vertical'} />

      {items.map(({ quantity, unit, id }) => (
        <Tag
          closable={id >= 0} // Hide the close button for items merely existing in cache
          key={id}
          onClose={(e: Event) => {
            e.preventDefault()
            deleteItem({ id })
          }}
        >
          {quantity}
          {unit}
        </Tag>
      ))}
      <Select style={{ width: '5em' }} placeholder="Add" value={[]} onSelect={(index) => addItem(quantities[index])}>
        {quantityOptions}
      </Select>
    </div>
  )
}

export default Items
