import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

import { fetchCategories } from '../redux/actions'
import * as selectors from '../redux/selectors'
import cn from 'classnames'
import style from './CategoriesLinks.css'

class CategoriesLinks extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const { categories } = this.props
    return (
      <ul className={cn('nav justify-content-center', style.categoryLinks)}>
        <li className="nav-item">
          <NavLink strict exact className="nav-link" to="/">All</NavLink>
        </li>
        {categories &&
          categories.map(c => (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                key={c.path}
                to={`/${c.path}`}
              >
                {c.name}
              </NavLink>
            </li>
          ))}
      </ul>
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
