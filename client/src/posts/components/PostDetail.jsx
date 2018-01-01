import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost } from '../redux/selectors'
import { fetchSinglePost } from '../redux/actions'
import CommentList from '../../comments/components/CommentList.jsx'
import { formatDate } from '../../utils/formatDate'

class PostDetail extends Component {
  componentDidMount = () => {
    const { match: { params: { postId } = {} } = {} } = this.props
    this.props.fetchSinglePost(postId)
  }

  render() {
    const { post } = this.props
    if (!post) return null

    const { title, author, voteScore, timestamp, body, id, } = post

    return (
      <div>
        <h1>{title}</h1>
        <div>Author: {author}</div>
        <div>Date: {formatDate(timestamp)}</div>
        <div>Votes: {voteScore}</div>
        <p>{body}</p>

        <CommentList postId={id} />
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const { match: { params: { postId } = {} } = {} } = ownProps
  const post = getPost(state, postId)
  return {
    post
  }
}
const mapDispatchToProps = {
  fetchSinglePost
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
