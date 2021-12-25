import React, { Component } from "react";
import * as BooksAPI from '../BooksAPI';
import ShelfHeader from "./ShelfHeader";
import BookStack from "./BookStack";

class SearchBook extends Component {

    state = {
        query: '',
        searchBooks: []
    }

    search = async (query) => {
        const books = await BooksAPI.search(query);
        if(Array.isArray(books)) {
            this.setState({ searchBooks: books })
        } else {
            this.setState({ searchBooks: [] })
        }
    }

    handleSearch = (event) => {
        event.preventDefault()
        const { value } = event.target

        this.setState({
            query: value,
        });
        this.search(value)
    }

    render() {
        const { query } = this.state
        const { moveBook, assignBooks } = this.props

        return (
            <div>
                <ShelfHeader to='/'/>
                <form>
                    <input 
                        className="search-bar"
                        type='text'
                        placeholder='Search keyword'
                        value={query}
                        onChange={this.handleSearch}
                    />
                </form>
                <div className="shelf-style">
                    <BookStack type='search' assignBooks={assignBooks} searchBooks={this.state.searchBooks} handleMoveBook={moveBook}/>
                </div>
            </div>
        );
    }
}

export default SearchBook;