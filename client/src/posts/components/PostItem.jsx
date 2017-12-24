import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PostItem extends Component {
  static propTypes = {
    id: PropTypes.string,
    timestamp: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    voteScore: PropTypes.number,
    deleted: PropTypes.bool,
  }

upVote = () => {
    this.props.upVote(this.props.id)
};

downVote = () => {
    this.props.downVote(this.props.id)
};

  render() {
    const {
        title,
        voteScore,
    } = this.props
    return (
      <div>
          {title} | {voteScore}
          <button onClick={this.upVote}>Up</button>
          <button onClick={this.downVote}>Down</button>
      </div>
    )
  }
}
