import React, { useState } from 'react'
import { ApolloClient, gql, useApolloClient, useMutation } from '@apollo/client'

import { Input, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { IPlace, QUERY_PLACES, QueryAllItemsByPlace } from './index'

const MUTATION_ADD_PLACE = gql`
  mutation AddPlace($name: String!) {
    createOnePlace(data: { name: $name }) {
      id
    }
  }
`

const addPlaceToCache = ({ client, name }: { client: ApolloClient<Object>; name: string }) => {
  const data: QueryAllItemsByPlace = client.readQuery({
    query: QUERY_PLACES,
  }) ?? { places: new Array<IPlace>() }

  const updatedData = {
    ...data,
    // Overwrite places with the additional entry
    places: data.places.concat([
      {
        id: -data.places.length, // random placeholder ID
        name: name,
        products: [],
      },
    ]),
  }

  client.writeQuery({
    query: QUERY_PLACES,
    data: updatedData,
  })
}

const SubmitIcon = ({ enabled, callback }: { enabled: boolean; callback: () => void }) => {
  if (enabled) {
    return <PlusOutlined onClick={callback} />
  } else {
    return <PlusOutlined style={{ color: 'lightgrey' }} />
  }
}

const AddPlace = () => {
  const [addPlaceMutation, { loading }] = useMutation(MUTATION_ADD_PLACE, {
    refetchQueries: [{ query: QUERY_PLACES }],
  })
  const [name, setName] = useState<string>('')
  const client = useApolloClient()

  const addPlace = () => {
    // Optimistically add the new place to the cache
    addPlaceToCache({ client, name })

    // Empty the name field
    setName('')

    // Execute a mutation to add the place in the backend
    addPlaceMutation({ variables: { name } })
  }

  return (
    <>
      <Input
        data-cy={'add-place:input'}
        placeholder={'Name of new place'}
        value={name}
        onChange={({ target: { value } }) => setName(value)}
        maxLength={50}
        disabled={loading}
        allowClear
        addonAfter={
          <div data-cy={'add-place:submit'}>
            <Tooltip title="Add">
              <SubmitIcon enabled={!loading && name.length > 0} callback={addPlace} />
            </Tooltip>
          </div>
        }
      />
    </>
  )
}

export default AddPlace
