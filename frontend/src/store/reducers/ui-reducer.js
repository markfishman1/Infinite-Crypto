import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        notificationIsVisible: false,
        notifications: [],
        isScreenOn: false,
    },
    reducers: {
        openNotification(state) {
            state.notificationIsVisible = true;
        },
        closeNotification(state) {
            state.notificationIsVisible = false;
        },
        toggleNotification(state) {
            state.notificationIsVisible = !state.notificationIsVisible;
        },
        setNotifications(state, action) {
            state.notifications = action.payload;
        },
        toggleScreen(state) {
            state.isScreenOn = !state.isScreenOn;
        },
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
