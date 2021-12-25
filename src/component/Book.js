import React, { Component } from "react";
import Buttons from "./Buttons";

const shelfTypes = ['currentlyReading','wantToRead','read','none']

class Book extends Component {

    filterButtonByBookShelf = (bookDetail) => {
        return shelfTypes.filter(shelfType => bookDetail.shelf !== shelfType)
    }

    render() {
        const { bookDetail, handleMoveBook } = this.props

        return (
            <li key={bookDetail.id} >
                <div className="book-area">
                    <div className="book-image">
                        <img src={bookDetail.imageLinks.smallThumbnail} alt={bookDetail.title} />
                    </div>
                    <div className="book-detail">
                        <div className="book-title">{bookDetail.title}</div>
                        <div className="book-author">{bookDetail.authors?bookDetail.authors:''}</div>
                    </div>
                    <div className="book-button">
                        {shelfTypes.map(shelfType => (
                            <Buttons key={shelfType} shelfType={shelfType} bookDetail={bookDetail} handleMoveBook={handleMoveBook}/>
                        ))}
                    </div>
                </div>
            </li>
        );
    }
}

export default Book;