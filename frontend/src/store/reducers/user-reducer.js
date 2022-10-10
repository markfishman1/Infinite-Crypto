import { createSlice } from '@reduxjs/toolkit';

const initialState = { loggedUser: null, isNewRegister: false };
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        login(state, action) {
            console.log('action', action);
            state.loggedUser = action.payload;
        },
        logout(state, action) {},
        register(state, action) {
            state.isNewRegister = true;
        },
        // validateRegisterData(state, action) {},
    },
});
export const userActions = userSlice.actions;
export default userSlice;
