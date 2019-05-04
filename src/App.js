import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Library from './Library'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    myBooks: [],
  };

  handleSelect = (book, e) => {
    const value = e.target.value;
    book.shelf = value;
    this.updateBook(book, value);
  };

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        const myBook = this.state.myBooks.filter(curBook => curBook.id === book.id);

        if(myBook.length === 0) { // If we do not have 'book' already in our library
          this.setState(curState => ({
            myBooks: curState.myBooks.concat(book),
          }));
        } else { // Else we do have book in our library
          const myNewBooks = this.state.myBooks.map(book => {
            if(book.id === myBook[0].id) book.shelf = shelf;
            return book;
          });
          this.setState(() => ({
            myBooks: myNewBooks,
          }));
        };
      });
  };

  componentDidMount = () => {
    BooksAPI.getAll() // Initial load of library books
      .then(res => {
        this.setState(() => ({
          myBooks: res,
        }));
      });
  };

  render() {
    const { updateBook, handleSelect } = this;
    const { myBooks } = this.state;

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search myBooks={myBooks} updateBook={updateBook} handleSelect={handleSelect} />
        )} />
        <Route exact path='/' render={() => (
          <Library myBooks={myBooks} updateBook={updateBook} handleSelect={handleSelect} />
        )} />
      </div>
    );
  };
};

export default BooksApp;