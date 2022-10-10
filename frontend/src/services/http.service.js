import Axios from 'axios';
// import router from '../router/index.js';

// const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '127.0.0.1:5000/api/';
const BASE_URL = '127.0.0.1:5000/api/';
var axios = Axios.create({
    withCredentials: true,
});

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data);
    },
    post(endpoint, data) {
        console.log(`${BASE_URL}${endpoint}`, data, endpoint);
        return ajax(endpoint, 'POST', data);
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data);
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data);
    },
};

async function ajax(endpoint, method = 'GET', data = null) {
    try {
        console.log(`${BASE_URL}${endpoint}`, data, endpoint);
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: method === 'GET' ? data : null,
        });
        return res.data;
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`, data);
        console.dir(err);
        if (err.response && err.response.status === 401) {
            // Depends on routing startegy - hash or history
            // window.location.assign('/#/login')
            // window.location.assign('/login')
            // router.push('/login')
        }
        throw err;
    }
}
