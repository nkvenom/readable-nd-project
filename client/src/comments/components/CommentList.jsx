import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as selectors from '../redux/selectors'
import * as actions from '../redux/actions'

class CommentList extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  componentDidMount() {
    console.log(this.props.fetchCommentsByPostId)
    this.props.fetchCommentsByPostId(this.props.postId)
  }

  render() {
    const { list } = this.props
    return (
      <div>
        {list && list.map(c => (<div>{c.body}</div>))}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  list: selectors.getCommentListByPostId(state, ownProps.postId)
})
const mapDispatchToProps = {
  fetchCommentsByPostId: actions.fetchCommentsByPostId,
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
