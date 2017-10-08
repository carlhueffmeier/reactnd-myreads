import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="list-books-title">
    <Link to="/">
      <h1>MyReads</h1>
    </Link>
  </div>
);

export default Header;
