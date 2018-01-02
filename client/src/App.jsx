import React, { Component } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'

import { PostList, PostDetail } from './posts'
import { CategoriesLinks } from './categories'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Readable</h1>
        </header>

        <Router>
          <div>
            <CategoriesLinks />
            <Route path="/" exact component={PostList} />
            <Route path="/:categoryId" exact component={PostList} />
            <Route path="/:categoryId/:postId" exact component={PostDetail} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
