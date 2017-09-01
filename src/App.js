import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

// Book Helper
const isSameBook = (a, b) => a.id === b.id
const containsBook = (collection, book) => (
  collection.find((item) => item.id === book.id) ? true : false
)
const assignShelf = (book, shelf) => Object.assign({}, book, { shelf })

class BooksApp extends React.Component {
  state = {
    myBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((myBooks) => {
      this.setState({ myBooks })
    })
  }

  handleMove = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => console.log(response))
    // If book is found, replace it.
    // Otherwise add it to the myBooks array.
    let bookOnShelf = assignShelf(book, shelf)
    this.setState(prevState => (
      containsBook(prevState.myBooks, book)
        ? { myBooks: prevState.myBooks.map((someBook) =>
              (isSameBook(someBook, book) ? bookOnShelf : someBook))
          }
        // Book can't be found -> Add it to the array
        : { myBooks: prevState.myBooks.concat([ bookOnShelf ]) }
    ))
  }

  render() {
    return (
      <div className="app">
        <Route
          exact path="/"
          render={() => (
            <ListBooks books={this.state.myBooks} onMove={this.handleMove}/>
          )}
        />
        <Route
          exact path="/search"
          render={() => (
            <SearchBooks myBooks={this.state.myBooks} onMove={this.handleMove}/>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
