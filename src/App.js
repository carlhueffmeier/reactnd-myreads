import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    myBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((myBooks) => {
      this.setState({ myBooks })
    })
  }

  // TODO: Wow, this needs refactoring sooo bad
  handleMove = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => console.log(response))
    console.log('update', book, shelf)

    const bookWithShelf = (book, shelf) => Object.assign({}, book, { shelf })

    const updateShelf = (bookId, shelf) => (
      this.state.myBooks.map((item) => (
        (item.id === bookId)
          ? bookWithShelf(book, shelf)
          : item
      ))
    )

    let index = this.state.myBooks.findIndex((item) => (item.id === book.id))
    if (index > 0) {
      this.setState({myBooks: updateShelf(book.id, shelf)})
    } else {
      this.setState({
        myBooks: this.state.myBooks.concat([ bookWithShelf(book, shelf) ])
      })
    }
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
