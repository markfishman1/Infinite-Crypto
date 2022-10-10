import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import News from '../components/News';
import { fetchCoinData } from '../store/actions/app-actions';
import PriceSummary from './../components/PriceSummary';
import { utilService } from '../services/util.service';

function CoinPage(props) {
    const { id: coinId } = useParams();
    console.log('coinId', coinId);
    const dispatch = useDispatch();
    const [isDescExpanded, setDescExpanded] = useState(false);
    const [pageContent, setPageContent] = useState('about');
    const [coinPurchasePrice, setCoinPurchasePrice] = useState(0);
    const user = useSelector((state) => state.user.loggedUser);
    const navigate = useNavigate();
    const coinData = useSelector((state) => state.app.coinData);

    useEffect(() => {
        dispatch(fetchCoinData(coinId.toLocaleLowerCase()));
    }, [dispatch, coinId]);

    const checkDescription = () => {
        if (coinData) {
            if (coinData.description.en) {
                return coinData.description.en;
            } else if (!!coinData.description && coinData.public_notice) {
                return coinData.public_notice;
            } else return '';
        }
    };

    const toggleDescription = () => {
        setDescExpanded((prevState) => !prevState);
    };

    const calculatePrice = (ev) => {
        let price = coinData.market_data.current_price.usd * ev.target.value;
        setCoinPurchasePrice(price.toFixed(2));
    };

    return (
        <>
            <section className="coin-page">
                <div className="coin-page-left">
                    <div className="coin-page-left-chart"></div>
                    <div className="coin-page-left-content">
                        <ul className="coin-page-left-content__navbar">
                            <li
                                className={pageContent === 'about' ? 'coin-page-content-selected' : ''}
                                onClick={() => {
                                    setPageContent('about');
                                }}
                            >
                                About
                            </li>
                            <li
                                className={pageContent === 'markets' ? 'coin-page-content-selected' : ''}
                                onClick={() => {
                                    setPageContent('markets');
                                }}
                            >
                                Markets
                            </li>
                            <li
                                className={pageContent === 'news' ? 'coin-page-content-selected' : ''}
                                onClick={() => {
                                    setPageContent('news');
                                }}
                            >
                                News
                            </li>
                        </ul>
                        {pageContent === 'news' && <News coinName={coinData.id}></News>}
                        {pageContent === 'about' && coinData && (
                            <div className="coin-page-left-about">
                                <div className="coin-page-left-about__title">
                                    <h1>
                                        About {`${coinData ? coinData.name : ''} (${coinData ? coinData?.symbol : ''})`}
                                    </h1>
                                    <h1 className="coin-page-left-about__title__rank">
                                        Rank #{coinData ? coinData?.market_cap_rank : ''}
                                    </h1>
                                </div>
                                <PriceSummary coinData={coinData}></PriceSummary>
                                <div
                                    className={
                                        !!isDescExpanded
                                            ? 'coin-page-left-about__description'
                                            : 'coin-page-left-about__description max-height-10'
                                    }
                                >
                                    <h1>What is {coinData.name}</h1>
                                    <p>{parse(coinData ? checkDescription() : 'Loading...')}</p>
                                </div>
                                <div
                                    onClick={toggleDescription}
                                    className={
                                        !!isDescExpanded
                                            ? 'coin-page-left-about__action max-height-10'
                                            : 'coin-page-left-about__action'
                                    }
                                >
                                    <p>Read More</p>
                                    <svg className="coin-page-left-about__action__icon">
                                        <use xlinkHref="/images/sprite.svg#.iconstar3"></use>
                                    </svg>
                                </div>
                                <div className={!!isDescExpanded ? '' : 'coin-page-left-about__screen'}></div>
                            </div>
                        )}
                    </div>
                </div>
                {coinData && (
                    <div className="coin-page-right">
                        <div className="coin-page-right-actions">
                            <h1 className="coin-page-right-actions__title">{coinData.name} Price Calculator</h1>
                            <div className="coin-page-right-actions__input">
                                <h1>Buy</h1>
                                <div>
                                    <input maxLength="10" placeholder="0.00" onChange={calculatePrice}></input>
                                    <img src={coinData.image.small} alt={`${coinData.symbol} IMG`}></img>
                                </div>
                            </div>
                            <div className="coin-page-right-actions__price">
                                <h1>Price</h1>
                                <h1>USD ${!isNaN(coinPurchasePrice) ? `${coinPurchasePrice}` : '0'}</h1>
                            </div>
                            <div className="coin-page-right-actions__button">
                                <div
                                    onClick={() => {
                                        navigate(`/buy-and-sell/${coinData.id}`);
                                    }}
                                >
                                    Purchase
                                </div>
                                {/* {user && <div>Purchase</div>} */}
                                {/* {!user && (
                                    <div className="disabled">
                                        <span
                                            className="coin-page-right-actions__button__links"
                                            onClick={() => {
                                                navigate('/login');
                                            }}
                                        >
                                            Log In
                                        </span>
                                        &nbsp;
                                        <span>Or</span>
                                        &nbsp;
                                        <span
                                            className="coin-page-right-actions__button__links"
                                            onClick={() => {
                                                navigate('/register');
                                            }}
                                        >
                                            Register
                                        </span>
                                    </div>
                                )} */}
                            </div>
                        </div>
                        <div className="coin-page-right-statistics">
                            <h1 className="coin-page-right-statistics__title">
                                {coinData.symbol.toUpperCase()} Price Statistics
                            </h1>
                            <div className="coin-page-right-statistics__item">
                                <p>{coinData.symbol.toUpperCase()} Price</p>
                                <p>${coinData.market_data.current_price.usd}</p>
                            </div>
                            <div className="coin-page-right-statistics__item">
                                <p>{coinData.symbol.toUpperCase()} Market Cap</p>
                                <p>${utilService.convertNumbers(coinData.market_data.market_cap.usd)}</p>
                            </div>
                            <div className="coin-page-right-statistics__item">
                                <p>24/high 24/low</p>
                                <p>
                                    ${coinData.market_data.high_24h.usd} / <br></br>${coinData.market_data.low_24h.usd}
                                </p>
                            </div>
                            <div className="coin-page-right-statistics__item">
                                <p>Price Change % 24h</p>
                                <p
                                    className={
                                        coinData.market_data.price_change_percentage_24h >= 0 ? 'gaining' : 'losing'
                                    }
                                >
                                    {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
                                </p>
                            </div>
                            <div className="coin-page-right-statistics__item">
                                <p>Price Change % 7d</p>
                                <p
                                    className={
                                        coinData.market_data.price_change_percentage_7d > 0 ? 'gaining' : 'losing'
                                    }
                                >
                                    {coinData.market_data.price_change_percentage_7d.toFixed(2)}%
                                </p>
                            </div>
                            <div className="coin-page-right-statistics__item">
                                <p>Price Change % 30d</p>
                                <p
                                    className={
                                        coinData.market_data.price_change_percentage_7d > 0 ? 'gaining' : 'losing'
                                    }
                                >
                                    {coinData.market_data.price_change_percentage_30d.toFixed(2)}%
                                </p>
                            </div>
                            <div className="coin-page-right-statistics__item">
                                <p>Price Change % 60d</p>
                                <p
                                    className={
                                        coinData.market_data.price_change_percentage_7d > 0 ? 'gaining' : 'losing'
                                    }
                                >
                                    {coinData.market_data.price_change_percentage_60d.toFixed(2)}%
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}

export default CoinPage;
