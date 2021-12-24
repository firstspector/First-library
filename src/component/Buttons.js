import React, { Component } from "react";

class Buttons extends Component {

    getButtonLabel = (type) => {
        switch(type) {
            case 'currentlyReading':
                return 'Reading'
            case 'wantToRead':
                return 'Want to Read'
            case 'read':
                return 'Already Read'
            case 'none':
                return 'none'
            default:
                return this.props.type
        }
    }

    isDisabled = () => {
        return this.props.bookDetail.shelf? this.props.shelfType === this.props.bookDetail.shelf : this.props.shelfType === 'none'
    }

    render() {
        const { shelfType, bookDetail, handleMoveBook } = this.props;

        return (
            <button 
                disabled={this.isDisabled()}
                className="button-style"
                onClick={() => handleMoveBook(bookDetail,shelfType)} 
            >{this.getButtonLabel(shelfType)}</button>
        );
    }
}

export default Buttons;