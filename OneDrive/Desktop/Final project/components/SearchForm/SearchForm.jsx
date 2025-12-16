import './SearchForm.css'
import { useState } from 'react'

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm.trim().toUpperCase())
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        placeholder="Enter stock symbol (e.g., AAPL, TSLA, MSFT)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        required
      />
      <button type="submit" className="search-form__button">
        Search
      </button>
    </form>
  )
}

export default SearchForm
