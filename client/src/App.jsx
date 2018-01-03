import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import logo from './logo.svg'
import style from './App.css'

import { PostList, PostDetail } from './posts'
import { CategoriesLinks } from './categories'

class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <header className={style.appHeader}>
          <img src={logo} className={style.appLogo} alt="logo" />
          <h1 className={style.appTitle}>Readable</h1>
        </header>

        <Router>
          <div>
            <CategoriesLinks />
            <Switch>
              <Route path="/" exact component={PostList} />
              <Route path="/:categoryId" exact component={PostList} />
              <Route path="/:categoryId/:postId" exact component={PostDetail} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
