import React from 'react'
import Book from './Book'

const SearchBooksResults = (props) => {
  // TODO: Refactor books grid component
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {props.books.map((book) => (
          <li key={book.id}>
            <Book
              authors={book.authors}
              title={book.title}
              thumbnail={book.imageLinks.thumbnail}
            />
        </li>))}
      </ol>
    </div>
  );
}

export default SearchBooksResults
