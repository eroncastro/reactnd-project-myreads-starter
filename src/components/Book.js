import React from 'react';

class Book extends React.Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    console.log('I have changed');
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 188, backgroundImage: this.props.backgroundImage }}>
          </div>
          <div className="book-shelf-changer">
            <select onChange={this._onChange}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.bookTitle}</div>
        <div className="book-authors">{this.props.bookAuthors}</div>
      </div>
    );
  }
}

export default Book;
