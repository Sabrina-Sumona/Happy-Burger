import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
        }
    }
}

export const auth = (email, password, mode) =>
    dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }

        let authUrl = null;
        if (mode === "Sign Up") {
            authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
        } else {
            authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
        }
        const API_KEY = "AIzaSyDkBFrFFNrRZajx5N52G2PO6CwpAyd5Xcw";
        axios.post(authUrl + API_KEY, authData)
            .then(response => {
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                // sec to mili for that 1000 is used
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('expirationTime', expirationTime);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
    }

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Logout
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if (expirationTime <= new Date()) {
            // Logout
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }
}
