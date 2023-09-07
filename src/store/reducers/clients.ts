import { createReducer } from '@reduxjs/toolkit';
import { ClientsActions } from '../actions/clients';
import { Client } from '../../types/Client';

export interface ClientsState {
    getClientsListInProgress: boolean;
    clientsList: Client[] | null;
    getClientsListError: { message: string } | null;

    createClientInProgress: boolean;
    createClientError: { message: string } | null;

    updateClientInProgress: boolean;
    updateClientError: { message: string } | null;

    deleteClientInProgress: boolean;
    deleteClientError: { message: string } | null;
}

const getInitialState = ():ClientsState => {
    return {
        getClientsListError: null,
        getClientsListInProgress: false,
        clientsList: null,
        createClientInProgress:false,
        createClientError:null,
        updateClientInProgress:false,
        updateClientError:null,
        deleteClientInProgress:false,
        deleteClientError:null,
    };
};

const onGetClientListSuccess = (
    state: ClientsState,
    { payload }: ReturnType<typeof ClientsActions.onGetClientListSuccess>
) => {
    return {
        ...state,
        clientsList: payload,
    };
};

const onGetClientListError = (
    state: ClientsState,
    { payload }: ReturnType<typeof ClientsActions.onGetClientListError>
) => {
    return {
        ...state,
        getClientsListError: { message: payload.message },
    };
};

const toggleGetClientListLoadingState = (
    state: ClientsState,
    { payload }: ReturnType<typeof ClientsActions.toggleGetClientListLoadingState>
) => {
    return {
        ...state,
        getClientsListInProgress: payload,
    };
};

const onCreateClientSuccess = (
    state: ClientsState,
    { payload }: ReturnType<typeof ClientsActions.onCreateClientSuccess>
) => {
    return {
        ...state,
        clientsList: state.clientsList?.concat(payload),
    };
};

const onCreateClientError = (
    state: ClientsState,
    { payload }: ReturnType<typeof ClientsActions.onCreateClientError>
) => {
    return {
        ...state,
        createClientError: { message: payload.message },
    };
};

const toggleCreateClientLoadingState = (
    state: ClientsState,
    { payload }: ReturnType<typeof ClientsActions.toggleCreateClientLoadingState>
) => {
    return {
        ...state,
        createClientInProgress: payload,
    };
};

const onUpdateClientSuccess = (
    state: ClientsState,
    { payload }: ReturnType<typeof ClientsActions.onUpdateClientSuccess>
) => {
    return {
        ...state,
        clientsList: state.clientsList?.map(function replaceClient(clientItem) {
            return clientItem.id !== payload.id ? clientItem : payload;
        }),
    };
};

const onUpdateClientError = (
    state: ClientsState,
    { payload }: ReturnType<typeof ClientsActions.onUpdateClientError>
) => {
    return {
        ...state,
        updateClientError: { message: payload.message },
    };
};

const toggleUpdateClientLoadingState = (
    state: ClientsState,
    { payload }: ReturnType<typeof ClientsActions.toggleUpdateClientLoadingState>
) => {
    return {
        ...state,
        updateClientInProgress: payload,
    };
};

const onDeleteClientSuccess = (
    state: ClientsState,
    { payload }: ReturnType<typeof ClientsActions.onDeleteClientSuccess>
) => {
    return {
        ...state,
        clientsList: state.clientsList?.filter(function removeClient(clientItem) {
            return clientItem.id !== payload;
        }),
    };
};

const onDeleteClientError = (
    state: ClientsState,
    { payload }: ReturnType<typeof ClientsActions.onDeleteClientError>
) => {
    return {
        ...state,
        deleteClientError: { message: payload.message },
    };
};

const toggleDeleteClientLoadingState = (
    state: ClientsState,
    { payload }: ReturnType<typeof ClientsActions.toggleDeleteClientLoadingState>
) => {
    return {
        ...state,
        deleteClientInProgress: payload,
    };
};

const resetClientState = () => getInitialState();

const ClientsReducerBuilder = (builder: any) => {
    builder.addCase(ClientsActions.onCreateClientSuccess, onCreateClientSuccess);
    builder.addCase(ClientsActions.onCreateClientError, onCreateClientError);
    builder.addCase(
        ClientsActions.toggleCreateClientLoadingState,
        toggleCreateClientLoadingState
    );


    builder.addCase(ClientsActions.onUpdateClientSuccess, onUpdateClientSuccess);
    builder.addCase(
        ClientsActions.onUpdateClientError,
        onUpdateClientError
    );
    builder.addCase(ClientsActions.toggleUpdateClientLoadingState, toggleUpdateClientLoadingState);


    builder.addCase(ClientsActions.onDeleteClientSuccess, onDeleteClientSuccess);
    builder.addCase(ClientsActions.onDeleteClientError, onDeleteClientError);
    builder.addCase(
        ClientsActions.toggleDeleteClientLoadingState,
        toggleDeleteClientLoadingState
    );

    builder.addCase(ClientsActions.onGetClientListSuccess, onGetClientListSuccess);
    builder.addCase(ClientsActions.onGetClientListError, onGetClientListError);
    builder.addCase(
        ClientsActions.toggleGetClientListLoadingState,
        toggleGetClientListLoadingState
    );

    builder.addCase(ClientsActions.resetClientState, resetClientState);
};

export const clientsReducer = createReducer(
    getInitialState(),
    ClientsReducerBuilder
);
