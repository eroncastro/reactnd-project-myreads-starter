import React from 'react';
import { update } from '../BooksAPI';

class Book extends React.Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
  }

  _onChange(event) {
    const currentBookInfo = {...this.props.book, shelf: event.target.value };

    update(this.props.book, event.target.value)
      .then(response => {
        if (typeof this.props.onBookshelfChange !== 'function') return;

        this.props.onBookshelfChange(this.props.book, currentBookInfo);
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
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
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
