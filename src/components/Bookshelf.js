import React from 'react';
import BooksList from './BooksList';

class Bookshelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <BooksList books={this.props.books} />
        </div>
      </div>
    );
  }
}

export default Bookshelf;
