const morgan = require('morgan');
const express = require('express');
const AppError = require('./utils/appError');
const authRoutes = require('./api/auth/authRoutes');
const globalErrorHandler = require('./api/error/errorController');
const app = express();
const cors = require('cors');

//1)MIDDLEWARES
// console.log(process.env.NODE_ENV);
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
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });
const corsOptions = {
    origin: ['http://127.0.0.1:5000', 'http://localhost:5000', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
};
app.use(cors(corsOptions));
// app.use(cors());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
app.all('*', (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server`), 401);
});
app.use(globalErrorHandler);
module.exports = app;
