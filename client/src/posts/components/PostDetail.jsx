import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost } from '../redux/selectors'
import CommentList from '../../comments/components/CommentList.jsx'

class PostDetail extends Component {
  render() {
    const { post } = this.props
    if (!post) return null

    const { title, author, voteScore, timestamp, body, id, } = post

    return (
      <div>
        <h1>{title}</h1>
        <div>{author}</div>
        <div>{timestamp}</div>
        <div>{voteScore}</div>
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
export default connect(mapStateToProps, null)(PostDetail)
