import { createAction } from '@reduxjs/toolkit';
import { loginUrl } from '../../constants/endpoints';
import httpClient from '../../services/httpClient';
import { decodeToken, setToken } from '../../utils/tokenManagement';

export enum SessionActionType {
    ON_LOGIN_SUCCESS = 'ON_LOGIN_SUCCESS',
    ON_LOGIN_ERROR = 'ON_LOGIN_ERROR',
    TOGGLE_LOGIN_LOADING_STATE = 'TOGGLE_LOGIN_LOADING_STATE',
    RESET_SESSION_STATE = 'RESET_SESSION_STATE',
}

/*const loginSuccess = (payload: any) => ({
    type: SessionActionType.ON_LOGIN_SUCCESS,
    payload,
});*/

const loginSuccess = createAction<any>(SessionActionType.ON_LOGIN_SUCCESS);

/*const loginError = (payload: any) => ({
    type: SessionActionType.ON_LOGIN_ERROR,
    payload,
});*/

const loginError = createAction<Error>(SessionActionType.ON_LOGIN_ERROR);

/*const toggleLoadingState = (payload: any) => ({
    type: SessionActionType.TOGGLE_LOGIN_LOADING_STATE,
    payload,
});*/

const toggleLoadingState = createAction<boolean>(
    SessionActionType.TOGGLE_LOGIN_LOADING_STATE
);

/*const resetState = () => ({
    type: SessionActionType.RESET_SESSION_STATE,
});*/

const resetState = createAction<undefined>(
    SessionActionType.RESET_SESSION_STATE
);

/*const RemoteRequest = (loginData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject({ message: 'invalid credentials' });
        }, 2000);
    });
};*/

const login = (loginData: any) => async (dispatch) => {
    dispatch(toggleLoadingState(true));
    try {
        const { data: response } = await httpClient.post(
            loginUrl,
            loginData,
            false
        );

        const expirationDate = new Date(response.expiracion);
        setToken(response.token, expirationDate);

        dispatch(loginSuccess(decodeToken()));
    } catch (error) {
        dispatch(loginError(error));
    }
    dispatch(toggleLoadingState(false));
};

export const sessionActions = {
    resetState,
    toggleLoadingState,
    loginError,
    loginSuccess,
    login,
};
