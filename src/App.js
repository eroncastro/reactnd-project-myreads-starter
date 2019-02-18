import React from 'react';
import './App.css';
import Bookshelves from './components/Bookshelves';
import SearchBooks from './components/SearchBooks';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSearchPage: false
    }
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
          <Bookshelves title={'MyReads'} />
        )}
      </div>
    )
  }
}

export default BooksApp;
