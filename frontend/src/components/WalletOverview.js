import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TradingPanel from './TradingPanel/TradingPanel';

const DUMMYUSER = {
    name: 'Mark Fishman',
    lastBalance: 614444,
    balance: 567444,
    walletCoins: [
        {
            name: 'Bitcoin',
            avgPrice: 15555,
            currentPrice: 16755,
        },
        {
            name: 'Ada',
            avgPrice: 1,
            currentPrice: 0.4,
        },
        {
            name: 'Matic',
            avgPrice: 10,
            currentPrice: 6,
        },
    ],
    tradingJournal: [
        { description: 'Order 545254602 rejected; reason: out_of_session', date: Date.now() },
        { description: 'Call to place market order to buy 50 shares of symbol BTC' },
        { description: 'Order 545254602 rejected; reason: out_of_session' },
    ],
};
function WalletOverview() {
    const user = useSelector((state) => state.user.loggedUser);
    return (
        <section className="wallet-overview">
            <div className="wallet-overview-header">
                <h1 className="wallet-overview-header__title">Wallet Overview</h1>
                <div className="wallet-overview-header__actions">
                    <div className="wallet-overview-header__actions__item">Reset Account</div>
                    <div className="wallet-overview-header__actions__item">Explore</div>
                </div>
            </div>
            <div className="wallet-overview-balance">
                <div className="wallet-overview-balance__item">
                    {/* <p>{user.balance}$</p> */}
                    <p>Account Balance</p>
                </div>
                <div className="wallet-overview-balance__item">
                    {/* <p>{user.balance}</p> */}
                    <p>Equity</p>
                </div>
                <div className="wallet-overview-balance__item">
                    <p></p>
                    <p>P&L</p>
                </div>
            </div>
            <TradingPanel user={user ? user : DUMMYUSER} />
        </section>
    );
}

export default WalletOverview;
