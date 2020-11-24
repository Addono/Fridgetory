import { useState } from 'react'

import { Input, Space, Tooltip } from 'antd'
import { EditOutlined, SaveFilled, DeleteTwoTone } from '@ant-design/icons'

export const EditableTitle = ({
  name,
  setName,
  onDelete,
}: {
  name: string
  setName: (name: string) => void
  onDelete?: () => void
}) => {
  const [editing, setEditing] = useState<boolean>(false)
  const [newName, setNewName] = useState<string>(name)

  if (editing) {
    const save = () => {
      setName(newName)
      setEditing(false)
    }

    const SaveButton = () => (
      <Tooltip title="Save">
        <SaveFilled onClick={save} />
      </Tooltip>
    )

    const DeleteButton = () => (
      <Tooltip title={'Delete'}>
        {onDelete ? (
          <DeleteTwoTone twoToneColor={'red'} onClick={() => onDelete()} />
        ) : (
          <DeleteTwoTone twoToneColor={'lightgrey'} />
        )}
      </Tooltip>
    )

    return (
      <Input
        defaultValue={name}
        value={newName}
        onChange={({ target: { value } }) => setNewName(value)}
        onPressEnter={save}
        addonBefore={<DeleteButton />}
        addonAfter={<SaveButton />}
      />
    )
  } else {
    const EditButton = () => (
      <Tooltip title="Edit">
        <EditOutlined onClick={() => setEditing(true)} />
      </Tooltip>
    )

    return (
      <Space align={'baseline'}>
        <p>{name}</p>
        <EditButton />
      </Space>
    )
  }
}
