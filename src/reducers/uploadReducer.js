const ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE';
const REMOVE_UPLOAD_FILE = 'REMOVE_UPLOAD_FILE';
const CHANGE_UPLOAD_FILE = 'CHANGE_UPLOAD_FILE';

const defaultState = {
    files: []
}

export default function uploadReducer(state = defaultState, action) {
    switch(action.type) {
        case ADD_UPLOAD_FILE:
            return {
                ...state,
                files: [
                    ...state.files,
                    action.payload
                ]
            }
        case REMOVE_UPLOAD_FILE:
            return {
                ...state,
                files: [
                    ...state.files.filter(file => file.id !== action.payload)
                ]
            }
        case CHANGE_UPLOAD_FILE:
            return {
                ...state,
                files: [
                    ...state.files.map(file =>
                        file.id === action.payload.id
                        ?
                        {...file, progress: action.payload.progress}
                        :
                        {...file}
                    )
                ]
            }
        default:
            return state;
    }
}

export const addUploadFile = file => {
    return {
        type: ADD_UPLOAD_FILE,
        payload: file
    }
}
export const removeUploadFile = fileId => {
    return {
        type: REMOVE_UPLOAD_FILE,
        payload: fileId
    }
}
export const changeUploadFile = payload => {
    return {
        type: CHANGE_UPLOAD_FILE,
        payload: payload
    }
}