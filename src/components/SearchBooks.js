import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import BookList from './BookList';
import { search } from '../BooksAPI';

const WAIT_SEARCH_TIME = 1000;

class SearchBooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      booksFound: []
    };

    this.handleChange = this.handleChange.bind(this);
    this._searchBooks = this._searchBooks.bind(this);
  }

  _createHashMap() {
    return this.props.books.reduce((prev, cur) => {
      return {...prev, ...{ [cur.title]: cur.shelf }};
    }, {});
  }

  handleChange(event) {
    const searchTerm = event.target.value.trim();

    this.setState({ searchTerm });

    if (searchTerm) {
      debounce(this._searchBooks, WAIT_SEARCH_TIME)(searchTerm);
    } else {
      this.setState({ booksFound: [] })
    }
  }

  _searchBooks(term) {
    search(term)
      .then(response => {
        if (response.error) return;

        this.setState({ booksFound: response });
      });
  }

  render() {
    const hashMap = this._createHashMap();

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.searchTerm}
              placeholder="Search by title or author"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BookList
              books={
                this.state.booksFound.map(item => {
                  if (!hashMap.hasOwnProperty(item.title)) return item;

                  return { ...item,  ...{ shelf: hashMap[item.title] } };
                })
              }
              onBookshelfChange={this.props.onBookshelfChange}
            />
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  books: PropTypes.array,
  onBookshelfChange: PropTypes.func
};

export default SearchBooks;
