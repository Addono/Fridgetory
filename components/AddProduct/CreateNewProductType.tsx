import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { QUERY_ALL_PRODUCT_TYPES } from './index'
import Loading from '../Loading'

const MUTATION_CREATE_PRODUCT = gql`
  mutation CreateProductType($name: String!) {
    createOneProductType(data: { name: $name }) {
      id
    }
  }
`

const CreateNewProductType = () => {
  const [newProductTypeName, setNewProductTypeName] = useState<string>('')
  const [createProduct, { loading }] = useMutation(MUTATION_CREATE_PRODUCT, {
    refetchQueries: [{ query: QUERY_ALL_PRODUCT_TYPES }],
  })

  return (
    <>
      <Input
        style={{ flex: 'auto' }}
        value={newProductTypeName}
        onChange={({ target: { value } }) => setNewProductTypeName(value)}
      />
      {loading ? (
        <Loading />
      ) : (
        <a
          style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
          onClick={() => {
            setNewProductTypeName('')
            createProduct({ variables: { name: newProductTypeName } })
          }}
        >
          <PlusOutlined /> New
        </a>
      )}
    </>
  )
}

export default CreateNewProductType
