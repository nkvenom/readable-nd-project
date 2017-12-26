import * as types from './actionTypes'

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

    case types.DELETE_SUCCESS: {
      const {
        [id]: toDel,
        ...restData,
      } = state.data

      console.log('toDel=', toDel)
      return {
        ...state,
        data: restData,
      }
    }

    default:
      return state
  }
}
