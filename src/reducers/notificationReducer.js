const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

const defaultState = {
    pushNotifications: []
}

export default function notificationReducer(state = defaultState, action) {
    switch(action.type) {
        case ADD_NOTIFICATION:
            const id = Date.now();
            const sizeOfBuffer = state.pushNotifications.length;
            if(sizeOfBuffer === 5) {
                state.pushNotifications.shift();
            }
            return {
                ...state,
                pushNotifications: [
                    ...state.pushNotifications,
                    {
                        id,
                        message: action.payload
                    }
                ]
            }
        case REMOVE_NOTIFICATION:
            const newNotification = state.pushNotifications.filter(obj => obj.id !== action.payload);
            return {
                ...state,
                pushNotifications: newNotification
            }
        default:
            return state;
    }
}

export const addNotification = message => {
    return {
        type: ADD_NOTIFICATION,
        payload: message
    }
}
export const removeNotification = messageId => {
    return {
        type: REMOVE_NOTIFICATION,
        payload: messageId
    }
}