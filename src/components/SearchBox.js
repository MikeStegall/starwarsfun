import React from 'react'

const SearchBox = ({ value, searchChange }) => {
  return (
    <div className='search-box'>
      <input
        className='search-input'
        type='search'
        placeholder='Search characters (e.g. Luke)'
        value={value}
        onChange={searchChange}
      />
    </div>
  )
}

export default SearchBox
