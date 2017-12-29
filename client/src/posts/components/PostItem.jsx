import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'


export default class PostItem extends Component {
  static propTypes = {
    id: PropTypes.string,
    timestamp: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    voteScore: PropTypes.number,
    delete: PropTypes.func.isRequired,
  }

  upVote = () => {
    this.props.upVote(this.props.id)
  }

  downVote = () => {
    this.props.downVote(this.props.id)
  }

  delete = () => {
    this.props.delete(this.props.id)
  };

  render() {
    const { title, author, voteScore, commentCount, timestamp, category, id } = this.props

    const strDate = new Date(timestamp).toLocaleDateString()
    return (
      <div>
        <Link to={`/${category}/${id}`}>
          {title} | {strDate} | {author}
        </Link>
        | comments: ({commentCount}) |
        {voteScore}
        <button onClick={this.upVote}>Up</button>
        <button onClick={this.downVote}>Down</button>
        <button onClick={this.delete}>Delete</button>
      </div>
    )
  }
}
