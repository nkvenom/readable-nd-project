import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getPost } from '../redux/selectors'
import { fetchSinglePost, vote, deletePost, updatePost } from '../redux/actions'
import CommentList from '../../comments/components/CommentList.jsx'
import { formatDate } from '../../utils/formatDate'
import { Redirect } from 'react-router-dom'
import style from './PostDetail.css'
import PostForm from './PostForm'

class PostDetail extends Component {
  state = {
    editMode: false
  }

  componentDidMount = () => {
    const { match: { params: { postId } = {} } = {} } = this.props
    this.props.fetchSinglePost(postId)
  }

  renderVotingGroup = () => {
    const { post: { voteScore } } = this.props
    return (
      <Fragment>
        <div className={style.votes}>{voteScore} votes</div>
        <div className="btn-group">
          <button
            className="btn btn-sm btn-light"
            title="Vote up"
            onClick={this.upVote}
          >
            <i className="fa fa-arrow-up" aria-hidden="true" />
          </button>

          <button
            className="btn btn-sm btn-light"
            title="Vote down"
            onClick={this.downVote}
          >
            <i className="fa fa-arrow-down" aria-hidden="true" />
          </button>
        </div>
      </Fragment>
    )
  }

  upVote = () => {
    const { post: { id } } = this.props
    this.props.vote(id, 1)
  }

  downVote = () => {
    const { post: { id } } = this.props
    this.props.vote(id, -1)
  }

  delete = e => {
    this.props.deletePost(this.props.post.id)
  }

  toggleEditMode = () => {
    this.setState(({ editMode }) => {
      return {
        editMode: !editMode
      }
    })
  }

  renderPostDetail = () => {
    const { post: { title, author, timestamp, body } = {} } = this.props

    return (
      <div className={style.postDetail}>
        <div className={style.detailHeader}>
          <h5>{title}</h5>
          <div className={style.postToolbar}>
            <button
              className="btn btn-sm"
              onClick={this.toggleEditMode}
              title="edit"
            >
              <i className="fa fa-pencil" aria-hidden="true" />
            </button>
            <button className="btn btn-sm" onClick={this.delete} title="Delete">
              <i className="fa fa-trash" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className={style.textSmall}>
          By {author} on {formatDate(timestamp)}
        </div>
        <div className={style.votingGroup}>{this.renderVotingGroup()}</div>
        <p className={style.textLarge}>{body}</p>
      </div>
    )
  }

  onEditFinished = newPost => {
    const { post: oldPost } = this.props
    const payload = { ...oldPost, ...newPost }
    payload.timestamp = oldPost.timestamp
    this.props.updatePost(payload)
    this.toggleEditMode()
  }

  render() {
    const { post } = this.props
    const { id, commentCount } = post || {}
    const { match: { params: { categoryId } = {} } = {} } = this.props

    if (!id) {
      return (
        <Redirect to={`/${categoryId}`} />
      )
    }

    return (
      <Fragment>
        {this.state.editMode ? (
          <PostForm
            post={post}
            onCancel={this.toggleEditMode}
            onEditFinished={this.onEditFinished}
          />
        ) : (
          this.renderPostDetail()
        )}

        <h5>{commentCount} Comments</h5>
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
  fetchSinglePost,
  vote,
  deletePost,
  updatePost
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
