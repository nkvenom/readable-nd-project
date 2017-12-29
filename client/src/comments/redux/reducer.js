import * as types from './actionTypes'

export default function reducer(state = {}, action) {
  const { postId, comments: commentsArray, id } = action
  console.log('action=', action)
  switch (action.type) {
    case types.FETCH_COMMENTS_BY_ID_SUCCESS:
      const commentMap = commentsArray.reduce((commentsMap, comment) => {
        commentsMap[comment.id] = comment
        return commentsMap
      }, {})

      return {
        ...state,
        [postId]: commentMap
      }

    case types.COMMENT_VOTE_SUCCESS: {
      return state
    }

    default:
      return state
  }
}
