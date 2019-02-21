import React from 'react';
import Book from './Book';

class BookList extends React.Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map(book => {
          return (
            <li key={book.title}>
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
