import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

const shelfs = [
  { title: 'Currently Reading', id: 'currentlyReading' },
  { title: 'Want to Read', id: 'wantToRead' },
  { title: 'Read', id: 'read' },
];

const ListBooks = props => {
  const getBooksfromShelf = shelf =>
    props.books.filter(book => book.shelf === shelf);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelfs.map(shelf => (
            <Bookshelf
              key={shelf.id}
              title={shelf.title}
              onMove={props.onMove}
              books={getBooksfromShelf(shelf.id)}
            />
          ))}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
};

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default ListBooks;
