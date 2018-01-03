import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

import { fetchCategories } from '../redux/actions'
import * as selectors from '../redux/selectors'

import style from './CategoriesLinks.css'

class CategoriesLinks extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const { categories } = this.props
    return (
      <div className={style.categoryLinks}>
        <NavLink strict exact to="/">All</NavLink>
        {categories &&
          categories.map(c => (
            <NavLink
              className={style.navLink}
              activeClassName={style.active}
              key={c.path}
              to={`/${c.path}`}
            >
              {c.name}
            </NavLink>
          ))}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: selectors.getCategories(state)
  }
}
const mapDispatchToProps = {
  fetchCategories
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesLinks)
