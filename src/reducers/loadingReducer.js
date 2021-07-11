const SET_LOADING = 'SET_LOADING';

const defaultState = {
    loading: false
}

export default function loadingReducer(state = defaultState, action) {
    switch(action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}

export const setLoading = value => {
    return {
        type: SET_LOADING,
        payload: value
    }
}