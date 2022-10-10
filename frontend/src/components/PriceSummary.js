import React from 'react';
import { utilService } from '../services/util.service';
function PriceSummary({ coinData }) {
    return (
        <>
            <section className="price-summary">
                <div className="price-summary-title">
                    <h1>{coinData.name} Price Summaries</h1>
                    <span>Latest Data</span>
                </div>
                <div className="price-summary-content">
                    <p>
                        {coinData.name}'s price today is US$
                        {utilService.convertNumbers(coinData.market_data.current_price.usd)}, with total trading volume
                        of {utilService.convertNumbers(coinData.market_data.total_volume.usd)}$.{' '}
                        {coinData.symbol.toUpperCase()} is currently{' '}
                        <span className={coinData.market_data.price_change_percentage_24h >= 0 ? 'gaining' : 'losing'}>
                            {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
                        </span>{' '}
                        in the last 24 hours. It is currently
                        <span className={coinData.market_data.ath_change_percentage >= 0 ? 'gaining' : 'losing'}>
                            {' ' + coinData.market_data.ath_change_percentage.usd.toFixed(2)}%
                        </span>{' '}
                        from its all time high of {utilService.convertNumbers(coinData.market_data.ath.usd)}$, and{' '}
                        <span className={coinData.market_data.price_change_percentage_7d >= 0 ? 'gaining' : 'losing'}>
                            {coinData.market_data.price_change_percentage_7d.toFixed(2)}%{' '}
                            {/* {coinData.market_data.price_change_percentage_7d > 0 ? 'up' : 'down'} */}
                        </span>{' '}
                        from its 7 day low. {coinData.symbol.toUpperCase()} has a circulating supply of{' '}
                        {utilService.convertNumbers(coinData.market_data.circulating_supply)} and a total supply of{' '}
                        {utilService.convertNumbers(coinData.market_data.total_supply)}
                    </p>
                    <hr></hr>
                </div>
            </section>
        </>
    );
}

export default PriceSummary;
