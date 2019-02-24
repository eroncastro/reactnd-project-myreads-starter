import React from 'react';
import Book from './Book';

class BookList extends React.Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map((book, id) => {
          return (
            <li key={`${book.title}-${id}`}>
              <Book
                book={book}
                onBookshelfChange={this.props.onBookshelfChange}
              />
            </li>
          );
         })}
      </ol>
    );
  }
}

export default BookList;
