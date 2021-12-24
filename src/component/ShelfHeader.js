import React, { Component } from "react";
import { Link } from "react-router-dom";

class ShelfHeader extends Component {
    render() {

        const { to } = this.props

        return (
            <div className="shelf-header">
                <h1>{to === '/' 
                        ? 'Seach Book'
                        : 'My Book Shelf'
                    }
                </h1>
                <span>
                    <Link to={to}>
                        {to === '/'
                            ? <i className="fa fa-chevron-left add-book-icon" aria-hidden="true"> Back to Home</i>
                            : <i className="fa fa-book add-book-icon" aria-hidden="true"> Search Books</i>
                        }
                    </Link> 
                </span>
            </div>
        );
    }
}

export default ShelfHeader;