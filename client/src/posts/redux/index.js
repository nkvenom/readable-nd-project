import { apiCall } from '../../utils/api'

const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'


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
  type: FETCH_POSTS_REQUEST,
  error: null
})

const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  posts,
  error: null
})

const fetchPostsFailure = error => {
  console.log(error)

  return {
    type: FETCH_POSTS_FAILURE,
    error: error.message,
    stack: error.stack
  }
}


export default function reducer(state = {}, action) {
  const { posts: postsArray } = action
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      const data = postsArray.reduce((postMap, post) => {
        postMap[post.id] = post
        return postMap
      }, {})

      return {
        ...state,
        data
      }
    default:
      return state
  }
}
