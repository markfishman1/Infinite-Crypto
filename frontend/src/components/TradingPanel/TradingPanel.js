import React from 'react';
import { useState } from 'react';
import OrdersList from './OrdersList';
import Positions from './Positions';
import TradingJournal from './TradingJournal';
import History from './History';
const tabMap = ['Positions', 'Orders', 'History', 'Trading Journal'];

function TradingPanel({ user }) {
    console.log(user);
    const [currentTab, changeCurrentTab] = useState(tabMap[0]);
    const tabItems = tabMap.map((item) => {
        return (
            <div
                className={item === currentTab ? 'trading-panel__tabs trading-panel-selected' : 'trading-panel__tabs'}
                onClick={() => {
                    changeCurrentTab(item);
                }}
            >
                {item}
            </div>
        );
    });
    const calculatePNL = (balance, lastBalance) => {
        const difference = balance - lastBalance;
        const percentageDifference = (difference * 100) / balance;
        return {
            cash: balance - lastBalance.toFixed(3),
            percentage: percentageDifference.toFixed(3),
        };
    };
    return (
        <section className="trading-panel">
            <div className="trading-panel-summary">
                <p>{user.name} (USD)</p>
                <div className="trading-panel-summary-balance">
                    <div className="trading-panel-summary-balance__item">
                        <span>{user.balance}</span>
                        <p>Account Balance</p>
                    </div>
                    <div className="trading-panel-summary-balance__item">
                        <span>{user.balance}</span>
                        <p>Equity</p>
                    </div>
                    <div className="trading-panel-summary-balance__item">
                        <span className={user.balance > user.lastBalance ? 'gaining' : 'losing'}>
                            {calculatePNL(user.balance, user.lastBalance).percentage}%
                        </span>
                        <p>Open Profit</p>
                    </div>
                </div>
            </div>
            <div className="trading-panel__tabs">{tabItems}</div>
            {currentTab === 'Positions' && <Positions />}
            {currentTab === 'Trading Journal' && <TradingJournal />}
            {currentTab === 'Orders' && <OrdersList />}
            {currentTab === 'History' && <History />}
        </section>
    );
}

export default TradingPanel;
