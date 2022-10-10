import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/user-reducer';
import appSlice from './reducers/app-reducer';
import uiSlice from './reducers/ui-reducer';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import { cryptoApi } from '../services/cryptoApi';
const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        app: appSlice.reducer,
        ui: uiSlice.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
});
export default store;
