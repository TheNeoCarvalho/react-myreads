import React from 'react'
import PropTypes from 'prop-types'
import './App.css'

const Book = props => {
  const { book, handleSelect } = props;

  return (
    <li>
      <div className="book">
        <div className="book-top">
        {book.imageLinks !== undefined ? (
          <a href={book.previewLink} target="_blank" rel="noopener noreferrer">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${book.imageLinks.thumbnail}')` }}></div>
          </a>
        ) : (
          <a href={book.previewLink} target="_blank" rel="noopener noreferrer">
            <div className="book-cover" style={{ width: 128, height: 193 }}></div>
          </a>
        )}
          <div className="book-shelf-changer">
            <select value={book.shelf !== undefined ? book.shelf : 'none'} onChange={(e) => handleSelect(book, e)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      {book.title !== undefined ? (
        <div className="book-title">{book.title}</div>
      ) : (
        <div className="book-title">Untitled</div>
      )}
      {book.authors !== undefined ? (
        book.authors.map(author => (
          <div key={author} className="book-authors">{author}</div>
        ))
      ) : (
        <div className="book-authors">Unknown</div>
      )}
      </div>
    </li>
  );
};

export default Book;

Book.propTypes = {
  book: PropTypes.object.isRequired,
  updateBook: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};