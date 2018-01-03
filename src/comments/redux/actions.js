import { apiCall } from '../../utils/api'
import {
  FETCH_COMMENTS_BY_ID_FAILURE,
  FETCH_COMMENTS_BY_ID_SUCCESS,
  COMMENT_VOTE_SUCCESS,
  COMMENT_VOTE_FAILURE,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAILURE,
  UPDATE_COMMENT_FAILURE,
  UPDATE_COMMENT_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE
} from './actionTypes'
import { uid } from '../../utils/generate-uid'

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

export function updateCommentSuccess(comment) {
  return {
    type: UPDATE_COMMENT_SUCCESS,
    comment,
    id: comment.id,
    postId: comment.parentId,
  }
}

export function updateCommentFailure(error) {
  return {
    type: UPDATE_COMMENT_FAILURE,
    error: error.message,
    stack: error.stack,
  }
}

export function updateComment(comment) {
  return async dispatch => {

    try {
      const updated = await apiCall(`/comments/${comment.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...comment })
      })

      return dispatch(updateCommentSuccess(updated))
    } catch (error) {
      dispatch(updateCommentFailure(error))
    }
  }
}


export function createCommentSuccess(comment) {
  return {
    type: CREATE_COMMENT_SUCCESS,
    comment,
    id: comment.id,
    postId: comment.parentId,
  }
}

export function createCommentFailure(error) {
  return {
    type: CREATE_COMMENT_FAILURE,
    error: error.message,
    stack: error.stack,
  }
}

export function createComment(comment) {
  return async dispatch => {

    comment.timestamp = new Date().getTime()
    comment.id = uid()

    try {
      const response = await apiCall('/comments', {
        method: 'POST',
        body: JSON.stringify({ ...comment })
      })

      return dispatch(createCommentSuccess(response))
    } catch (error) {
      dispatch(createCommentFailure(error))
    }
  }
}

