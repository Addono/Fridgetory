import { gql, useMutation } from '@apollo/client'
import { QUERY_PLACES } from '../Places'
import { EditableTitle } from '../EditableTitle'

const MUTATION_EDIT_NAME_FOR_PRODUCT_TYPE = gql`
  mutation EditNameForProductType($oldName: String!, $newName: String!) {
    updateOneProductType(where: { name: $oldName }, data: { name: { set: $newName } }) {
      id
    }
  }
`

const MUTATION_DELETE_PRODUCT = gql`
  mutation DeleteProduct($productId: Int!) {
    deleteOneProduct(where: { id: $productId }) {
      id
    }
  }
`

const ProductTypeTitle = ({ name, productId, canDelete }: { name: string; productId: number; canDelete: boolean }) => {
  const [setNameMutation] = useMutation(MUTATION_EDIT_NAME_FOR_PRODUCT_TYPE, {
    refetchQueries: [{ query: QUERY_PLACES }],
  })
  const [deleteProduct] = useMutation(MUTATION_DELETE_PRODUCT, {
    refetchQueries: [{ query: QUERY_PLACES }],
  })

  return (
    <EditableTitle
      name={name}
      setName={(newName) => setNameMutation({ variables: { oldName: name, newName } })}
      onDelete={canDelete ? () => deleteProduct({ variables: { productId } }) : undefined}
    />
  )
}

export default ProductTypeTitle
