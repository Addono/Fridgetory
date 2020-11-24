import { ApolloClient, gql, useApolloClient, useMutation } from '@apollo/client'
import { Item, QUERY_PLACES, QueryAllItemsByPlace } from '../Places'
import ProductTypeTitle from './ProductTypeTitle'

import { Divider, Select, Tag, Tooltip } from 'antd'
import { TweenOneGroup } from 'rc-tween-one'

const amountsWithUnit = [1, 5, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

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

interface NewItem {
  id: number
}

interface AddItemMutationData {
  createOneItem: NewItem
}

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
  const [addItemMutation, { loading: addItemLoading }] = useMutation<AddItemMutationData>(MUTATION_ADD_ITEM, {
    refetchQueries: [{ query: QUERY_PLACES }],
  })
  const [deleteItemMutation] = useMutation(MUTATION_DELETE_ITEM, {
    refetchQueries: [{ query: QUERY_PLACES }],
  })
  const client = useApolloClient()

  const addItem = async ({ quantity, unit }: { quantity: number; unit: string }) => {
    // Execute the mutation for persistent storage of the change
    const { data } = await addItemMutation({ variables: { quantity, unit, productId } })

    if (data) {
      addItemToCache({
        productId: data.createOneItem.id,
        item: { quantity, unit, id: -items.length },
        client,
      })
    }
  }

  const deleteItem = ({ id }: { id: number }) => {
    // Remove item from cache to immediately reflect the desired changes
    removeItemFromCache({ productId, id, client })

    // Send the query
    deleteItemMutation({ variables: { id } })
  }

  return (
    <TweenOneGroup
      enter={{ scale: 0.8, opacity: 0, type: 'from', duration: 200 }}
      leave={{ opacity: 0, width: 0, scale: 1, duration: 300 }}
      appear={false}
      style={{ float: 'left' }}
    >
      <b key={'title'}>
        <ProductTypeTitle productId={productId} name={name} canDelete={items.length === 0} />
      </b>

      <Divider key={'divider'} type={'vertical'} />

      {items.map(({ quantity, unit, id, createdAt }) => (
        <Tooltip key={Math.abs(id)} title={createdAt && new Date(createdAt).toLocaleDateString()}>
          <Tag
            closable={true} //{id >= 0} // Hide the close button for items merely existing in cache
            onClose={(e) => {
              e.preventDefault()
              deleteItem({ id })
            }}
          >
            {quantity}
            {unit}
          </Tag>
        </Tooltip>
      ))}
      <Select
        loading={addItemLoading}
        style={{ width: '5em' }}
        placeholder={'Add'}
        value={[]}
        onSelect={(index) => addItem(quantities[index])}
        size={'small'}
      >
        {quantityOptions}
      </Select>
    </TweenOneGroup>
  )
}

export default Items
