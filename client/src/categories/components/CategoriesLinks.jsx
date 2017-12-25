import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { fetchCategories } from '../redux/actions'
import * as selectors from '../redux/selectors'

class CategoriesLinks extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const { categories } = this.props
    return (
      <div>
        {categories && categories.map(c => <Link key={c.path} to={`/${c.path}`}>{c.name}</Link>)}
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    categories: selectors.getCategories(state),
  }
}
const mapDispatchToProps = {
    fetchCategories
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesLinks)
