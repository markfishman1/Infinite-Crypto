import { userActions } from '../reducers/user-reducer';
import { authService } from '../../services/auth.service';

export const login = (userCred) => {
    return async (dispatch) => {
        // const loginUser = async () => {
        //     const user=
        // };
        try {
            const user = await authService.login(userCred);
            console.log('user from userActions', user);
            return user ? dispatch(userActions.login(user)) : false;
            // if (user) dispatch(userActions.login(user));
        } catch (err) {}
    };
};
export const register = (userCred) => {
    return async (dispatch) => {
        const signup = async () => {
            return await authService.signup(userCred);
        };
        try {
            const user = signup();
            console.log('user from userActions', user);
            dispatch(userActions(login(user)));
        } catch (err) {}
    };
};

export const buyAction = () => {
    return async (dispatch) => {
        try {
        } catch {}
    };
};
