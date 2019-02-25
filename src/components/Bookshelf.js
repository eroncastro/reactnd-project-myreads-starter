import React from 'react';
import PropTypes from 'prop-types';
import BookList from './BookList';

class Bookshelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <BookList
            books={this.props.books}
            onBookshelfChange={this.props.onBookshelfChange}
          />
        </div>
      </div>
    );
  }
}

BookList.propTypes = {
  books: PropTypes.array,
  onBookshelfChange: PropTypes.func
};

export default Bookshelf;
