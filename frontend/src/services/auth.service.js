import { httpService } from './http.service';
import Axios from 'axios';

const axios = Axios.create({
    withCredentials: true,
});

export const authService = {
    login,
    signup,
    logout,
};

// const AUTH_URL = 'auth/';
const STORAGE_KEY = 'user';
const TOKEN_KEY = 'token';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : '//localhost:5000';

async function login(userCred) {
    try {
        // const res = await httpService.post(`${BASE_URL}/api/auth/login`, userCred);
        const res = await axios.post(`${BASE_URL}/api/auth/login`, userCred);
        console.log(res.data);
        _saveLocalToken(res.data.token);
        return res.data.data.user;
    } catch (err) {
        console.log('Couldnt Log In', err);
    }
}
async function signup(userCred) {
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/signup`, userCred);
        console.log(res.data);
        _saveLocalToken(res.data.token);
        return res.data;
    } catch (err) {
        console.log('Couldnt Sign Up', err, err.message, err.response, err.request);
    }
}
async function logout() {}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
}
function _saveLocalToken(token) {
    sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    return token;
}
