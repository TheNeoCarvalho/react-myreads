import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {
  state = {
    prevSearch: '',
    userSearch: '',
    curBooks: [],
  };

  handleSearch = query => {
    this.setState(() => ({
      userSearch: query,
    }));
  };

  componentDidUpdate = () => {
    const { userSearch, prevSearch } = this.state;
    const { myBooks } = this.props;

    if (userSearch !== prevSearch){
      if(userSearch !== ''){ // If search bar is not empty
        BooksAPI.search(userSearch)
          .then(books => {
              if(books !== undefined && books.length > 0){ // If search term is recognized
                const searchBooks = books.map(book => {
                  const myBook = myBooks.filter(myBook => myBook.id === book.id);
                  return myBook.length > 0 ? myBook[0] : book;
                });
                this.setState(() => ({
                  prevSearch: userSearch,
                  curBooks: searchBooks,
                }));
              } else { // Else search term is not recognized
                this.setState(() => ({
                  prevSearch: userSearch,
                  curBooks: [],
                }));
              };
          });
      } else { // Else search bar is empty
        this.setState(() => ({
          prevSearch: userSearch,
          curBooks: [],
        }));
      };
    };
   };

  render() {
    const { handleSearch } = this;
    const { userSearch, curBooks } = this.state;
    const { updateBook, handleSelect } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={userSearch}
              onChange={(event) => handleSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {curBooks !== [] ? (
            <ol className="books-grid">
              {curBooks.map(book => (
                <Book key={book.id} book={book} updateBook={updateBook} handleSelect={handleSelect} />
              ))}
            </ol>
          ) : (
            <ol className="books-grid"></ol>
          )}
        </div>
      </div>
    );
  };
};

export default Search;

Search.propTypes = {
  myBooks: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};