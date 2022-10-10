import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { extractTopMovers } from '../store/actions/app-actions';
import { utilService } from '../services/util.service';
function MarketsHeader() {
    const dispatch = useDispatch();
    const coinList = useSelector((state) => state.app.coinList);
    const topMovers = useSelector((state) => state.app.topMovers);

    useEffect(() => {
        dispatch(extractTopMovers(coinList));
    }, [dispatch, coinList]);

    const createMoversList = (moverList, isGaner) => {
        if (moverList) {
            const coinList = moverList.map((coin) => {
                return (
                    <div
                        className={`markets-header-movers-item ${isGaner ? 'item-gainer' : 'item-loser'} `}
                        key={coin.symbol}
                    >
                        <div className="markets-header-movers-item__name">
                            <img src={coin.image} alt={coin.name}></img>
                            <div>
                                <h1>{coin.symbol.toUpperCase()}</h1>
                                <p>{coin.name}</p>
                            </div>
                        </div>
                        <p className="markets-header-movers-item__change">
                            {parseFloat(utilService.numberWithCommas(coin.price_change_percentage_24h)).toFixed(2)}%
                        </p>
                    </div>
                );
            });
            return coinList;
        }
    };
    return (
        <section className="markets-header">
            <h1 className="markets-header-title">Markets</h1>
            <div className="markets-header-movers">
                <div className="markets-header-movers__header">
                    <h1>Daily Movers</h1>
                    <p>Explore the daily market movers</p>
                </div>
                <div className="markets-header-movers-lists">
                    <div className="markets-header-movers-lists_gainers">
                        {createMoversList(topMovers.gainers, true)}
                    </div>
                    <div className="markets-header-movers-lists_losers">
                        {createMoversList(topMovers.losers, false)}
                    </div>
                </div>
            </div>
            <div className="markets-header-trending"></div>
        </section>
    );
}

export default MarketsHeader;
