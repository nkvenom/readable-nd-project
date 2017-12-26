import * as types from './actionTypes'
import { apiCall } from '../../utils/api'

function voteSuccess(id, delta) {
  return {
    type: types.VOTE_SUCCESS,
    id,
    delta,
  }
}

export function vote(id, delta) {
  return dispatch => {
    dispatch(voteSuccess(id, delta))
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
