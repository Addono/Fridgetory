import React, {useState} from "react";
import {gql, useMutation} from "@apollo/client";

import {Button, Input} from "antd";

import {QUERY_PLACES} from "./index";

const MUTATION_ADD_PLACE = gql`
    mutation AddPlace($name: String!) {
        createOnePlace(data: {name: $name}) {
            id
        }
    }
`

const AddPlace = () => {
    const [addPlace, {loading}] = useMutation(MUTATION_ADD_PLACE, {refetchQueries: [{query: QUERY_PLACES}]})
    const [name, setName] = useState<string>("")

    return <>
        <Input
            placeholder={"Name of new place"}
            value={name}
            onChange={({target: {value}}) => setName(value)}
            maxLength={50}
            disable={loading}
            allowClear
        />
        <Button
            disabled={loading || name.length === 0}
            onClick={async () => {
                await addPlace({variables: {name}})
                setName("")
            }}>
            Add
        </Button>
    </>
}

export default AddPlace