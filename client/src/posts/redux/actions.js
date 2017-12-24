import * as types from './actionTypes'

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
