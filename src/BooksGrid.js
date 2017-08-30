import React from 'react'
import Book from './Book'

const BooksGrid = (props) => {
  return (
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
  );
}

export default BooksGrid
