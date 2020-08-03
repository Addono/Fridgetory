import { Input } from 'antd'

import useSharedSearch from './useSharedSearch'

const SearchInput = () => {
  const { search, setSearch } = useSharedSearch()

  return (
    <Input
      onChange={(event) => setSearch(event.target.value)}
      value={search}
      placeholder={'Search'}
      allowClear
      style={{ width: '100%', maxWidth: '20em' }}
    />
  )
}

export default SearchInput
