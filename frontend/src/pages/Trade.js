import React, { useEffect } from 'react';

function Trade() {
    useEffect(() => {
        fetch('https://api.binance.com').then((res) => console.log(res.json()));
        // .then((data) => console.log(data));
        // console.log('hey from effect');
        // let ws = new WebSocket(' wss://stream.binance.com:9443/ws/adabtc@depth');
        // ws.onmessage = (event) => {
        //     console.log('hello');
        //     console.log(event.data);
        // };
    }, []);
    // useEffect(() => {
    //     fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=90`)
    //         .then((res) => {
    //             if (!res.ok) throw new Error('Couldnt fetch data');
    //             return res.json;
    //         })
    //         .then((data) => {
    //             console.log(data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);
    // const tradeChart = new TradingView.widget({
    //     container_id: 'basic-area-chart-demo',
    //     width: '100%',
    //     height: '100%',
    //     autosize: true,
    //     symbol: 'AAPL',
    //     interval: 'D',
    //     timezone: 'exchange',
    //     theme: 'light',
    //     style: '3',
    //     toolbar_bg: '#f1f3f6',
    //     hide_top_toolbar: true,
    //     save_image: false,
    //     locale: 'en',
    // });
    return (
        <>
            <h1>This is trading page</h1>
        </>
    );
}

export default Trade;
