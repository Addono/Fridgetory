import {gql, useMutation, useQuery} from "@apollo/client";
import {Product} from "../Places";
import {Divider, Select} from "antd";
import CreateNewProductType from "./CreateNewProductType";


interface QueryAllProductTypes {
    productTypes: [{
        id: number,
        name: string,
    }]
}

const QUERY_ALL_PRODUCT_TYPES = gql`
    query {
        productTypes {
            id
            name
        }
    }
`

const MUTATION_ADD_PRODUCT_TO_PLACE = gql`
    mutation AddProductToPlace($productTypeId: Int!, $placeId: Int!) {
        createOneProduct(data: {
            productType: {connect: {id: $productTypeId}}
            place: {connect: {id: $placeId}}
        }) {
            id
        }
    }
`

const AddProduct = ({placeId, existingProducts}: { placeId: number, existingProducts: Product[] }) => {
    const {loading, error, data} = useQuery<QueryAllProductTypes>(QUERY_ALL_PRODUCT_TYPES, {pollInterval: 10000})
    const [addProductToPlace, {loading: refetching}] = useMutation(MUTATION_ADD_PRODUCT_TO_PLACE, {refetchQueries: [{query: QUERY_ALL_PRODUCT_TYPES}]})

    if (loading || error || !data?.productTypes) return null

    const namesOfExistingProductTypes = existingProducts.map(({productType: {name}}) => name)

    const availableProductOptions = data.productTypes
        // Remove all product types which are already in this element
        .filter(({name}) => !namesOfExistingProductTypes.includes(name))
        // Render each product type as an <Option />
        .map(({id, name}) => <Select.Option key={id} value={id}>{name}</Select.Option>)

    return (
        <Select
            onSelect={(productTypeId: number) => addProductToPlace({
                variables: {productTypeId, placeId}
            })}
            disabled={refetching}
            style={{width: "100%"}}
            placeholder={"Add product"}
            dropdownRender={menu => (
                <div>
                    {menu}
                    <Divider style={{margin: '4px 0'}}/>
                    <div key={"new"} style={{display: 'flex', flexWrap: 'nowrap', padding: 8}}>
                        <CreateNewProductType placeId={placeId}/>
                    </div>
                </div>
            )}>
            {availableProductOptions}
        </Select>
    )
}

export default AddProduct
