import { Input } from 'antd'

import useSharedSearch from './useSharedSearch'

const SearchInput = () => {
  const { sharedSearch, setSharedSearch } = useSharedSearch()

  return (
    <Input
      onChange={(event) => setSharedSearch(event.target.value)}
      value={sharedSearch}
      placeholder={'Search'}
      allowClear
      style={{ width: '100%', maxWidth: '20em' }}
    />
  )
}

export default SearchInput
