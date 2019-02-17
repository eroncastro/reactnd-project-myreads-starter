import React from 'react';
import Book from './Book';

class BooksList extends React.Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map(book => {
          const { backgroundImage, bookTitle, bookAuthors } = book;

          return (
            <li>
              <Book
                backgroundImage={backgroundImage}
                bookTitle={bookTitle}
                bookAuthors={bookAuthors}
              />
            </li>
          );
         })}
      </ol>
    );
  }
}

export default BooksList;
