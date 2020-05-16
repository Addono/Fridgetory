import React, {useState} from "react";
import {ApolloClient, gql, useApolloClient, useMutation} from "@apollo/client";

import {Button, Input} from "antd";

import {IPlace, QUERY_PLACES, QueryAllItemsByPlace} from "./index";

const MUTATION_ADD_PLACE = gql`
    mutation AddPlace($name: String!) {
        createOnePlace(data: {name: $name}) {
            id
        }
    }
`

const addPlaceToCache = ({client, name}: { client: ApolloClient<Object>, name: string }) => {
    const data: QueryAllItemsByPlace = client.readQuery({query: QUERY_PLACES}) ?? {places: new Array<IPlace>()}

    const updatedData = {
        ...data,
        // Overwrite places with the additional entry
        places: data.places.concat([{
            id: -data.places.length, // random placeholder ID
            name: name,
            products: [],
        }])
    }

    client.writeQuery({
        query: QUERY_PLACES,
        data: updatedData,
    })
}

const AddPlace = () => {
    const [addPlaceMutation, {loading}] = useMutation(MUTATION_ADD_PLACE, {refetchQueries: [{query: QUERY_PLACES}]})
    const [name, setName] = useState<string>("")
    const client = useApolloClient()

    const addPlace = () => {
        // Optimistically add the new place to the cache
        addPlaceToCache({client, name})

        // Empty the name field
        setName("")

        // Execute a mutation to add the place in the backend
        addPlaceMutation({variables: {name}})
    }

    return <>
        <Input
            placeholder={"Name of new place"}
            value={name}
            onChange={({target: {value}}) => setName(value)}
            maxLength={50}
            disabled={loading}
            allowClear
        />
        <Button
            disabled={loading || name.length === 0}
            onClick={addPlace}>
            Add
        </Button>
    </>
}

export default AddPlace