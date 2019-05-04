import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import Book from './Book'

const Bookshelf = props => {
  const { title, myBooks, updateBook, handleSelect } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {myBooks.map(book =>
            <Book key={book.id} book={book} updateBook={updateBook} handleSelect={handleSelect} />
          )}
        </ol>
      </div>
    </div>
  );
};

export default Bookshelf;

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  myBooks: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};