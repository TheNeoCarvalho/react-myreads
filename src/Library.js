import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './App.css'
import Bookshelf from './Bookshelf'

const Library = props => {
  const { myBooks, updateBook, handleSelect } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf title={`Currently Reading`} myBooks={myBooks.filter(book => book.shelf === 'currentlyReading')} updateBook={updateBook} handleSelect={handleSelect} />
          <Bookshelf title={`Want to Read`} myBooks={myBooks.filter(book => book.shelf === 'wantToRead')} updateBook={updateBook} handleSelect={handleSelect} />
          <Bookshelf title={`Read`} myBooks={myBooks.filter(book => book.shelf === 'read')} updateBook={updateBook} handleSelect={handleSelect} />
        </div>
      </div>
      <Link to='/search' className='open-search'>Add a book</Link>
    </div>
  );
};

export default Library;

Library.propTypes = {
  myBooks: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};