import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TrendingCoins from '../components/TrendingCoins';
import Banner from '../components/Banner';
import { localStorageService } from '../services/local-storage-service';
import { fetchTrendingCoins } from '../store/actions/app-actions';

function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrendingCoins());
    }, [dispatch]);
    // const [trendingCoins, setTrendingCoins] = useState([]);
    // const [trendingCoinsData, setTrendingCoinsData] = useState([]);
    // console.log('hello');
    // const extractTrendingCoinsData = async (coinId) => {
    //     try {
    //         let coinData;
    //         await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 // console.log('extracted trending coin data', data);
    //                 coinData = data;
    //             });
    //         return coinData;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    // useEffect(() => {
    //     console.log('using effect');
    //     const localServiceTrendingCoins = localStorageService.load('trendingCoins');
    //     if (localServiceTrendingCoins) {
    //         setTrendingCoinsData(localServiceTrendingCoins);
    //         console.log(localServiceTrendingCoins);
    //         return;
    //     }

    //     fetch('https://api.coingecko.com/api/v3/search/trending')
    //         .then((res) => {
    //             if (res.ok) {
    //                 return res.json();
    //             }
    //             throw new Error('failed fetching data');
    //         })
    //         .then((data) => {
    //             setTrendingCoins(data.coins);
    //             const extractedCoinsData = trendingCoins.map((coin) => {
    //                 return extractTrendingCoinsData(coin.item.id);
    //             });
    //             Promise.all(extractedCoinsData).then((data) => setTrendingCoinsData(data));
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    // useEffect(() => {
    //     console.log('using effect in the second');
    //     if (localStorageService.load('trendingCoins')) return;
    //     localStorageService.store('trendingCoins', trendingCoinsData);
    // }, [trendingCoinsData]);

    return (
        <>
            <Banner></Banner>
            <TrendingCoins></TrendingCoins>
        </>
    );
}

export default HomePage;
