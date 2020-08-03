import React, { useState, useEffect, useContext, createContext } from 'react'

type SearchType = string

const defaultValue: SearchType = ''

const defaultContext = {
  sharedSearch: defaultValue,
  setSharedSearch: (value: SearchType) => {},
}

export const SharedSearchContext = createContext(defaultContext)

export const SharedSearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [sharedSearch, setSharedSearch] = useState<SearchType>(defaultValue)

  return (
    <SharedSearchContext.Provider value={{ sharedSearch, setSharedSearch }}>{children}</SharedSearchContext.Provider>
  )
}

const useSharedSearch = (): typeof defaultContext => {
  return useContext(SharedSearchContext)
}

export default useSharedSearch
