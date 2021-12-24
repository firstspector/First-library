import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import BookShelf from './component/BookShelf';
import SearchBook from './component/SearchBook';
import * as BooksAPI from './BooksAPI'
import './App.css';

class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
          this.setState({
              books: books
          })
      });
  }

  moveBook = (book,to) => {

    let updateBooks = []

    BooksAPI.update(book,to)
      .then((shelfs) => {
        this.setState((currentState) => {

          updateBooks = currentState.books.slice()

          if(!updateBooks.some((b) => b.id === book.id)) {
            updateBooks.push(book);
          }

          updateBooks = updateBooks.map((b) => {
            b.shelf = Object.keys(shelfs).filter(shelfKey => shelfs[shelfKey].includes(b.id))[0];
            return b;
          })

          return {
            books: updateBooks
          }
        })
      })
  }

  render() {

    const { books } = this.state

    return (
      <div>
        <Routes>
          <Route exact path='/' element={<BookShelf assignBooks={books} moveBook={this.moveBook}/>}/>
          <Route path='/search' element={<SearchBook assignBooks={books} moveBook={this.moveBook}/>}/>
        </Routes>
      </div>
    );
  }
} 

export default App;
