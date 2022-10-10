import { appActions } from '../reducers/app-reducer';
import { localStorageService } from '../../services/local-storage-service';

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Couldnt fetch data');
    const data = await response.json();
    return data;
};

export const fetchTrendingCoins = () => {
    return async (dispatch) => {
        try {
            const trendingCoins = await fetchData(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false'
            );
            console.log(trendingCoins);
            dispatch(appActions.setTrendingCoins(trendingCoins));
        } catch (err) {
            console.log(err);
        }
    };
};

export const fetchCoinList = (category = null) => {
    return async (dispatch) => {
        // const fetchData = async (url) => {
        //     console.log('fetching from coingeko');
        //     const response = await fetch(url);
        //     if (!response.ok) throw new Error('Couldnt fetch data');
        //     const data = await response.json();
        //     return data;
        // };
        try {
            // console.log('hello from fetchCoinList');
            if (category) {
                console.log('category', category);
                const categoryCoinList = await fetchData(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&${`category=${category}`}&order=market_cap_desc&per_page=250&page=1&sparkline=false`
                );
                console.log(categoryCoinList);
                dispatch(appActions.setCategoryCoinsList(categoryCoinList));
                return;
            }
            const coinListFirst = await fetchData(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false'
            );
            const coinListSecond = await fetchData(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=2&sparkline=false'
            );
            const coinList = coinListFirst.concat(coinListSecond);
            // console.log('coinLists', coinLists);
            dispatch(appActions.setCoinList(coinList));
        } catch (err) {
            console.log(err);
        }
    };
};

export const fetchCoinData = (coinId) => {
    return async (dispatch) => {
        console.log('coinId dispatching.....', coinId);
        const coinData = await fetchData(
            `https://api.coingecko.com/api/v3/coins/${coinId}?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
        );
        console.log('coinData', coinData);
        dispatch(appActions.setCoinData(coinData));
    };
};

export const extractTopMovers = (coinList) => {
    return (disptach) => {
        const coinListGainers = [...coinList];
        const coinListLosers = [...coinList];
        coinListGainers.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        coinListLosers.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
        const shortenedGainersList = coinListGainers.splice(0, 6);
        const shortenedLosersList = coinListLosers.splice(0, 6);
        disptach(appActions.setTopMovers({ shortenedGainersList, shortenedLosersList }));
    };
};

export const sortCoinList = (coinList, sortBy, sortState) => {
    return (dispatch) => {
        const coinListCopy = [...coinList];
        const sortStateCopy = JSON.parse(JSON.stringify(sortState));
        sortStateCopy.sortClickCount = sortStateCopy.sortClickCount + 1;
        const sortClickCount = sortStateCopy.sortClickCount;
        console.log(sortClickCount);
        console.log(sortState.previousSort);
        const disptachWrapper = (sortedCoinList, sortByState, key, newValue, sortBy) => {
            sortByState[key] = newValue;
            sortByState.previousSort = sortBy;
            dispatch(appActions.setSortBy(sortByState));
            dispatch(appActions.setCoinList(sortedCoinList));
        };
        if (sortClickCount === 3 && sortBy === sortStateCopy.previousSort && sortBy !== 'market_cap') {
            console.log('sorting back');
            coinListCopy.sort((a, b) => b.market_cap - a.market_cap);
            sortStateCopy.sortClickCount = 0;
            disptachWrapper(coinListCopy, sortStateCopy, 'marketCapDesc', false);
            return;
        }
        if (sortBy !== sortStateCopy.previousSort && sortStateCopy.previousSort !== null) {
            sortStateCopy.sortClickCount = 1;
        }

        if (sortBy === 'change' && !sortState.changeInPercentageDesc) {
            coinListCopy.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
            disptachWrapper(coinListCopy, sortStateCopy, 'changeInPercentageDesc', true, 'change');
        } else if (sortBy === 'change' && sortState.changeInPercentageDesc) {
            coinListCopy.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
            disptachWrapper(coinListCopy, sortStateCopy, 'changeInPercentageDesc', false, 'change');
        } else if (sortBy === 'market_cap' && !sortState.marketCapDesc) {
            coinListCopy.sort((a, b) => a.market_cap - b.market_cap);
            disptachWrapper(coinListCopy, sortStateCopy, 'marketCapDesc', true, 'market_cap');
        } else if (sortBy === 'market_cap' && sortState.marketCapDesc) {
            coinListCopy.sort((a, b) => b.market_cap - a.market_cap);
            disptachWrapper(coinListCopy, sortStateCopy, 'marketCapDesc', false, 'market_cap');
        } else if (sortBy === 'price' && !sortState.priceDesc) {
            coinListCopy.sort((a, b) => a.current_price - b.current_price);
            disptachWrapper(coinListCopy, sortStateCopy, 'priceDesc', true, 'price');
        } else if (sortBy === 'price' && sortState.priceDesc) {
            coinListCopy.sort((a, b) => b.current_price - a.current_price);
            console.log('coinListCopy', coinListCopy);
            disptachWrapper(coinListCopy, sortStateCopy, 'priceDesc', false, 'price');
        } else if (sortBy === 'name' && !sortState.nameDesc) {
            coinListCopy.sort((a, b) => a.symbol.localeCompare(b.symbol));
            disptachWrapper(coinListCopy, sortStateCopy, 'nameDesc', true, 'name');
        } else if (sortBy === 'name' && sortState.nameDesc) {
            coinListCopy.sort((a, b) => b.symbol.localeCompare(a.symbol));
            disptachWrapper(coinListCopy, sortStateCopy, 'nameDesc', false, 'name');
        }
    };
};

export const setLocalFavoriteCoin = (coin, favoriteCoinList) => {
    return (dispatch) => {
        const favoriteCoinListCopy = [...favoriteCoinList];
        if (favoriteCoinListCopy && favoriteCoinListCopy.length !== 0) {
            const isCoin = favoriteCoinListCopy.find((listCoin) => listCoin.symbol === coin.symbol);
            if (isCoin) {
                const newList = favoriteCoinListCopy.filter((listCoin) => listCoin.symbol !== coin.symbol);
                dispatch(appActions.setLocalFavCoins(newList));
                localStorageService.store('favCoins', newList);
            } else {
                favoriteCoinListCopy.push(coin);
                dispatch(appActions.setLocalFavCoins(favoriteCoinListCopy));
                localStorageService.store('favCoins', favoriteCoinListCopy);
            }
        } else if (favoriteCoinList.length === 0) {
            favoriteCoinListCopy.push(coin);
            dispatch(appActions.setLocalFavCoins(favoriteCoinListCopy));
        }
    };
};
