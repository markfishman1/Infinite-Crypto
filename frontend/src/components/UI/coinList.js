import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/reducers/ui-reducer';
import Screen from './Screen';
import SearchInput from './SearchInput';
import CoinItem from './CoinItem';
import { fetchCoinList } from '../../store/actions/app-actions';
import { appActions } from '../../store/reducers/app-reducer';
import { fetchCoinData } from '../../store/actions/app-actions';
function CoinList(props) {
    const dispatch = useDispatch();
    const coinList = useSelector((state) => state.app.coinList);
    const filteredCoins = useSelector((state) => state.app.filteredCoins);
    const filterBy = useSelector((state) => state.app.filterBy);
    const filterByCopy = JSON.parse(JSON.stringify(filterBy));
    const isScreenOn = useSelector((state) => state.ui.isScreenOn);

    const [searchInput, setSearchInput] = useState('');
    console.log('searchInput', searchInput);
    console.log('isScreenOn', isScreenOn);
    console.log(coinList);

    useEffect(() => {
        if (!coinList || coinList.length === 0) {
            dispatch(fetchCoinList());
        }
    }, [dispatch, coinList]);

    // const onChangeHandler = (ev) => {
    //     filterByCopy.input = ev.target.value;
    //     console.log(ev.target.value);
    //     console.log(filterByCopy);
    //     dispatch(appActions.setFilterBy(filterByCopy));
    // };
    const chooseCoinHandler = (coinId) => {
        console.log(coinId);
        dispatch(fetchCoinData(coinId));
        dispatch(uiActions.toggleScreen());
        props.toggleCoinList();
    };
    let coinItems = [];
    if (!searchInput) {
        coinItems = coinList.map((coin, idx) => {
            return (
                <CoinItem
                    name={coin.name}
                    symbol={coin.symbol}
                    change={coin.price_change_percentage_24h}
                    price={coin.current_price}
                    coin={coin}
                    image={coin.image}
                    marketCap={coin.market_cap}
                    isCoinList={true}
                    onClickHandler={chooseCoinHandler}
                    resetInputValue={props.resetInputValue}
                ></CoinItem>
            );
        });
    } else {
        console.log(coinList, 'coin list from else', 'search input:', searchInput);
        coinItems = coinList.filter((coin) => {
            if (
                coin.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(searchInput.toLowerCase())
            )
                return coin;
        });
        coinItems = coinItems.map((coin, idx) => {
            return (
                <CoinItem
                    name={coin.name}
                    symbol={coin.symbol}
                    change={coin.price_change_percentage_24h}
                    price={coin.current_price}
                    coin={coin}
                    image={coin.image}
                    marketCap={coin.market_cap}
                    isCoinList={true}
                    onClickHandler={chooseCoinHandler}
                    resetInputValue={props.resetInputValue}
                ></CoinItem>
            );
        });
    }

    return (
        <>
            {isScreenOn && (
                <React.Fragment>
                    {ReactDom.createPortal(
                        <Screen
                            class={isScreenOn ? 'screen screen-on' : 'screen'}
                            toggleCoinList={props.toggleCoinList}
                            location={'coinList'}
                        ></Screen>,
                        document.getElementById('screen-root')
                    )}
                </React.Fragment>
            )}
            <section className="coin-list-container">
                <div className="coin-list-container__action">
                    <h1>Select Crypto</h1>
                    <svg
                        onClick={() => {
                            dispatch(uiActions.toggleScreen());
                            props.toggleCoinList();
                        }}
                    >
                        <use xlinkHref="/images/sprite.svg#.iconx"></use>
                    </svg>
                </div>
                <div className="coin-list-container__search">
                    <SearchInput
                        placeholder="Search"
                        onChangeHandler={(e) => {
                            setSearchInput(e.target.value);
                        }}
                    ></SearchInput>
                </div>
                {coinItems && coinItems.length !== 0 && <div className="coin-list-container__list">{coinItems}</div>}
                {!coinItems ||
                    (coinItems.length === 0 && <div className="coin-list-container__results">No results</div>)}
            </section>
        </>
    );
}

export default CoinList;
