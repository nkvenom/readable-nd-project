import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PostItem from './PostItem'
import * as actions from '../redux/actions'
import * as selectors from '../redux/selectors'
import PostForm from './PostForm'

const SORT_UP = 1
const SORT_DOWN = 2
const SORT_NONE = 0

class PostList extends Component {
  state = {
    sortKey: null,
    sortMode: 0,
    showNewForm: false
  }

  componentDidMount() {
    this.props.fetchAllPosts()
  }

  downVote = id => {
    this.props.vote(id, -1)
  }

  upVote = id => {
    this.props.vote(id, 1)
  }

  onSortClick = e => {
    let newSortKey = e.target.id

    this.setState(({ sortKey, sortMode }) => {
      let newSortMode = sortMode
      if (sortKey === newSortKey) {
        newSortMode += 1

        if (newSortMode > 2) {
          newSortKey = null
          newSortMode = 0
        }
      } else {
        newSortMode = 1
      }
      return {
        sortKey: newSortKey,
        sortMode: newSortMode
      }
    })
  }

  getSortedList = () => {
    const { list: propList } = this.props
    const list = [...propList]
    const { sortKey, sortMode } = this.state

    if (!sortKey || !sortMode) return list

    return list.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]

      if (sortMode === SORT_UP) {
        return aVal - bVal
      }
      if (sortMode === SORT_DOWN) {
        return bVal - aVal
      }

      return SORT_NONE
    })
  }

  deletePost = postId => {
    this.props.deletePost(postId)
  }

  toggleNewForm = () => {
    this.setState(({ showNewForm }) => {
      return {
        showNewForm: !showNewForm
      }
    })
  }

  onNewPostFinished = post => {
    this.props.createPost(post)
    this.toggleNewForm()
  }

  onEditFinished = post => {
    this.props.updatePost(post)
  }

  renderSortButton({ id, label }) {
    let iconClass = 'fa fa-sort'
    if (this.state.sortKey === id && this.state.sortMode === SORT_UP) {
      iconClass = 'fa fa-sort-up'
    } else if (this.state.sortKey === id && this.state.sortMode === SORT_DOWN) {
      iconClass = 'fa fa-sort-down'
    }

    return (
      <button id={id} className="btn btn-sm btn-light">
        <i className={iconClass} aria-hidden="true" /> {label}
      </button>
    )
  }

  render() {
    const { showNewForm } = this.state
    const list = this.getSortedList()
    return (
      <Fragment>
        <div id="sortingButtons" onClick={this.onSortClick}>
          Sort by &nbsp;
          {this.renderSortButton({ id: 'timestamp', label: 'Date' })}
          {this.renderSortButton({ id: 'voteScore', label: 'Votes' })}
        </div>
        <div>
          {list.map(li => (
            <PostItem
              post={li}
              key={li.id}
              upVote={this.upVote}
              downVote={this.downVote}
              delete={this.deletePost}
              onEditFinished={this.onEditFinished}
            />
          ))}
        </div>

        {showNewForm ? (
          <PostNewForm
            onEditFinished={this.onNewPostFinished}
            onCancel={this.toggleNewForm}
          />
        ) : (
          <button
            className="btn btn-lg btn-primary"
            onClick={this.toggleNewForm}
            id="createNew"
          >
            Create New
          </button>
        )}
      </Fragment>
    )
  }
}

const PostNewForm = connect(
  state => ({
    post: {
      title: '',
      body: '',
      author: '',
      category: ''
    }
  }),
  null
)(PostForm)

const mapStateToProps = (state, ownProps) => {
  const { match: { params: { categoryId } = {} } = {} } = ownProps
  return {
    list: selectors.getPostList(state, categoryId)
  }
}
const mapDispatchToProps = {
  deletePost: actions.deletePost,
  vote: actions.vote,
  fetchAllPosts: actions.fetchAllPosts,
  createPost: actions.createPost,
  updatePost: actions.updatePost
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
