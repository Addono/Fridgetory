import React, { useState, useEffect, useContext, createContext } from 'react'

type SearchType = string

const defaultValue: SearchType = ''

export const SharedSearchContext = createContext({
  state: defaultValue,
  setSharedSearch: (value: SearchType) => {},
})

export const SharedSearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<SearchType>(defaultValue)

  const [contextValue, setContextValue] = useState({
    state,
    setSharedSearch: (value: SearchType) => setState(value),
  })

  useEffect(() => {
    setContextValue((currentValue) => ({
      ...currentValue,
      state,
    }))
  }, [state])

  return <SharedSearchContext.Provider value={contextValue}>{children}</SharedSearchContext.Provider>
}

const useSharedSearch = () => {
  const { state, setSharedSearch } = useContext(SharedSearchContext)

  return {
    search: state,
    setSearch: setSharedSearch,
  }
}

export default useSharedSearch
