import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import { PostList } from './posts'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Readable</h1>
        </header>

        <h2>Categories</h2>
        <h2>Posts</h2>
        <PostList />
      </div>
    )
  }
}

export default App
