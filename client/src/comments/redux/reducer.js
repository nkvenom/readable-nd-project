import * as types from './actionTypes'

export default function reducer(state = {}, action) {
  const { postId, comments: commentsArray, id } = action
  switch (action.type) {
    case types.FETCH_COMMENTS_BY_ID_SUCCESS: {
      const commentMap = commentsArray.reduce((commentsMap, comment) => {
        commentsMap[comment.id] = comment
        return commentsMap
      }, {})

      return {
        ...state,
        [postId]: commentMap
      }
    }

      case types.COMMENT_VOTE_SUCCESS: {
        const commentsMap = state[postId]
        const comment = commentsMap[id]

        return {
          ...state,
          [postId]: {
            ...commentsMap,
            [id]: {
              ...comment,
              voteScore: comment.voteScore + action.delta
            }
          }
        }
      }

      case types.COMMENT_DELETE_SUCCESS: {
        const commentsMap = state[postId]
        const {
          [id]: toDel,
          ...restComments,
        } = commentsMap

        return {
          ...state,
          [postId]: restComments
        }
      }

    default:
      return state
  }
}
