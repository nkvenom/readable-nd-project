import { apiCall } from './../../utils/api'
import * as types from './actionTypes'


export function fetchCategories() {
  return async dispatch => {
    dispatch(fetchCategoriesRequest())

    try {
      const res = await apiCall('/categories')
      dispatch(fetchCategoriesSuccess(res && res.categories))
      return res
    } catch (error) {
      dispatch(fetchCategoriesFailure(error))
      return error
    }
  }
}

const fetchCategoriesRequest = () => ({
  type: types.FETCH_CATEGORIES_REQUEST,
  error: null
})

const fetchCategoriesSuccess = categories => ({
  type: types.FETCH_CATEGORIES_SUCCESS,
  categories,
  error: null
})

const fetchCategoriesFailure = error => {
  console.log(error)

  return {
    type: types.FETCH_CATEGORIES_FAILURE,
    error: error.message,
    stack: error.stack
  }
}
