import { Input } from 'antd'

import useSharedSearch from './useSharedSearch'

const SearchInput = () => {
  const { searchQuery, setSearchQuery } = useSharedSearch()

  return (
    <Input
      onChange={(event) => setSearchQuery(event.target.value)}
      value={searchQuery}
      placeholder={'Search'}
      allowClear
      style={{ width: '100%', maxWidth: '20em' }}
    />
  )
}

export default SearchInput
