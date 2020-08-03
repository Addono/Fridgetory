import React, { useState, useEffect, useContext, createContext } from 'react'

type SearchType = string

const defaultValue: SearchType = ''

const defaultContext = {
  searchQuery: defaultValue,
  setSearchQuery: (value: SearchType) => {},
}

export const SharedSearchContext = createContext(defaultContext)

export const SharedSearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<SearchType>(defaultValue)

  return <SharedSearchContext.Provider value={{ searchQuery, setSearchQuery }}>{children}</SharedSearchContext.Provider>
}

const useSharedSearch = (): typeof defaultContext => {
  return useContext(SharedSearchContext)
}

export default useSharedSearch
