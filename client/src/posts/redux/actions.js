import * as types from './actionTypes'
import { apiCall } from '../../utils/api'
import { uid } from '../../utils/generate-uid'

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

const createPostSuccess = post => {
  return {
    type: types.CREATE_POST_SUCCESS,
    post,
    id: post.id
  }
}

const createPostFailure = error => ({
  type: types.CREATE_POST_FAILURE,
  error
})

export function createPost(post) {
  return async dispatch => {
    post.timestamp = new Date().getTime()
    post.id = uid()

    try {
      const newPost = await apiCall('/posts', {
        method: 'POST',
        body: JSON.stringify({ ...post })
      })

      return dispatch(createPostSuccess(newPost))
    } catch (error) {
      dispatch(createPostFailure(error))
    }
  }
}


const updatePostSuccess = post => {
  return {
    type: types.CREATE_POST_SUCCESS,
    post,
    id: post.id
  }
}

const updatePostFailure = error => ({
  type: types.CREATE_POST_FAILURE,
  error
})

export function updatePost(post) {
  return async dispatch => {
    try {
      const updatedPost = await apiCall(`/posts/${post.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...post })
      })

      return dispatch(updatePostSuccess(updatedPost))
    } catch (error) {
      dispatch(updatePostFailure(error))
    }
  }
}



function voteSuccess(id, delta) {
  return {
    type: types.VOTE_SUCCESS,
    id,
    delta
  }
}

function voteFailure(id, delta) {
  return {
    type: types.VOTE_FAILURE,
    id,
    delta
  }
}

export function vote(id, delta) {
  return async dispatch => {
    try {
      const option = delta > 0 ? 'upVote' : 'downVote'
      await apiCall(`/posts/${id}`, {
        method: 'POST',
        body: JSON.stringify({ option })
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

export function fetchSinglePost(id) {
  return async dispatch => {
    try {
      const post = await apiCall(`/posts/${id}`)
      return dispatch(fetchPostsSuccess([post]))
    } catch (error) {
      console.error('HORRORR', error)
      dispatch(fetchPostsFailure(error))
    }
  }
}
