import React from 'react';
import { update } from '../BooksAPI';
import { BOOKSHELVES } from './Bookshelves';

class Book extends React.Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
  }

  _onChange(event) {
    const book = {...this.props.book, shelf: event.target.value };

    update(this.props.book, event.target.value)
      .then(() => {
        if (typeof this.props.onBookshelfChange !== 'function') return;

        this.props.onBookshelfChange(book);
      })
  }

  render() {
    const {
      imageLinks: { thumbnail },
      title,
      authors,
      shelf
    } = this.props.book;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 188, backgroundImage: `url('${thumbnail}')` }}>
          </div>
          <div className="book-shelf-changer">
            <select onChange={event => this._onChange(event)} value={shelf}>
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
        <div className="book-authors">{authors}</div>
      </div>
    );
  }
}

export default Book;
