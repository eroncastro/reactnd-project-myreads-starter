import React from 'react';
import Bookshelf from './Bookshelf';

class Bookshelves extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{this.props.title}</h1>
        </div>
        <div className="list-books-content">
          {
            this.props.bookshelves.map(bookshelf => {
              const { title, books } = bookshelf;

              return <Bookshelf title={title} books={books} />;
            })
          }
        </div>
      </div>
    );
  }
}

export default Bookshelves;
