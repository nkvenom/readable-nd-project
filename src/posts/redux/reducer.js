import * as types from './actionTypes'
import { CREATE_COMMENT_SUCCESS, COMMENT_DELETE_SUCCESS } from '../../comments/redux/actionTypes'

export default function reducer(state = {}, action) {
  const { posts: postsArray, id } = action
  switch (action.type) {
    case types.FETCH_POSTS_SUCCESS:
      const data = postsArray.reduce((postMap, post) => {
        postMap[post.id] = post
        return postMap
      }, {})

      return {
        ...state,
        data
      }

      case types.VOTE_SUCCESS: {
        return {
          ...state,
          data: {
            ...state.data,
            [id]: {
              ...state.data[id],
              voteScore: state.data[id].voteScore + action.delta
            }
          }
        }
      }

      case types.CREATE_POST_SUCCESS: {
        const post = action.post
        return {
          ...state,
          data: {
            ...state.data,
            [id]: {
              ...post,
            }
          }
        }
      }

    case types.DELETE_SUCCESS: {
      const {
        [id]: toDel,
        ...restData,
      } = state.data

      return {
        ...state,
        data: restData,
      }
    }

    case CREATE_COMMENT_SUCCESS: {
      return increaseCommentCount(state, action, 1)
    }

    case COMMENT_DELETE_SUCCESS: {
      return increaseCommentCount(state, action, -1)
    }

    default:
      return state
  }
}

function increaseCommentCount(state, action, delta) {
  const { postId } = action
  return {
    ...state,
    data: {
      ...state.data,
      [postId]: {
        ...state.data[postId],
        commentCount: state.data[postId].commentCount + delta
      }
    }
  }
}
