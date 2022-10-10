import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { utilService } from '../services/util.service';
import CoinItem from './UI/CoinItem';
import { uiActions } from '../store/reducers/ui-reducer';
import { fetchCoinList } from '../store/actions/app-actions';
import { appActions } from '../store/reducers/app-reducer';
import SearchInput from './UI/SearchInput';
import Notification from './UI/Notification';
import { pushNotification } from '../store/actions/ui-actions';
import { userActions } from '../store/reducers/user-reducer';
import { register } from '../store/actions/user.actions';
function CreateAcountModal(props) {
    const [favCoins, setFavCoins] = useState([]);
    const [userInitialCash, setUserInitialCash] = useState('');
    const [searchInputFilter, setSearchInputFiter] = useState('');
    const [sectionNumber, setSectionNumber] = useState(1);
    const notificationRef = useRef();
    const coinList = useSelector((state) => state.app.coinList);
    const filteredCoins = useSelector((state) => state.app.filteredCoins);
    const notifications = useSelector((state) => state.ui.notifications);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('coinList', coinList);
        if (!coinList.length || coinList.length === 0) {
            dispatch(fetchCoinList());
        }
    }, [dispatch, coinList]);
    useEffect(() => {
        const filteredList = coinList.filter((coin) => {
            if (
                coin.name.toLowerCase().includes(searchInputFilter.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(searchInputFilter.toLowerCase())
            )
                return coin;
        });
        dispatch(appActions.setFilteredCoins(filteredList));
    }, [searchInputFilter, coinList, dispatch]);
    // useEffect(() => {
    //     setTimeout(() => {}, 1000);
    // }, [notifications]);
    const skipHandler = () => {
        setSectionNumber((prevState) => prevState + 1);
        if (sectionNumber === 2) {
            props.closeModalHandler();
            dispatch(uiActions.toggleScreen());
        }
    };
    const continueHandler = () => {
        if (sectionNumber === 1) {
            if (!favCoins.length || favCoins.length === 0) {
                // dispatch(pushNotification({ type: 'failure', message: 'No Coins Selected' }, notifications));
                pushNotification({ type: 'failure', message: 'No Coins Selected' }, notifications)(dispatch);
                dispatch(uiActions.openNotification());
                return;
            } else setSectionNumber((prevState) => prevState + 1);
        }
        if (sectionNumber === 2) {
            if (!userInitialCash || userInitialCash === 0) {
                pushNotification(
                    { type: 'failure', message: 'Please Insert Amount Bigger than 10000' },
                    notifications
                )(dispatch);
                dispatch(uiActions.openNotification());
                return;
            } else {
                props.closeModalHandler();
                dispatch(uiActions.toggleScreen());
                const userData = { ...props.accountCreds, favCoins, balance: parseInt(userInitialCash) };
                console.log('userData', userData);
                dispatch(register(userData));
            }
        }
    };
    const onChangeHandler = (ev) => {
        if (sectionNumber === 1) setSearchInputFiter(ev.target.value);
        if (sectionNumber === 2) {
            if (!isNaN(ev.target.value)) {
                setUserInitialCash(ev.target.value);
            }
        }
    };
    const addFavCoin = (coin) => {
        console.log('adding', coin);
        const existingCoin = favCoins.find((favCoin) => favCoin.name === coin.name);
        if (!existingCoin) {
            setFavCoins((prevFavCoins) => {
                return [...prevFavCoins, coin];
            });
        }
    };
    const checkFavCoinExistance = (coin) => {
        return favCoins.find((favCoin) => favCoin.name === coin.name);
    };

    const coinItems = filteredCoins.map((coin, idx) => {
        return (
            <CoinItem
                name={coin.name}
                symbol={coin.symbol}
                change={coin.price_change_percentage_24h}
                price={coin.current_price}
                coin={coin}
                image={coin.image}
                marketCap={coin.market_cap}
                isModal={true}
                onClickHandler={addFavCoin}
                checkFavCoinExistance={checkFavCoinExistance}
            ></CoinItem>
        );
    });
    return (
        <>
            <React.Fragment>
                {ReactDom.createPortal(
                    <Notification
                        // notification={'hello'}
                        notificationType={'warning'}
                        notificationRef={notificationRef}
                    ></Notification>,
                    document.getElementById('screen-root')
                )}
            </React.Fragment>

            <div className={`account-creation-modal ${props.isModalOpen ? 'account-modal-open' : ''}`}>
                <div className="account-creation-modal-welcome">
                    <h1 className="account-creation-modal-welcome__title">Hello! Welcome to infinite Crpyto</h1>
                    <p className="account-creation-modal-welcome__subtitle">Lets create an account for you!</p>
                </div>
                <div className="account-creation-modal-tabs">
                    {sectionNumber === 1 && (
                        <>
                            <div className="account-creation-modal-tabs__first">
                                <p className="account-creation-modal-tabs__first__title">
                                    First lets choose some coins to keep track on
                                </p>
                                <div>
                                    {favCoins.map((coin) => {
                                        return (
                                            <img
                                                src={coin.image}
                                                alt={coin.symbol}
                                                className="coin-image-fade-in"
                                            ></img>
                                        );
                                    })}
                                </div>
                                <SearchInput
                                    className="account-creation-modal-tabs__first__input"
                                    onChangeHandler={onChangeHandler}
                                    type="text"
                                    placeholder={'Search Coin'}
                                ></SearchInput>
                            </div>
                            <div>
                                <ul className="account-creation-modal-tabs__first__list">
                                    {coinItems.length !== 0 ? coinItems : <p>Coin not found</p>}
                                </ul>
                            </div>
                        </>
                    )}
                    {sectionNumber === 2 && (
                        <div className="account-creation-modal-tabs__second">
                            <p>Please choose how much paper money you want to start with</p>
                            <p>Note ! You can start trading with up to 1,000,000$</p>
                            <SearchInput
                                type="text"
                                placeholder={'Choose Amount'}
                                isModal={true}
                                min={1}
                                max={1000000}
                                maxLength={7}
                                minLength={4}
                                onChange={onChangeHandler}
                                value={userInitialCash}
                            ></SearchInput>
                        </div>
                    )}
                    <div className="account-creation-modal-tabs__actions">
                        {sectionNumber === 1 && <button onClick={skipHandler}>skip</button>}
                        <button onClick={continueHandler}>{sectionNumber === 1 ? 'continue' : 'finish'}</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateAcountModal;
