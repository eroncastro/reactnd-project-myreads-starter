import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Bookshelves from './components/Bookshelves';
import SearchBooks from './components/SearchBooks';
import { getAll } from './BooksAPI';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    }

    this.updateBookshelf = this.updateBookshelf.bind(this);
  }

  componentDidMount() {
    getAll()
      .then(books => {
        this.setState({ books });
      });
  }

  updateBookshelf(book) {
    this.setState(state => {
      const bookIndex = state.books.findIndex(({ id }) => id === book.id);
      const insertIndex = bookIndex !== -1 ? bookIndex : state.books.length;

      return {
        books: [
          ...state.books.slice(0, insertIndex),
          book,
          ...state.books.slice(insertIndex + 1)
        ]
      };
    });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route
            exact
            path="/"
            render={() => (
              <Bookshelves
                title="My Reads"
                books={this.state.books}
                onBookshelfChange={this.updateBookshelf}
              />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <SearchBooks
                books={this.state.books}
                onBookshelfChange={this.updateBookshelf} />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default BooksApp;
