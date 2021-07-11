const SET_FILES = 'SET_FILES';
const SET_CURRENT_DIR = 'SET_CURRENT_DIR';
const ADD_FOLDER = 'ADD_FOLDER';
const PUSH_TO_STACK = 'PUSH_TO_STACK';
const POP_TO_STACK = 'POP_TO_STACK';
const SET_DRAGGING_FILE = 'SET_DRAGGING_FILE';
const REMOVE_FROM_FILES = 'REMOVE_FROM_FILES';
const RENAME_FILE = 'RENAME_FILE';
const UPDATE_FILE = 'UPDATE_FILE';

const defaultState = {
    files: [],
    currentDir: 'null',
    dirStack: [],
    draggingFile: null
}

export default function fileReducer(state = defaultState, action) {
    switch(action.type) {
        case SET_FILES:
            return {
                ...state,
                files: action.payload
            }
        case SET_CURRENT_DIR:
            return {
                ...state,
                currentDir: action.payload
            }
        case ADD_FOLDER:
            return {
                ...state,
                files: [
                    ...state.files,
                    action.payload
                ]
            }
        case PUSH_TO_STACK:
            return {
                ...state,
                dirStack: [...state.dirStack, action.payload]
            }
        case SET_DRAGGING_FILE:
            return {
                ...state,
                draggingFile: action.payload
            }
        case REMOVE_FROM_FILES:
            const newFiles = state.files.filter(n => n._id !== action.payload._id);
            return {
                ...state,
                files: newFiles
            }
        case RENAME_FILE:
            let renamedFile = state.files.find(n => n._id === action.payload.file._id);
            renamedFile.name = action.payload.newName;
            renamedFile.type = action.payload.newType;
            const renamedFileIndex = state.files.findIndex(n => n._id === action.payload.file._id);
            state.files[renamedFileIndex] = renamedFile;
            return {
                ...state,
                files: [
                    ...state.files
                ]
            }
        case UPDATE_FILE:
            let updatedFile = state.files.find(n => n.id == action.payload.id);
            console.log(action.payload);
            updatedFile.size = action.payload.size;
            const updatedFileIndex = state.files.findIndex(n => n._id === action.payload._id);
            state.files[updatedFileIndex] = updatedFile;
            return {
                ...state,
                files: [
                    ...state.files
                ]
            }
        default:
            return state;
    }
}

export const setFiles = files => {
    return {
        type: SET_FILES,
        payload: files
    }
}
export const setCurrentDir = dir => {
    return {
        type: SET_CURRENT_DIR,
        payload: dir
    }
}
export const addFile = dir => {
    return {
        type: ADD_FOLDER,
        payload: dir
    }
}
export const pushToStack = dir => {
    return {
        type: PUSH_TO_STACK,
        payload: dir
    }
}
export const setDraggingFile = file => {
    return {
        type: SET_DRAGGING_FILE,
        payload: file
    }
}
export const removeFromFiles = file => {
    return {
        type: REMOVE_FROM_FILES,
        payload: file
    }
}
export const renameFileReducer = data => {
    return {
        type: RENAME_FILE,
        payload: data
    }
}
export const updateFile = file => {
    return {
        type: UPDATE_FILE,
        payload: file
    }
}