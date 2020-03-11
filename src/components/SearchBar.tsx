import React from 'react'
import styled from 'styled-components'

const SearchWrap = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const SearchBarInput = styled('input')({
  border: 'none',
  borderBottom: '1px solid #313d4f',
  outline: 'none',
  borderRadius: 4,
  fontWeight: 300,
  width: '50%',
  height: 40,
  opacity: 0.7,
  marginTop: 70,
  fontSize: 16,
})

interface ISearchBar {
  onChangeSearchInput: (input: string) => any
}

// eslint-disable-next-line react/prop-types
const SearchBar: React.FC<ISearchBar> = ({ onChangeSearchInput }) => (
  <SearchWrap>
    <SearchBarInput
      type="text"
      placeholder="Search"
      onChange={e => onChangeSearchInput(e.target.value)}
    />
  </SearchWrap>
)

export { SearchBar }
