import React from 'react'
import PropTypes from 'prop-types';

const Book = (props) => {
  let coverStyle = {
    width: 128,
    height: 193
  }
  if (props.imageLinks) {
    coverStyle.backgroundImage = `url(${props.imageLinks.thumbnail})`;
  }
  // let shelf = props.shelf || 'none';

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={coverStyle}></div>
        <div className="book-shelf-changer">
          <select>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.title}</div>
      <div className="book-authors">{props.authors ? props.authors.join(', ') : ''}</div>
    </div>
  );
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array,
  imageLinks: PropTypes.shape({
    thumbnail: PropTypes.string
  }),
};

export default Book
