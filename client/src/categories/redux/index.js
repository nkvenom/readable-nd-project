const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST'
const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'

function fetchCategories() {
    return (dispatch) => {
        dispatch(fetchCategoriesRequest())

    }
}

const fetchCategoriesRequest = () => ({
    type: FETCH_CATEGORIES_REQUEST,
    error: null,
})

const fetchCategoriesSuccess = () => ({
    type: FETCH_CATEGORIES_SUCCESS,
    error: null,
})

const fetchCategoriesFailure = (response) => ({
    type: FETCH_CATEGORIES_FAILURE,
    error: null,
})

export default function reducer(state={}, action) {
    return state
}

