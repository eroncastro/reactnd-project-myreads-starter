import React from 'react';
import Book from './Book';

class BookList extends React.Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map(book => {
          const {
            imageLinks: { thumbnail },
            title,
            authors
          } = book;

          return (
            <li key={title}>
              <Book
                backgroundImage={`url('${thumbnail}')`}
                title={title}
                authors={authors}
              />
            </li>
          );
         })}
      </ol>
    );
  }
}

export default BookList;
