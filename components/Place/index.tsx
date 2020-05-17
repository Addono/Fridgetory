import {Card, Divider, Input, Tooltip} from 'antd';

import {Product, QUERY_PLACES} from "../Places";
import AddProduct from "../AddProduct";
import Items from "../Items";
import {useState} from "react";
import {EditOutlined, SaveFilled, DeleteTwoTone} from "@ant-design/icons"
import {gql, useMutation} from "@apollo/client";

const MUTATION_EDIT_NAME_FOR_PLACE = gql`
    mutation EditNameForPlace($name: String!, $id: Int!) {
        updateOnePlace(
            where: {id: $id}
            data: {name: $name}
        ) {
            id
        }
    }
`

const MUTATION_DELETE_PLACE = gql`
    mutation DeletePlace($id: Int!) {
        deleteOnePlace(where: {id: $id}) {
            id
        }
    }
`

const Title = ({name, id}: { name: string, id: number }) => {
    const [editing, setEditing] = useState<boolean>(false)
    const [newName, setNewName] = useState<string>(name)

    const [setNameMutation] = useMutation(MUTATION_EDIT_NAME_FOR_PLACE, {refetchQueries: [{query: QUERY_PLACES}]})
    const [deletePlace] = useMutation(MUTATION_DELETE_PLACE, {refetchQueries: [{query: QUERY_PLACES}], variables: {id}})

    if (editing) {
        const save = () => {
            setNameMutation({variables: {name: newName, id}})
            setEditing(false)
        }

        const SaveButton = () => (
            <Tooltip title="Save">
                <SaveFilled onClick={save} />
            </Tooltip>
        )

        const DeleteButton = () => (
            <Tooltip title={"Delete"}>
                <DeleteTwoTone twoToneColor={"red"} onClick={() => deletePlace()} />
            </Tooltip>
        )

        return (
            <Input
                defaultValue={name}
                value={newName}
                onChange={({target: {value}}) => setNewName(value)}
                onPressEnter={save}
                addonBefore={<DeleteButton/>}
                addonAfter={<SaveButton/>}
            />
        )
    } else {
        const EditButton = () => (
            <Tooltip title="Edit">
                <EditOutlined onClick={() => setEditing(true)}/>
            </Tooltip>
        )

        return (
            <>
                {name}
                <Divider type={"vertical"}/>
                <EditButton/>
            </>
        )
    }
}

const Place = ({id, name, products}: { id: number, name: string, products: Product[] }) => (
    <Card title={<Title name={name} id={id}/>} style={{width: "100%"}}>
        {products.map(({id, items, productType: {name}}) =>
            <Items productId={id}
                   key={name}
                   name={name}
                   items={items}
            />)}
        <Divider/>
        <AddProduct placeId={id} existingProducts={products}/>
    </Card>
)

export default Place
