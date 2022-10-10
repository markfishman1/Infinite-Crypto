import { createSlice } from '@reduxjs/toolkit';
// import { act } from 'react-dom/test-utils';
// import { localStorageService } from '../../services/local-storage-service';
const appSlice = createSlice({
    name: 'app',
    initialState: {
        trendingCoins: [],
        filteredCoins: [],
        currCategoryList: [],
        coinList: [],
        currPageCoinList: [],
        coinData: null,
        coinListPageIdx: 0,
        pageSize: 30,
        sortBy: {
            marketCapDesc: false,
            priceDesc: false,
            alphabetDesc: false,
            changeInPercentageDesc: false,
            nameDesc: false,
            sortClickCount: 0,
            previousSort: null,
        },
        filterBy: {
            input: '',
            // isShowAll: false,
            categoryId: '',
            categoryName: '',
            isFavorite: false,
        },
        topMovers: {
            losers: [],
            gainers: [],
        },
        favCoins: localStorage.getItem('favCoins') ? JSON.parse(localStorage.getItem('favCoins')) : [],
    },
    reducers: {
        setTrendingCoins(state, action) {
            state.trendingCoins = action.payload;
        },
        setCoinList(state, action) {
            state.coinList = action.payload;
        },
        setCoinData(state, action) {
            state.coinData = action.payload;
        },
        setCurrPageCoinList(state, action) {
            state.currPageCoinList = action.payload;
        },
        setSortBy(state, action) {
            state.sortBy = action.payload;
        },
        changePage(state, action) {
            if (action.payload === 1 || action.payload === -1)
                state.coinListPageIdx = state.coinListPageIdx + action.payload;
            else state.coinListPageIdx = action.payload;
        },
        setTopMovers(state, action) {
            state.topMovers.gainers = action.payload.shortenedGainersList;
            state.topMovers.losers = action.payload.shortenedLosersList;
        },
        setLocalFavCoins(state, action) {
            // console.log('action.payload.favCoinslistCopy', action.payload);
            state.favCoins = action.payload;
        },
        setFilterBy(state, action) {
            state.filterBy = action.payload;
        },
        setFilteredCoins(state, action) {
            state.filteredCoins = action.payload;
        },

        setCategoryCoinsList(state, action) {
            state.currCategoryList = action.payload;
        },
    },
});
export const appActions = appSlice.actions;
export default appSlice;
