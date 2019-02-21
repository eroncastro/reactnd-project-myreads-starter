import React from 'react';
import Bookshelf from './Bookshelf';
import { getAll } from '../BooksAPI';

export const bookshelves = Object.freeze({
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
      bookshelves: {
        currentlyReading: [],
        wantToRead: [],
        read: []
      }
    };

    this.changeBookshelf = this.changeBookshelf.bind(this);
  }

  componentDidMount() {
    getAll()
      .then(books => {
        this.setState({
          bookshelves: this._groupBooksIntoShelves(books)
        });
      });
  }

  changeBookshelf(previousBookInfo, currentBookInfo) {
    const bookshelves = {
      ...this.state.bookshelves,
      [previousBookInfo.shelf]: (
        this.state.bookshelves[previousBookInfo.shelf].filter(item => {
          return item.title !== previousBookInfo.title;
        })
      ),
      [currentBookInfo.shelf]: [
        ...this.state.bookshelves[currentBookInfo.shelf],
        currentBookInfo
      ]
    };

    this.setState({ bookshelves });
  }

  _groupBooksIntoShelves(books) {
    const initialBookshelves = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    };

    return books.reduce((prev, cur) => {
      const shelf = {
        [cur.shelf]: initialBookshelves[cur.shelf].concat(cur)
      };

      return {...prev, ...shelf};
    }, initialBookshelves);
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{this.props.title}</h1>
        </div>
        <div className="list-books-content">
          {
            Object.entries(this.state.bookshelves).map((item, id) => {
              const [bookshelf, books] = item;

              return (
                <Bookshelf
                  key={`${bookshelf}-${id}`}
                  title={bookshelves[bookshelf].title}
                  books={books}
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
