import React, { Component } from "react";
import Book from "./Book";

class BookStack extends Component {

    getStackLabel = () => {
        switch(this.props.type) {
            case 'currentlyReading':
                return 'Currently Reading'
            case 'wantToRead':
                return 'Want to Read'
            case 'read':
                return 'Already Read'
            case 'search':
                return 'Search result'
            default:
                return this.props.type
        }
    }

    getBooks = () => {
        let books = []

        if(this.props.searchBooks) {
            const { assignBooks, searchBooks } = this.props
            const assignBooksId = assignBooks.map(assignBook => assignBook.id)

            books = searchBooks.map(searchBook => assignBooksId.includes(searchBook.id)?assignBooks[assignBooksId.indexOf(searchBook.id)]:searchBook)
        } else {
            books = this.props.assignBooks.filter(assignBook => assignBook.shelf === this.props.type)
        }

        books = books.filter(book => 'imageLinks' in book)

        return books

    }

    render() {
        const { handleMoveBook } = this.props
        const fromGetBook = this.getBooks()

        return (
            <div className="shelf-stack">
                <h2>{this.getStackLabel()}</h2>
                {fromGetBook.length > 0
                    ? <ol className="book-stack-style">
                        {fromGetBook.map(book => (
                            <li key={book.id} >
                                <Book bookDetail={book} handleMoveBook={handleMoveBook}/>
                            </li>))
                        }
                      </ol>
                    : <div className="shelf-empty">Empty</div>
                }
            </div>
        );
    }
}

export default BookStack;