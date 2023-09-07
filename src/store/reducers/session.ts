import { sessionActions } from '../actions/session';
import { createReducer } from '@reduxjs/toolkit';

export interface SessionState {
    authenticated: boolean;
    authenticationInProgress: boolean;
    userData: any;
    authenticationError: { message: string } | null;
    
}
export const getInitialState = (): SessionState => {
    return {
        authenticated: false,
        authenticationInProgress: false,
        userData: null,
        authenticationError: null,
    };
};

const loginSuccess = (
    state: SessionState,
    { payload }: ReturnType<typeof sessionActions.loginSuccess>
) => {
    return {
        ...getInitialState(),
        authenticated: true,
        userData: payload,
    };
};

const loginError = (
    state: SessionState,
    { payload }: ReturnType<typeof sessionActions.loginError>
) => {
    return {
        ...state,
        authenticationError: { message: payload.message },
    };
};

const toggleLoadingState = (
    state: SessionState,
    { payload }: ReturnType<typeof sessionActions.toggleLoadingState>
) => {

    return {
        ...state,
        authenticationInProgress: payload,
    };
};

const resetState = () => {
    return getInitialState();
};

const sessionReducerBuilder = (builder: any) => {
    builder
        .addCase(sessionActions.loginSuccess, loginSuccess)
        .addCase(sessionActions.loginError, loginError)
        .addCase(sessionActions.toggleLoadingState, toggleLoadingState)
        .addCase(sessionActions.resetState, resetState);
};

/*export const sessionReducer = (state = getInitialState(), action) => {
    const { type, payload } = action;
    switch (type) {
        case SessionActionType.ON_LOGIN_SUCCESS:
            return loginSuccess(state, payload);
        case SessionActionType.ON_LOGIN_ERROR:
            return loginError(state, payload);
        case SessionActionType.RESET_SESSION_STATE:
            return resetState();
        case SessionActionType.TOGGLE_LOGIN_LOADING_STATE:
            return toggleLoadingState(state, payload);
    }
    return state;
};*/

export const sessionReducer = createReducer(
    getInitialState,
    sessionReducerBuilder
);
