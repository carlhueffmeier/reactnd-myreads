import React from 'react';
import PropTypes from 'prop-types';

const BookCover = props => {
  const style = {
    width: 128,
    height: 193,
  };
  if (props.image) {
    style.backgroundImage = `url(${props.image})`;
  }

  return <div className="book-cover" style={style} />;
};

BookCover.propTypes = {
  image: PropTypes.string,
};

export default BookCover;
