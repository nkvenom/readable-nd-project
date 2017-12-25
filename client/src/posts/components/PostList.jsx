import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts } from '../redux'
import PostItem from './PostItem'
import * as actions from '../redux/actions'
import * as selectors from '../redux/selectors'

class PostList extends Component {
  state = {
    sortKey: null,
    sortMode: 0
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

  componentDidUpdate() {
    console.log(this.props.match)
  }

  onSortClick = e => {
    console.log('e.target=', e.target)
    console.log('e.currentTarget=', e.currentTarget)
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

      if (sortMode === 1) {
        return aVal - bVal
      }
      if (sortMode === 2) {
        return bVal - aVal
      }
    })
  }

  render() {
    const list = this.getSortedList()
    return (
      <Fragment>
        <div id="sortingButtons" onClick={this.onSortClick}>
          Sort by
          <button id="timestamp">{this.state.sortMode} | Date</button>
          <button id="voteScore">{this.state.sortMode} | Votes</button>
        </div>
        <div>
          {list.map(li => (
            <PostItem
              {...li}
              key={li.id}
              upVote={this.upVote}
              downVote={this.downVote}
            />
          ))}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { match: { params: { categoryId } = {} } = {} } = ownProps
  return {
    list: selectors.getPostList(state, categoryId)
  }
}
const mapDispatchToProps = {
  vote: actions.vote,
  fetchAllPosts
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
