const morgan = require('morgan');
const express = require('express');
// import fetch from 'node-fetch';
const axios = require('axios');
const AppError = require('./utils/appError');
const authRoutes = require('./api/auth/authRoutes');
const coinRoutes = require('./api/coin/coinRoutes');
const orderRoutes = require('./api/order/orderRoutes');
const userRoutes = require('./api/user/userRoutes');
const globalErrorHandler = require('./api/error/errorController');
const app = express();
const cors = require('cors');
//EXTENDS LIMIT
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
    console.log('hello from the middleware 😎');
    next();
});
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.resolve(__dirname, 'public')));
// } else {
//     const corsOptions = {
//         origin: ['http://127.0.0.1:5000', 'http://localhost:5000', 'http://127.0.0.1:3000', 'http://localhost:3000'],
//         credentials: true,
//     };
//     app.use(cors(corsOptions));
// }
const corsOptions = {
    origin: ['http://127.0.0.1:5000', 'http://localhost:5000', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
};
app.use(cors(corsOptions));
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });
// app.use(cors());
app.use((req, res, next) => {
    console.log('Users from app.use');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/coin', coinRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);
app.all('*', (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server`), 401);
});
app.use(globalErrorHandler);
module.exports = app;

// const { Spot } = require('@binance/connector');
// const apiKey = 'BN01Y5YrH2QpnJx1FFu5Z8xekqEMS0xIiw2YywESaQ2hSV5eyHmiiPNnrKuMAuuz';
// const apiSecret = '72D6s6FZiUVnXYfbfp2RhGXntOfjuRWklbwlaThH5dakYQfdQH0fmLHwJsOruOIr';
// const client = new Spot(apiKey, apiSecret);
// console.log(client, 'binance client');
// const { Console } = require('console');
// const { cachedDataVersionTag } = require('node:v8');
// const Spot = require('../../../src/spot');

// const logger = new Console({ stdout: process.stdout, stderr: process.stderr });
// const client = new Spot('', '', { logger });
// const callbacks = {
//     open: () => logger.debug('Connected with Websocket server'),
//     close: () => logger.debug('Disconnected with Websocket server'),
//     message: (data) => logger.info(data),
// };

// all pairs
// const wsRef = client.tickerWS(null, callbacks)

// single pair
// const wsRef = client.rollingWindowTickerWS('1h', 'btcusdt', callbacks);
// console.log(wsRef);
// setTimeout(() => client.unsubscribe(wsRef), 60000);
// console.log(navigator);
//1)MIDDLEWARES
// console.log(process.env.NODE_ENV);
//Worker thread Registration
// app.use((req, res, next) => {
//     // fetch();
//     console.log('Onload here');
//     next();
// });
// const getOrders = async () => {
//     try {
//         return await axios.get('http://localhost:5000/api/order/orders-for-worker');
//     } catch (err) {}
// };
// const orders = getOrders();
// console.log(orders);
// axios.get('http://localhost:5000/api/order');
// fetch('http://localhost:5000/api/order')
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// const worker = new Worker('./worker.js');
// worker.on('message', (message) => console.log(message));
// worker.postMessage('ping');
// if (isMainThread) {
//     module.exports = function parseJSAsync(script) {
//         return new Promise((resolve, reject) => {
//             const worker = new Worker('/worker.js', {
//                 workerData: script,
//             });
//             worker.on('message', resolve);
//             worker.on('error', reject);
//             worker.on('exit', (code) => {
//                 if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
//             });
//         });
//     };
// } else {
//     const { parse } = require('some-js-parsing-library');
//     const script = workerData;
//     parentPort.postMessage(parse(script));
// }
