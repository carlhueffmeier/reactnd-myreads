import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import './BooksGrid.css';

const BooksGrid = props => {
  return (
    <ol className="books-grid">
      {props.books.map(book => (
        <li key={book.id}>
          <Book book={book} onMove={props.onMove} />
        </li>
      ))}
    </ol>
  );
};

BooksGrid.propTypes = {
  books: PropTypes.array.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default BooksGrid;
