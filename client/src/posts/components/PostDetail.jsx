import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getPost } from '../redux/selectors'
import { fetchSinglePost } from '../redux/actions'
import CommentList from '../../comments/components/CommentList.jsx'
import { formatDate } from '../../utils/formatDate'

import style from './PostDetail.css'

class PostDetail extends Component {
  componentDidMount = () => {
    const { match: { params: { postId } = {} } = {} } = this.props
    this.props.fetchSinglePost(postId)
  }

  render() {
    const { post } = this.props
    if (!post) return null

    const { title, author, voteScore, timestamp, body, id } = post

    return (
      <Fragment>
        <div className={style.postDetail}>
          <h5>{title}</h5>
          <div className={style.textSmall}>
            By {author} on {formatDate(timestamp)}
          </div>
          <div className={style.textSmall}>Votes: {voteScore}</div>
          <p className={style.textLarge}>{body}</p>
        </div>

        <CommentList postId={id} />
      </Fragment>
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
