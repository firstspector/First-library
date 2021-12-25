import React, { Component } from "react";
import ShelfHeader from "./ShelfHeader";
import BookStack from "./BookStack";

const shelfTypes = ['currentlyReading','wantToRead','read']

class BookShelf extends Component {

    render() {

        const { assignBooks, moveBook } = this.props

        return (
            <div>
                <ShelfHeader to='/search'/>
                <div className="shelf-style">
                    {shelfTypes.map(shelfType => (
                        <BookStack key={shelfType} type={shelfType} assignBooks={assignBooks} handleMoveBook={moveBook}/>
                    ))}
                </div>
            </div>
        );
    }
}

export default BookShelf;