import React from 'react';
import { AdvancedRealTimeChart, MiniChart } from 'react-ts-tradingview-widgets';
function Chart({ symbol }) {
    return (
        <section className="chart">
            {/* <h1>React Chart JS</h1> */}
            <AdvancedRealTimeChart theme="dark" autosize symbol={symbol + 'USDT'} interval="D"></AdvancedRealTimeChart>
            {/* <MiniChart colorTheme="dark" autosize></MiniChart> */}
        </section>
    );
}

export default Chart;
