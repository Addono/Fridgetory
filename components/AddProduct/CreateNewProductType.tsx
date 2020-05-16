import {useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {QUERY_PLACES} from "../Places";
import {Input, Spin} from "antd";
import {PlusOutlined} from '@ant-design/icons';

const MUTATION_CREATE_PRODUCT = gql`
    mutation CreateProduct($name: String!, $placeId: Int!) {
        createOneProduct(data: {
            productType: {create: {name: $name}}
            place: {connect: {id: $placeId}}
        }) {
            id
        }
    }
`

const CreateNewProductType = ({placeId}: { placeId: number }) => {
    const [newProductTypeName, setNewProductTypeName] = useState<string>("")
    const [createProduct, {loading}] = useMutation(MUTATION_CREATE_PRODUCT, {refetchQueries: [{query: QUERY_PLACES}]})

    return <>
        <Input style={{flex: 'auto'}} value={newProductTypeName}
               onChange={({target: {value}}) => setNewProductTypeName(value)}/>
        {loading ? <Spin />
            :
            <a
                style={{flex: 'none', padding: '8px', display: 'block', cursor: 'pointer'}}
                onClick={() => {
                    setNewProductTypeName("")
                    createProduct({variables: {placeId, name: newProductTypeName}})
                }}
            >
                <PlusOutlined/> New
            </a>
        }
    </>
}

export default CreateNewProductType