import { apiCall } from '../../utils/api'
import * as types from './actionTypes'


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
