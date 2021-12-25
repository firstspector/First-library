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

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({books: books});
  }

  addBookIfNotExist = (book,bookList) => {
    return !bookList.some((b) => b.id === book.id)
            ? bookList.concat([book])
            : bookList
  }

  updateBookShelf = (shelves,bookList) => {
    return bookList.map((b) => {
            b.shelf = Object.keys(shelves).filter(shelfKey => shelves[shelfKey].includes(b.id))[0];
            return b;
           })
  }

  moveBook = async (book,to) => {

    let updateBooks = [];

    const shelves = await BooksAPI.update(book,to);
    this.setState((currentState) => {
      updateBooks = currentState.books.slice();
      updateBooks = this.addBookIfNotExist(book,updateBooks);
      updateBooks = this.updateBookShelf(shelves,updateBooks);

      return { books: updateBooks}
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
