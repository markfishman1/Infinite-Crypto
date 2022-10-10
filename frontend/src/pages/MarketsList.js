import React, { useEffect, useState } from 'react';
import { fetchCoinList } from '../store/actions/app-actions';
import { appActions } from '../store/reducers/app-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { sortCoinList } from '../store/actions/app-actions';
import { setLocalFavoriteCoin } from '../store/actions/app-actions';
import { utilService } from '../services/util.service';
import MarketsHeader from './MarketsHeader';
import SearchInput from '../components/UI/SearchInput';
import CoinItem from '../components/UI/CoinItem';
const initialFilterBy = {
    input: '',
    categoryId: '',
    categoryName: '',
    isFavorite: false,
};
function Markets() {
    const [buttons, setButtons] = useState([]);
    const sortBy = useSelector((state) => state.app.sortBy);
    const pageSize = useSelector((state) => state.app.pageSize);
    const pageIdx = useSelector((state) => state.app.coinListPageIdx);
    const user = useSelector((state) => state.user.loggedUser);
    const filterBy = useSelector((state) => state.app.filterBy);
    const filterByCopy = JSON.parse(JSON.stringify(filterBy));
    const currPageCoinList = useSelector((state) => state.app.currPageCoinList);
    const coinList = useSelector((state) => state.app.coinList);
    const favCoins = useSelector((state) => state.app.favCoins);
    const filteredCoins = useSelector((state) => state.app.filteredCoins);
    const categoryCoins = useSelector((state) => state.app.currCategoryList);
    const dispatch = useDispatch();
    const favoriteCoinList = user ? user.favoriteCoinList : favCoins;
    let pageCount = Math.ceil(coinList.length / pageSize);

    useEffect(() => {
        let pageCoinList;
        let currCoinList;
        let fromIdx = pageIdx * pageSize;

        if (filterBy.isFavorite && !filterBy.categoryId) {
            console.log('isFavorite');
            currCoinList = favoriteCoinList;
        } else if (filterBy.categoryId) {
            console.log('categoryCoins', categoryCoins);
            console.log('isCategory');
            currCoinList = categoryCoins;
        } else if (filterBy.input) {
            console.log('isInput');
            currCoinList = filteredCoins;
        } else {
            console.log('Is regular');
            currCoinList = coinList;
        }
        currCoinList.slice(fromIdx, fromIdx + pageSize);
        pageCoinList = currCoinList.slice(fromIdx, fromIdx + pageSize);
        dispatch(appActions.setCurrPageCoinList(pageCoinList));

        pageCount = Math.ceil(currCoinList.length / pageSize);
        const buttons = [];
        for (let i = 0; i < pageCount; i++) {
            buttons.push(
                <button
                    className={pageIdx === i ? 'active-page' : ''}
                    key={i + 1}
                    onClick={() => setPageHandler(i + 1)}
                >
                    {i + 1}
                </button>
            );
        }
        const setPageHandler = (value) => {
            dispatch(appActions.changePage(value - 1));
        };
        setButtons(buttons);
    }, [pageIdx, pageCount, dispatch, pageSize, coinList, filterBy, categoryCoins, favoriteCoinList, filteredCoins]);

    useEffect(() => {
        if (filterBy.input) {
            console.log('filterBy.input', filterBy.input);
            const filteredList = coinList.filter((coin) => {
                if (
                    coin.name.toLowerCase().includes(filterBy.input.toLowerCase()) ||
                    coin.symbol.toLowerCase().includes(filterBy.input.toLowerCase())
                )
                    return coin;
            });
            console.log('COINLIST FROM USE EFFECT', filteredList);
            dispatch(appActions.setFilteredCoins(filteredList));
            console.log('filteredCoins', filteredCoins);
        }
        if (filterBy.input === '') dispatch(fetchCoinList());
    }, [dispatch, filterBy.input]);

    useEffect(() => {}, [favCoins]);

    const changePangeUpHandler = () => {
        if (pageIdx === pageCount - 1) return;
        dispatch(appActions.changePage(1));
    };

    const changePangeDownHandler = () => {
        if (pageIdx === 0) return;
        dispatch(appActions.changePage(-1));
    };

    const togglefavorite = (coin) => {
        if (user) {
            console.log('there is a user');
        } else {
            dispatch(setLocalFavoriteCoin(coin, favCoins));
        }
    };

    const isFavoriteCoin = (coin) => {
        if (favoriteCoinList) {
            return favoriteCoinList.find((listCoin) => listCoin.symbol === coin.symbol);
        }
        return false;
    };

    const onChangeHandler = (ev) => {
        filterByCopy.input = ev.target.value;
        console.log(ev.target.value);
        console.log(filterByCopy);
        dispatch(appActions.setFilterBy(filterByCopy));
    };
    const setAllCoinsHandler = () => {
        dispatch(appActions.setFilterBy(initialFilterBy));
    };
    const setFavoriteCoinsHandler = () => {
        const newFilterBy = JSON.parse(JSON.stringify(initialFilterBy));
        newFilterBy.isFavorite = true;
        dispatch(appActions.setFilterBy(newFilterBy));
    };
    const changeCategoryHandler = (val, ev) => {
        filterByCopy.categoryName = ev.target.innerText;
        filterByCopy.categoryId = val;
        dispatch(appActions.setFilterBy(filterByCopy));
        dispatch(fetchCoinList(val));
    };

    const coinItems = currPageCoinList.map((coin) => {
        return (
            <CoinItem
                name={coin.name}
                symbol={coin.symbol}
                change={coin.price_change_percentage_24h}
                price={coin.current_price}
                coin={coin}
                togglefavorite={togglefavorite}
                isFavoriteCoin={isFavoriteCoin}
                image={coin.image}
                marketCap={coin.market_cap}
                isMarketList={true}
                key={coin.name}
            ></CoinItem>
        );
    });

    return (
        <>
            <MarketsHeader />
            <section className="markets">
                <div className="markets-cointable">
                    <div className="markets-cointable-filter">
                        <div className="markets-cointable-filter-groups">
                            <div
                                className={`markets-cointable-filter-groups-item filter-item-favorites align-center flex ${
                                    filterBy.isFavorite ? 'active-item-favorites' : ''
                                }`}
                                onClick={setFavoriteCoinsHandler}
                            >
                                <svg>
                                    <use xlinkHref="images/sprite.svg#.iconstar1"></use>
                                </svg>
                                <p>Favorites</p>
                            </div>
                            <div
                                className={`markets-cointable-filter-groups-item filter-item-all ${
                                    !filterBy.isFavorite && !filterBy.categoryId ? 'active-item' : ''
                                }`}
                                onClick={setAllCoinsHandler}
                            >
                                <p>All Coins</p>
                            </div>
                            <div className="markets-cointable-filter-groups-item filter-item-line"></div>
                            <div className="markets-cointable-filter-groups-item filter-item-dropdown">
                                <div
                                    className={`filter-item-dropdown-display align-center flex ${
                                        filterBy.categoryId ? 'active-item' : ''
                                    }`}
                                >
                                    <p>{filterBy.categoryName ? `${filterBy.categoryName}` : 'Categories'}</p>
                                    <svg className="markets-cointable-filter-groups-item-arrow">
                                        <use xlinkHref="images/sprite.svg#.iconarrow_drop_down"></use>
                                    </svg>
                                </div>
                                <div className="filter-item-dropdown-element">
                                    <div className="filter-item-dropdown-list">
                                        <div
                                            className="filter-item-dropdown-list-item"
                                            onClick={(ev) => changeCategoryHandler('big-data', ev)}
                                        >
                                            Big Data
                                        </div>
                                        <div
                                            className="filter-item-dropdown-list-item"
                                            onClick={(ev) => changeCategoryHandler('decentralized-exchange', ev)}
                                        >
                                            DEX
                                        </div>
                                        <div
                                            className="filter-item-dropdown-list-item"
                                            onClick={(ev) => changeCategoryHandler('gaming', ev)}
                                        >
                                            GameFi
                                        </div>
                                        <div
                                            className="filter-item-dropdown-list-item"
                                            onClick={(ev) => changeCategoryHandler('binance-smart-chain', ev)}
                                        >
                                            BNB Chain
                                        </div>
                                        <div
                                            className="filter-item-dropdown-list-item"
                                            onClick={(ev) => changeCategoryHandler('decentralized-finance-defi', ev)}
                                        >
                                            Defi
                                        </div>
                                        <div
                                            className="filter-item-dropdown-list-item"
                                            onClick={(ev) => changeCategoryHandler('gambling', ev)}
                                        >
                                            Gambling
                                        </div>
                                        <div
                                            className="filter-item-dropdown-list-item"
                                            onClick={(ev) => changeCategoryHandler('metaverse', ev)}
                                        >
                                            Metaverse
                                        </div>
                                        <div
                                            className="filter-item-dropdown-list-item"
                                            onClick={(ev) => changeCategoryHandler('play-to-earn', ev)}
                                        >
                                            P2E
                                        </div>
                                        <div
                                            className="filter-item-dropdown-list-item"
                                            onClick={(ev) => changeCategoryHandler('fan-token', ev)}
                                        >
                                            Fan Token
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SearchInput
                            onChangeHandler={onChangeHandler}
                            placeholder="Search Coin"
                            type="text"
                        ></SearchInput>
                    </div>
                    <ul className="markets-cointable-list">
                        <div className="markets-cointable-list-sort">
                            <div
                                className="markets-cointable-list-sort-group__instrument"
                                onClick={() => dispatch(sortCoinList(coinList, 'name', sortBy))}
                            >
                                Name
                                <div className="markets-cointable-list-sort-group__actions">
                                    <svg
                                        className={
                                            sortBy.previousSort === 'name' && !sortBy.nameDesc ? 'sort-active' : ''
                                        }
                                    >
                                        <use xlinkHref="images/sprite.svg#.iconarrow_drop_up"></use>
                                    </svg>
                                    <svg
                                        className={
                                            sortBy.previousSort === 'name' && sortBy.nameDesc ? 'sort-active' : ''
                                        }
                                    >
                                        <use xlinkHref="images/sprite.svg#.iconarrow_drop_down"></use>
                                    </svg>
                                </div>
                            </div>
                            <div className="markets-cointable-list-sort-group__price">
                                <div onClick={() => dispatch(sortCoinList(coinList, 'price', sortBy))}>
                                    Price
                                    <div className="markets-cointable-list-sort-group__actions">
                                        <svg
                                            className={
                                                sortBy.previousSort === 'price' && !sortBy.priceDesc
                                                    ? 'sort-active'
                                                    : ''
                                            }
                                        >
                                            <use xlinkHref="images/sprite.svg#.iconarrow_drop_up"></use>
                                        </svg>
                                        <svg
                                            className={
                                                sortBy.previousSort === 'price' && sortBy.priceDesc ? 'sort-active' : ''
                                            }
                                        >
                                            <use xlinkHref="images/sprite.svg#.iconarrow_drop_down"></use>
                                        </svg>
                                    </div>
                                </div>
                                <div onClick={() => dispatch(sortCoinList(coinList, 'change', sortBy))}>
                                    24h Change
                                    <div className="markets-cointable-list-sort-group__actions">
                                        <svg
                                            className={
                                                sortBy.previousSort === 'change' && !sortBy.changeInPercentageDesc
                                                    ? 'sort-active'
                                                    : ''
                                            }
                                        >
                                            <use xlinkHref="images/sprite.svg#.iconarrow_drop_up"></use>
                                        </svg>
                                        <svg
                                            className={
                                                sortBy.previousSort === 'change' && sortBy.changeInPercentageDesc
                                                    ? 'sort-active'
                                                    : ''
                                            }
                                        >
                                            <use xlinkHref="images/sprite.svg#.iconarrow_drop_down"></use>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="markets-cointable-list-sort-group__marketcap"
                                onClick={() => {
                                    dispatch(sortCoinList(coinList, 'market_cap', sortBy));
                                }}
                            >
                                Market Cap
                                <div className="markets-cointable-list-sort-group__actions">
                                    <svg
                                        className={
                                            sortBy.previousSort === 'market_cap' && !sortBy.marketCapDesc
                                                ? 'sort-active'
                                                : ''
                                        }
                                    >
                                        <use xlinkHref="images/sprite.svg#.iconarrow_drop_up"></use>
                                    </svg>
                                    <svg
                                        className={
                                            sortBy.previousSort === 'market_cap' && sortBy.marketCapDesc
                                                ? 'sort-active'
                                                : ''
                                        }
                                    >
                                        <use xlinkHref="images/sprite.svg#.iconarrow_drop_down"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {coinItems ? coinItems : 'No Records'}
                    </ul>
                    <div className="markets-cointable-pages">
                        <button onClick={changePangeDownHandler} disabled={pageIdx === 0}>
                            -
                        </button>
                        {buttons}
                        <button onClick={changePangeUpHandler} disabled={pageIdx === pageCount - 1}>
                            +
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Markets;
