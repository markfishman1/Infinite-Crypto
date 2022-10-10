import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import ReactDom from 'react-dom';
import { fetchCoinData } from '../store/actions/app-actions';
import { useNavigate } from 'react-router-dom';
import CoinList from '../components/UI/coinList';
import Screen from '../components/UI/Screen';
import { uiActions } from '../store/reducers/ui-reducer';
import { utilService } from '../services/util.service';

function BuyAndSell(props) {
    const { id: coinId } = useParams();
    console.log('coinId', coinId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const coinData = useSelector((state) => state.app.coinData);
    const user = useSelector((state) => state.user.loggedUser);

    const [actionType, setActionType] = useState('buy');
    const [isCoinListExpanded, setIsCoinListExpanded] = useState(false);

    const fiatInputRef = useRef();
    const cryptoInputRef = useRef();

    useEffect(() => {
        if (!coinData) {
            dispatch(fetchCoinData(coinId.toLocaleLowerCase()));
        }
    }, [coinData]);

    const calculatePrice = (ev, type) => {
        if (type === 'fiat') {
            cryptoInputRef.current.value = (ev.target.value / coinData.market_data.current_price.usd).toFixed(4);
        } else {
            fiatInputRef.current.value = (coinData.market_data.current_price.usd * ev.target.value).toFixed(2);
        }
    };

    const resetInputValue = () => {
        cryptoInputRef.current.value = '';
        fiatInputRef.current.value = '';
    };

    const toggleCoinList = () => {
        setIsCoinListExpanded((prevState) => !prevState);
    };

    const purchaseCoinHandler = () => {
        const purchaseData = {
            purchase: '',
            spend: '',
        };
        if (actionType === 'buy') {
            purchaseData.purchase = cryptoInputRef.current.value;
            purchaseData.spend = fiatInputRef.current.value;
        } else {
            purchaseData.purchase = fiatInputRef.current.value;
            purchaseData.spend = cryptoInputRef.current.value;
        }
        console.log(purchaseData);
    };

    return (
        <>
            {isCoinListExpanded && (
                <CoinList toggleCoinList={toggleCoinList} resetInputValue={resetInputValue}></CoinList>
            )}
            <section className="buy-and-sell-container global-bg">
                <div className="buy-and-sell-container-left">
                    <h1>
                        Buy And Sell Crypto: Fund Your Demo Account with Traditional Currencies And Practice Your
                        Trading Skills!
                    </h1>
                    <h2>Start Demo Trading Cryptocurrecies in just 2 steps</h2>
                    <hr></hr>
                    <div className="buy-and-sell-container-left-steps">
                        <div className="buy-and-sell-container-left-steps__item">
                            <svg>
                                <use xlinkHref="/images/sprite.svg#.iconuser-plus"></use>
                            </svg>
                            <h1>Register for an account</h1>
                        </div>
                        <div className="buy-and-sell-container-left-steps__item">
                            <svg>
                                <use xlinkHref="/images/sprite.svg#.iconbitcoin"></use>
                            </svg>
                            <h1>Buy Crypto</h1>
                        </div>
                    </div>
                    <div>
                        {!user && <h1>Please Login/Signup to see your account funds</h1>}
                        {user && <h1>Your Account Funds: ${utilService.numberWithCommas(user.balance)}</h1>}
                    </div>
                </div>

                <div className="buy-and-sell-container-right">
                    <div className="buy-and-sell-container-right-navbar">
                        <ul>
                            <li
                                onClick={() => setActionType('buy')}
                                className={actionType === 'buy' ? 'buy-and-sell-selected' : ''}
                            >
                                Buy
                            </li>
                            <li
                                className={actionType === 'sell' ? 'buy-and-sell-selected' : ''}
                                onClick={() => setActionType('sell')}
                            >
                                Sell
                            </li>
                        </ul>
                    </div>
                    {coinData && (
                        <div className="buy-and-sell-container-right-inputs">
                            <div
                                className={
                                    actionType === 'buy'
                                        ? 'buy-and-sell-container-right-inputs-item'
                                        : 'buy-and-sell-container-right-inputs-item order-3'
                                }
                            >
                                {actionType === 'buy' ? <h1>Amount Spend</h1> : <h1>Amount Recive</h1>}
                                <div className="buy-and-sell-container-right-inputs-item__input">
                                    <div className="buy-and-sell-container-right-inputs-item__input__list">
                                        <img src="/images/flag.png" alt={coinData.symbol}></img>
                                        <h2>USD</h2>
                                        <svg>
                                            <use xlinkHref="/images/sprite.svg#.iconarrow_drop_down"></use>
                                        </svg>
                                    </div>
                                    <input
                                        placeholder="0.00"
                                        maxLength="10"
                                        onChange={(e) => {
                                            calculatePrice(e, 'fiat');
                                        }}
                                        ref={fiatInputRef}
                                    ></input>
                                </div>
                            </div>
                            <div
                                className={
                                    actionType === 'buy'
                                        ? 'buy-and-sell-container-right-inputs-item__icons'
                                        : 'buy-and-sell-container-right-inputs-item__icons order-2'
                                }
                            >
                                <svg>
                                    <use xlinkHref="/images/sprite.svg#.iconarrow-up2"></use>
                                </svg>
                                <svg>
                                    <use xlinkHref="/images/sprite.svg#.iconarrow-down2"></use>
                                </svg>
                            </div>
                            <div
                                className={
                                    actionType === 'buy'
                                        ? 'buy-and-sell-container-right-inputs-item'
                                        : 'buy-and-sell-container-right-inputs-item order-1'
                                }
                            >
                                {actionType === 'sell' ? <h1>Amount Spend</h1> : <h1>Amount Recive</h1>}

                                <div className="buy-and-sell-container-right-inputs-item__input ">
                                    <div
                                        onClick={() => {
                                            toggleCoinList();
                                            dispatch(uiActions.toggleScreen());
                                        }}
                                        className="buy-and-sell-container-right-inputs-item__input__list"
                                    >
                                        <img src={coinData.image.small} alt={coinData.symbol}></img>
                                        <h2>{coinData.symbol.toUpperCase()}</h2>
                                        <svg>
                                            <use xlinkHref="/images/sprite.svg#.iconarrow_drop_down"></use>
                                        </svg>
                                    </div>
                                    <input
                                        placeholder="0.00"
                                        maxLength="10"
                                        ref={cryptoInputRef}
                                        onChange={(e) => {
                                            calculatePrice(e, 'crypto');
                                        }}
                                    ></input>
                                </div>
                            </div>
                        </div>
                    )}
                    {coinData && (
                        <div className="buy-and-sell-container-right-action">
                            <h1 className="buy-and-sell-container-right-action__price">
                                Estimated Price 1{coinData.symbol.toUpperCase()} ={' '}
                                {coinData.market_data.current_price.usd}$
                            </h1>
                            <h2>There might be a slight difference duo to data limitations</h2>
                            <div
                                className="buy-and-sell-container-right-action__button"
                                {...(user && { onClick: purchaseCoinHandler })}
                            >
                                {user && <p>Buy {coinData.symbol.toUpperCase()}</p>}
                                {!user && (
                                    <div className="disabled">
                                        <span
                                            className="buy-and-sell-container-right-action__button__links"
                                            onClick={() => {
                                                navigate('/login');
                                            }}
                                        >
                                            Log In
                                        </span>
                                        &nbsp; &nbsp;
                                        <span>Or</span>
                                        &nbsp; &nbsp;
                                        <span
                                            className="buy-and-sell-container-right-action__button__links"
                                            onClick={() => {
                                                navigate('/register');
                                            }}
                                        >
                                            Register
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default BuyAndSell;
