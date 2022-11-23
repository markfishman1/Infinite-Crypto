import { httpService } from './http.service';
import Axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : '//localhost:5000';

const axios = Axios.create({
    withCredentials: true,
});
export const apiService = {
    insertCoinData,
};
async function insertCoinData(coinData) {
    try {
        console.log('Inserting Coin Data');
        const coins = await httpService.post(`/coin`, coinData);
        console.log(coins);
    } catch (err) {
        console.log(err);
    }
}
