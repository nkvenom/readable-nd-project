import * as types from './actionTypes'

export default function reducer(state = [], action) {
  const { categories } = action
  switch (action.type) {
    case types.FETCH_CATEGORIES_SUCCESS:
      return categories
    default:
      return state
  }
}
