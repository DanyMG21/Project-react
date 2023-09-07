import { createReducer } from '@reduxjs/toolkit';
import { PlatesActions } from '../actions/plates';
import { Plate } from '../../types/Plate';

export interface PlatesState {
    getPlatesListInProgress: boolean;
    platesList: Plate[] | null;
    getPlatesListError: { message: string } | null;

    createPlateInProgress: boolean;
    createPlateError: { message: string } | null;

    updatePlateInProgress: boolean;
    updatePlateError: { message: string } | null;

    deletePlateInProgress: boolean;
    deletePlateError: { message: string } | null;
}

const getInitialState = ():PlatesState => {
    return {
        getPlatesListError: null,
        getPlatesListInProgress: false,
        platesList: null,
        createPlateInProgress:false,
        createPlateError:null,
        updatePlateInProgress:false,
        updatePlateError:null,
        deletePlateInProgress:false,
        deletePlateError:null,
    };
};

const onGetPlateListSuccess = (
    state: PlatesState,
    { payload }: ReturnType<typeof PlatesActions.onGetPlateListSuccess>
) => {
    return {
        ...state,
        platesList: payload,
    };
};

const onGetPlateListError = (
    state: PlatesState,
    { payload }: ReturnType<typeof PlatesActions.onGetPlateListError>
) => {
    return {
        ...state,
        getPlatesListError: { message: payload.message },
    };
};

const toggleGetPlateListLoadingState = (
    state: PlatesState,
    { payload }: ReturnType<typeof PlatesActions.toggleGetPlateListLoadingState>
) => {
    return {
        ...state,
        getPlatesListInProgress: payload,
    };
};

const onCreatePlateSuccess = (
    state: PlatesState,
    { payload }: ReturnType<typeof PlatesActions.onCreatePlateSuccess>
) => {
    return {
        ...state,
        platesList: state.platesList?.concat(payload),
    };
};

const onCreatePlateError = (
    state: PlatesState,
    { payload }: ReturnType<typeof PlatesActions.onCreatePlateError>
) => {
    return {
        ...state,
        createPlateError: { message: payload.message },
    };
};

const toggleCreatePlateLoadingState = (
    state: PlatesState,
    { payload }: ReturnType<typeof PlatesActions.toggleCreatePlateLoadingState>
) => {
    return {
        ...state,
        createPlateInProgress: payload,
    };
};

const onUpdatePlateSuccess = (
    state: PlatesState,
    { payload }: ReturnType<typeof PlatesActions.onUpdatePlateSuccess>
) => {
    return {
        ...state,
        platesList: state.platesList?.map(function replacePlate(plateItem) {
            return plateItem.id !== payload.id ? plateItem : payload;
        }),
    };
};

const onUpdatePlateError = (
    state: PlatesState,
    { payload }: ReturnType<typeof PlatesActions.onUpdatePlateError>
) => {
    return {
        ...state,
        updatePlateError: { message: payload.message },
    };
};

const toggleUpdatePlateLoadingState = (
    state: PlatesState,
    { payload }: ReturnType<typeof PlatesActions.toggleUpdatePlateLoadingState>
) => {
    return {
        ...state,
        updatePlateInProgress: payload,
    };
};

const onDeletePlateSuccess = (
    state: PlatesState,
    { payload }: ReturnType<typeof PlatesActions.onDeletePlateSuccess>
) => {
    return {
        ...state,
        platesList: state.platesList?.filter(function removePlate(plateItem) {
            return plateItem.id !== payload;
        }),
    };
};

const onDeletePlateError = (
    state: PlatesState,
    { payload }: ReturnType<typeof PlatesActions.onDeletePlateError>
) => {
    return {
        ...state,
        deletePlateError: { message: payload.message },
    };
};

const toggleDeletePlateLoadingState = (
    state: PlatesState,
    { payload }: ReturnType<typeof PlatesActions.toggleDeletePlateLoadingState>
) => {
    return {
        ...state,
        deletePlateInProgress: payload,
    };
};

const resetPlateState = () => getInitialState();

const platesReducerBuilder = (builder: any) => {
    builder.addCase(PlatesActions.onCreatePlateSuccess, onCreatePlateSuccess);
    builder.addCase(PlatesActions.onCreatePlateError, onCreatePlateError);
    builder.addCase(
        PlatesActions.toggleCreatePlateLoadingState,
        toggleCreatePlateLoadingState
    );


    builder.addCase(PlatesActions.onUpdatePlateSuccess, onUpdatePlateSuccess);
    builder.addCase(
        PlatesActions.onUpdatePlateError,
        onUpdatePlateError
    );
    builder.addCase(PlatesActions.toggleUpdatePlateLoadingState, toggleUpdatePlateLoadingState);


    builder.addCase(PlatesActions.onDeletePlateSuccess, onDeletePlateSuccess);
    builder.addCase(PlatesActions.onDeletePlateError, onDeletePlateError);
    builder.addCase(
        PlatesActions.toggleDeletePlateLoadingState,
        toggleDeletePlateLoadingState
    );

    builder.addCase(PlatesActions.onGetPlateListSuccess, onGetPlateListSuccess);
    builder.addCase(PlatesActions.onGetPlateListError, onGetPlateListError);
    builder.addCase(
        PlatesActions.toggleGetPlateListLoadingState,
        toggleGetPlateListLoadingState
    );

    builder.addCase(PlatesActions.resetPlateState, resetPlateState);
};

export const platesReducer = createReducer(
    getInitialState(),
    platesReducerBuilder
);
