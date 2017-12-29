import { apiCall } from '../../utils/api'
import {FETCH_COMMENTS_BY_ID_FAILURE, FETCH_COMMENTS_BY_ID_SUCCESS} from './actionTypes'


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

export function fetchCommentsByPostId(postId) {
  return async dispatch => {
    try {
      const comments = await apiCall(`/posts/${postId}/comments`)
      console.log('>>>>>>>', comments)
      return dispatch(fetchCommentsSuccess(postId, comments))
    } catch (error) {
      dispatch(commentsFailure(postId))
      console.error('HORRORR', error)
    }
  }}
