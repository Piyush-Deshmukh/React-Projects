import { useCallback, useRef, useState } from 'react'
import useBookSearch from './useBookSearch'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const { books, hasMore, error, loading } = useBookSearch(query, pageNumber)
  
  const observer = useRef()

  const lastBookElementRef = useCallback(node => {
    if(loading)
      return
    if(observer.current)
      observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore)
        setPageNumber(prevPageNumber => prevPageNumber + 1)
    })

    if(node)
      observer.current.observe(node)
  }, [loading, hasMore])

  const handleSearch = ((e) => {
    setQuery(e.target.value)
    setPageNumber(1)
  })

  return (
    <div className='wrapper'>
      <h1>Infinite Scroll</h1>
      <input type="text" value={query} onChange={handleSearch} className='input' placeholder='Search' />
      {books.map((book, index) => {
        if(books.length === index + 1)
          return <div key={book} ref={lastBookElementRef} className='book' >{book}</div>
        else  
          return <div key={book} className='book'>{book}</div> 
      })}
      {loading && <div className='loading'>Loading.....</div>}
      {error && <div className='error'>Error!!</div>}
    </div>
  )
}

export default App
