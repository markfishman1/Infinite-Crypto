import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import appSlice from '../store/reducers/app-reducer';
function TrendingCoins(props) {
    // console.log(props.trendingCoins.length);
    // const shortenedCoinList = props.trendingCoins.splice(props.trendingCoins.length - 2, 1);
    // console.log(shortenedCoinList);
    const trendingCoins = useSelector((state) => state.app.trendingCoins);
    console.log(trendingCoins);
    const cointList = trendingCoins.map((coin) => {
        return (
            <li className="trending-container-right__list__item" key={coin.name}>
                <img src={coin.image} alt={coin.name}></img>
                <div>
                    <p className="trending-container-right__list__item__symbol">{coin.name}</p>
                    <p className="trending-container-right__list__item__change">
                        {coin.price_change_percentage_24h.toFixed(2)}
                    </p>
                </div>
                <h1>${coin.current_price.toFixed(2)}</h1>
            </li>
        );
    });
    return (
        <div className="trending">
            <div className="trending-container">
                <div className="trending-container-left">
                    <h1>
                        Explore top Crypto's Like Bitcoin, Ethereum and Ada and start trading today.
                    </h1>
                    <p>See all available Crypto currencies to start trading with</p>
                </div>
                <div className="trending-container-right">
                    <ul className="trending-container-right__list">{cointList}</ul>
                </div>
            </div>
        </div>
    );
}

export default TrendingCoins;
