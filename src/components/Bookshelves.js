import React from 'react';
import Bookshelf from './Bookshelf';
import { Link } from 'react-router-dom';

export const BOOKSHELVES = Object.freeze({
  currentlyReading: {
    title: 'Currently Reading'
  },
  wantToRead: {
    title: 'Want to Read'
  },
  read: {
    title: 'Read'
  }
});

class Bookshelves extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{this.props.title}</h1>
        </div>
        <div className="list-books-content">
          {
            Object.keys(BOOKSHELVES).map((key, id) => {
              return (
                <Bookshelf
                  key={`${key}-${id}`}
                  title={BOOKSHELVES[key].title}
                  books={this.props.books.filter(book => book.shelf === key)}
                  onBookshelfChange={this.props.onBookshelfChange}
                />
              );
            })
          }
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>
              Add a book
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Bookshelves;
