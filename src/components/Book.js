import React from 'react';
import PropTypes from 'prop-types';
import { update } from '../BooksAPI';
import { BOOKSHELVES } from './Bookshelves';

class Book extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const book = {...this.props.book, shelf: event.target.value };

    update(this.props.book, event.target.value)
      .then(() => {
        if (typeof this.props.onBookshelfChange !== 'function') return;

        this.props.onBookshelfChange(book);
      })
  }

  _backgroundImage(thumbnail) {
    return typeof thumbnail === 'string' ? `url('${thumbnail}')` : '';
  }

  _authors(authors) {
    return Array.isArray(authors) ? authors.join(', ') : '';
  }

  render() {
    const {
      imageLinks: { thumbnail } = '',
      title,
      authors,
      shelf
    } = this.props.book;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage: this._backgroundImage(thumbnail)
            }}>
          </div>
          <div className="book-shelf-changer">
            <select onChange={this.handleChange} value={shelf ? shelf : 'none'}>
              <option value="move" disabled>Move to...</option>
              {
                Object.keys(BOOKSHELVES).map((key, id) => {
                  return (
                    <option key={id} value={key}>{BOOKSHELVES[key].title}</option>
                  );
                })
              }
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{this._authors(authors)}</div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object,
  onBookshelfChange: PropTypes.func
};

export default Book;
