import { createSelector } from '@reduxjs/toolkit';
import { SessionState } from '../reducers/session';

export const sessionStateSelector = (state: any): SessionState => state.session;

export const authenticationInProgressSelector = createSelector(
    sessionStateSelector,
    (sessionState) => {
        return sessionState.authenticationInProgress;
    }
);

export const authenticationErrorSelector = createSelector(
    sessionStateSelector,
    (sessionState) => {
        return sessionState.authenticationError;
    }
);

export const isUserAuthenticatedSelector = createSelector(
    sessionStateSelector,
    (sessionState) => {
        return sessionState.authenticated;
    }
);
