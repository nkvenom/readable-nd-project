import { apiCall } from '../../utils/api'
import {
  FETCH_COMMENTS_BY_ID_FAILURE,
  FETCH_COMMENTS_BY_ID_SUCCESS,
  COMMENT_VOTE_SUCCESS,
  COMMENT_VOTE_FAILURE,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAILURE
} from './actionTypes'

function fetchCommentsSuccess(postId, comments) {
  return {
    type: FETCH_COMMENTS_BY_ID_SUCCESS,
    postId,
    comments
  }
}

function commentsFailure(postId) {
  return {
    type: FETCH_COMMENTS_BY_ID_FAILURE,
    postId
  }
}

function voteSuccess(postId, id, delta) {
  return {
    type: COMMENT_VOTE_SUCCESS,
    postId,
    id,
    delta
  }
}

function voteFailure(postId, id, delta) {
  return {
    type: COMMENT_VOTE_FAILURE,
    postId,
    id,
    delta
  }
}

export function vote(postId, id, delta) {
  return async dispatch => {
    try {
      const option = delta > 0 ? 'upVote' : 'downVote'
      await apiCall(`/comments/${id}`, {
        method: 'POST',
        body: JSON.stringify({ option })
      })

      dispatch(voteSuccess(postId, id, delta))
    } catch (error) {
      dispatch(voteFailure(postId, id, delta))
      console.error(error)
    }
  }
}

export function deleteSuccess(postId, id) {
  return {
    type: COMMENT_DELETE_SUCCESS,
    postId,
    id,
  }
}

export function deleteFailure(postId, id) {
  return {
    type: COMMENT_DELETE_FAILURE,
    postId,
    id,
  }
}

export function deleteComment(postId, id) {
  return async dispatch => {
    try {
      await apiCall(`/comments/${id}`, {
        method: 'DELETE'
      })

      return dispatch(deleteSuccess(postId, id))
    } catch (error) {
      dispatch(deleteFailure(postId, id))
      console.error('HORRORR', error)
    }
  }
}

export function fetchCommentsByPostId(postId) {
  return async dispatch => {
    try {
      const comments = await apiCall(`/posts/${postId}/comments`)
      return dispatch(fetchCommentsSuccess(postId, comments))
    } catch (error) {
      dispatch(commentsFailure(postId))
      console.error('HORRORR', error)
    }
  }
}
