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
                // localStorage.setItem('token', response.data.idToken);
                // localStorage.setItem('userId', response.data.localId);
                // const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                // localStorage.setItem('expirationTime', expirationTime);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
    }
