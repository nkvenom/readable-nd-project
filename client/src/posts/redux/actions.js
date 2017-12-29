import * as types from './actionTypes'
import { apiCall } from '../../utils/api'


const fetchPostsRequest = () => ({
  type: types.FETCH_POSTS_REQUEST,
  error: null
})

const fetchPostsSuccess = posts => ({
  type: types.FETCH_POSTS_SUCCESS,
  posts,
  error: null
})

const fetchPostsFailure = error => {
  console.log(error)

  return {
    type: types.FETCH_POSTS_FAILURE,
    error: error.message,
    stack: error.stack
  }
}


export const fetchAllPosts = () => {
  return async dispatch => {
    dispatch(fetchPostsRequest())

    try {
      const res = await apiCall('/posts')
      dispatch(fetchPostsSuccess(res))
      return res
    } catch (error) {
      dispatch(fetchPostsFailure(error))
      return error
    }
  }
}


function voteSuccess(id, delta) {
  return {
    type: types.VOTE_SUCCESS,
    id,
    delta,
  }
}

function voteFailure(id, delta) {
  return {
    type: types.VOTE_FAILURE,
    id,
    delta,
  }
}

export function vote(id, delta) {
  return async dispatch => {
    try {
      const option = delta > 0 ? 'upVote' : 'downVote'
      await apiCall(`/posts/${id}`, {
        method: 'POST',
        body: JSON.stringify({ option }),
      })

      dispatch(voteSuccess(id, delta))
    } catch (error) {
      dispatch(voteFailure(id, delta))
      console.error(error)
    }
  }
}

export function deleteSuccess(id) {
  return {
    type: types.DELETE_SUCCESS,
    id
  }
}

export function deleteFailure(id) {
  return {
    type: types.DELETE_FAILURE,
    id
  }
}

export function deletePost(id) {
  return async dispatch => {
    try {
      await apiCall(`/posts/${id}`, {
        method: 'DELETE'
      })

      return dispatch(deleteSuccess(id))
    } catch (error) {
      dispatch(deleteFailure(id))
      console.error('HORRORR', error)
    }
  }
}


