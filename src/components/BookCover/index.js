import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const BookCover = props => {
  let showCoverTitle = false;
  const style = {
    width: 128,
    height: 193,
  };
  if (props.image) {
    style.backgroundImage = `url(${props.image})`;
  } else {
    showCoverTitle = true;
  }

  return (
    <div className="book-cover" style={style}>
      {showCoverTitle && <div className="book-cover-title">{props.title}</div>}
    </div>
  );
};

BookCover.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default BookCover;
