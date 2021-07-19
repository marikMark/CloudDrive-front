import axios from 'axios';
import { setUser } from '../reducers/userReducer';
import { setLoading } from '../reducers/loadingReducer';

export const login = () => {
    return async dispatch => {
        dispatch(setLoading(true));
        const res = await axios.get('https://clouddrive-back.herokuapp.com/api/auth/login');
        const {user} = res.data;
        const {token} = res.data;
        dispatch(setUser(user));
        localStorage.setItem('token', token);
        dispatch(setLoading(false));
    }
}

export const auth = () => {
    return async dispatch => {
        const res = await axios.get('https://clouddrive-back.herokuapp.com/api/auth/check', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const {user} = res.data;
        const {token} = res.data;
        dispatch(setUser(user));
        localStorage.setItem('token', token);
    }
};