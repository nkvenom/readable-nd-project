import { apiCall } from './../../utils/api'

const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST'
const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'

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
  type: FETCH_CATEGORIES_REQUEST,
  error: null
})

const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  categories,
  error: null
})

const fetchCategoriesFailure = error => {
  console.log(error)

  return {
    type: FETCH_CATEGORIES_FAILURE,
    error: error.message,
    stack: error.stack
  }
}

export default function reducer(state = [], action) {
  const { categories } = action
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return categories
    default:
      return state
  }
}
