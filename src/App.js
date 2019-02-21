import React from 'react';
import './App.css';
import Bookshelves from './components/Bookshelves';
import SearchBooks from './components/SearchBooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSearchPage: false
    }
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" component={() => <Bookshelves title="My Reads" />} />
          <Route path="/search" component={SearchBooks} />
        </div>
      </Router>
    );
  }
}

export default BooksApp;
