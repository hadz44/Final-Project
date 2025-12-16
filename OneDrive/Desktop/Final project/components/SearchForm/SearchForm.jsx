import './SearchForm.css'
import { useState } from 'react'

function SearchForm({ onSearch, error, onErrorClear }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Clear previous errors
    if (onErrorClear) {
      onErrorClear()
    }

    // Validate input
    if (!searchTerm.trim()) {
      if (onSearch) {
        onSearch('', 'Please enter a keyword')
      }
      return
    }

    // Call onSearch with the keyword
    if (onSearch) {
      onSearch(searchTerm.trim())
    }
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    // Clear error when user starts typing
    if (onErrorClear) {
      onErrorClear()
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          type="text"
          className={`search-form__input ${error ? 'search-form__input_error' : ''}`}
          placeholder="Enter topic"
          value={searchTerm}
          onChange={handleChange}
          required
        />
        {error && <span className="search-form__error">{error}</span>}
      </div>
      <button type="submit" className="search-form__button">
        Search
      </button>
    </form>
  )
}

export default SearchForm
