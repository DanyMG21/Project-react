import { createAction, Dispatch } from '@reduxjs/toolkit';
import httpClient from '../../services/httpClient';
import { clientsUrl } from '../../constants/endpoints';
import { Client } from '../../types/Client';

export enum ClientActionType {
    GET_CLIENTS_LIST_ON_SUCCESS = 'GET_CLIENTS_LIST_ON_SUCCESS',
    GET_CLIENTS_LIST_ON_ERROR = 'GET_CLIENTS_LIST_ON_ERROR',
    TOGGLE_GET_CLIENTS_LIST_LOADING_STATE = 'TOGGLE_GET_CLIENTS_LIST_LOADING_STATE',

    UPDATE_CLIENTS_ON_SUCCESS = 'UPDATE_CLIENTS_ON_SUCCESS',
    UPDATE_CLIENTS_ON_ERROR = 'UPDATE_CLIENTS_ON_ERROR',
    TOGGLE_UPDATE_CLIENTS_LOADING_STATE = 'TOGGLE_UPDATE_CLIENTS_LOADING_STATE',

    CREATE_CLIENTS_ON_SUCCESS = 'CREATE_CLIENTS_ON_SUCCESS',
    CREATE_CLIENTS_ON_ERROR = 'CREATE_CLIENTS_ON_ERROR',
    TOGGLE_CREATE_CLIENTS_LOADING_STATE = 'TOGGLE_CREATE_CLIENTS_LOADING_STATE',

    DELETE_CLIENTS_ON_SUCCESS = 'DELETE_CLIENTS_ON_SUCCESS',
    DELETE_CLIENTS_ON_ERROR = 'DELETE_CLIENTS_ON_ERROR',
    TOGGLE_DELETE_CLIENTS_LOADING_STATE = 'TOGGLE_DELETE_CLIENTS_LOADING_STATE',

    RESET_CLIENTS_STATE = 'RESET_CLIENTS_STATE',
}

const onUpdateClientSuccess = createAction<Client>(
    ClientActionType.UPDATE_CLIENTS_ON_SUCCESS
);

const onUpdateClientError = createAction<Error>(
    ClientActionType.UPDATE_CLIENTS_ON_ERROR
);

const toggleUpdateClientLoadingState = createAction<boolean>(
    ClientActionType.TOGGLE_UPDATE_CLIENTS_LOADING_STATE
);

const onCreateClientSuccess = createAction<Client>(
    ClientActionType.CREATE_CLIENTS_ON_SUCCESS
);

const onCreateClientError = createAction<Error>(
    ClientActionType.CREATE_CLIENTS_ON_ERROR
);

const toggleCreateClientLoadingState = createAction<boolean>(
    ClientActionType.TOGGLE_CREATE_CLIENTS_LOADING_STATE
);

const onDeleteClientSuccess = createAction<number | string>(
    ClientActionType.DELETE_CLIENTS_ON_SUCCESS
);

const onDeleteClientError = createAction<Error>(
    ClientActionType.DELETE_CLIENTS_ON_ERROR
);

const toggleDeleteClientLoadingState = createAction<boolean>(
    ClientActionType.TOGGLE_DELETE_CLIENTS_LOADING_STATE
);

const onGetClientListSuccess = createAction<Client[]>(
    ClientActionType.GET_CLIENTS_LIST_ON_SUCCESS
);

const onGetClientListError = createAction<Error>(
    ClientActionType.GET_CLIENTS_LIST_ON_ERROR
);

const toggleGetClientListLoadingState = createAction<boolean>(
    ClientActionType.TOGGLE_GET_CLIENTS_LIST_LOADING_STATE
);

const resetClientState = createAction<undefined>(
    ClientActionType.RESET_CLIENTS_STATE
);

const getClients = () => async (dispatch: Dispatch) => {
    dispatch(toggleGetClientListLoadingState(true));
    try {
        const { data: clientList } = await httpClient.get(clientsUrl);
        dispatch(onGetClientListSuccess(clientList));
    } catch (error) {
        dispatch(onGetClientListError(error as Error));
    }
    dispatch(toggleGetClientListLoadingState(false));
};

const createClient = (client: Partial<Client>) => async (dispatch: Dispatch) => {
    dispatch(toggleCreateClientLoadingState(true));
    try {
        const { data: response } = await httpClient.post(clientsUrl, client);
        dispatch(onCreateClientSuccess(response));
    } catch (error) {
        dispatch(onCreateClientError(error as Error));
    }
    dispatch(toggleCreateClientLoadingState(false));
};

const updateClient = (client: Client) => async (dispatch: Dispatch) => {
    dispatch(toggleUpdateClientLoadingState(true));
    try {
        const { data: response } = await httpClient.put(
            `${clientsUrl}/${client.id}`,
            client
        );
        dispatch(onUpdateClientSuccess(response));
    } catch (error) {
        dispatch(onUpdateClientError(error as Error));
    }
    dispatch(toggleUpdateClientLoadingState(false));
};

const deleteClient = (id: string | number) => async (dispatch: Dispatch) => {
    dispatch(toggleDeleteClientLoadingState(true));
    try {
        await httpClient.delete(`${clientsUrl}/${id}`);
        dispatch(onDeleteClientSuccess(id));
    } catch (error) {
        dispatch(onDeleteClientError(error as Error));
    }
    dispatch(toggleDeleteClientLoadingState(false));
};

export const ClientsActions = {
    onGetClientListSuccess,
    onGetClientListError,
    toggleGetClientListLoadingState,
    getClients,

    onCreateClientSuccess,
    onCreateClientError,
    toggleCreateClientLoadingState,
    createClient,

    onUpdateClientSuccess,
    onUpdateClientError,
    toggleUpdateClientLoadingState,
    updateClient,

    onDeleteClientSuccess,
    onDeleteClientError,
    toggleDeleteClientLoadingState,
    deleteClient,

    resetClientState,

};
