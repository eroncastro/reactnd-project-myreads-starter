import React from 'react';
import Bookshelf from './Bookshelf';
import { getAll } from '../BooksAPI';

export const BOOKSHELVES = Object.freeze({
  currentlyReading: {
    title: 'Currently Reading'
  },
  wantToRead: {
    title: 'Want to Read'
  },
  read: {
    title: 'Read'
  }
});

class Bookshelves extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };

    this.changeBookshelf = this.changeBookshelf.bind(this);
  }

  componentDidMount() {
    getAll()
      .then(books => {
        this.setState({ books });
      });
  }

  changeBookshelf(book) {
    this.setState(state => {
      const books = state.books.reduce((prev, cur) => {
        if (cur.id !== book.id) {
          return [...prev, cur];
        } else if (!Object.keys(BOOKSHELVES).includes(book.shelf)) {
          return prev;
        } else {
          return [...prev, book];
        }
      }, []);

      return { books };
    })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{this.props.title}</h1>
        </div>
        <div className="list-books-content">
          {
            Object.keys(BOOKSHELVES).map((key, id) => {
              return (
                <Bookshelf
                  key={`${key}-${id}`}
                  title={BOOKSHELVES[key].title}
                  books={this.state.books.filter(book => book.shelf === key)}
                  onBookshelfChange={this.changeBookshelf}
                />
              );
            })
          }
        </div>
        <div className="open-search">
          <button>Add a book</button>
        </div>
      </div>
    );
  }
}

export default Bookshelves;
