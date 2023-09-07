import { createAction, Dispatch } from '@reduxjs/toolkit';
import httpClient from '../../services/httpClient';
import { platesUrl } from '../../constants/endpoints';
import { Plate } from '../../types/Plate';

export enum PlateActionType {
    GET_PLATE_LIST_ON_SUCCESS = 'GET_PLATE_LIST_ON_SUCCESS',
    GET_PLATE_LIST_ON_ERROR = 'GET_PLATE_LIST_ON_ERROR',
    TOGGLE_GET_PLATE_LIST_LOADING_STATE = 'TOGGLE_GET_PLATE_LIST_LOADING_STATE',

    UPDATE_PLATE_ON_SUCCESS = 'UPDATE_PLATE_ON_SUCCESS',
    UPDATE_PLATE_ON_ERROR = 'UPDATE_PLATE_ON_ERROR',
    TOGGLE_UPDATE_PLATE_LOADING_STATE = 'TOGGLE_UPDATE_PLATE_LOADING_STATE',

    CREATE_PLATE_ON_SUCCESS = 'CREATE_PLATE_ON_SUCCESS',
    CREATE_PLATE_ON_ERROR = 'CREATE_PLATE_ON_ERROR',
    TOGGLE_CREATE_PLATE_LOADING_STATE = 'TOGGLE_CREATE_PLATE_LOADING_STATE',

    DELETE_PLATE_ON_SUCCESS = 'DELETE_PLATE_ON_SUCCESS',
    DELETE_PLATE_ON_ERROR = 'DELETE_PLATE_ON_ERROR',
    TOGGLE_DELETE_PLATE_LOADING_STATE = 'TOGGLE_DELETE_PLATE_LOADING_STATE',

    RESET_PLATE_STATE = 'RESET_PLATE_STATE',
}

const onUpdatePlateSuccess = createAction<Plate>(
    PlateActionType.UPDATE_PLATE_ON_SUCCESS
);

const onUpdatePlateError = createAction<Error>(
    PlateActionType.UPDATE_PLATE_ON_ERROR
);

const toggleUpdatePlateLoadingState = createAction<boolean>(
    PlateActionType.TOGGLE_UPDATE_PLATE_LOADING_STATE
);

const onCreatePlateSuccess = createAction<Plate>(
    PlateActionType.CREATE_PLATE_ON_SUCCESS
);

const onCreatePlateError = createAction<Error>(
    PlateActionType.CREATE_PLATE_ON_ERROR
);

const toggleCreatePlateLoadingState = createAction<boolean>(
    PlateActionType.TOGGLE_CREATE_PLATE_LOADING_STATE
);

const onDeletePlateSuccess = createAction<number | string>(
    PlateActionType.DELETE_PLATE_ON_SUCCESS
);

const onDeletePlateError = createAction<Error>(
    PlateActionType.DELETE_PLATE_ON_ERROR
);

const toggleDeletePlateLoadingState = createAction<boolean>(
    PlateActionType.TOGGLE_DELETE_PLATE_LOADING_STATE
);

const onGetPlateListSuccess = createAction<Plate[]>(
    PlateActionType.GET_PLATE_LIST_ON_SUCCESS
);

const onGetPlateListError = createAction<Error>(
    PlateActionType.GET_PLATE_LIST_ON_ERROR
);

const toggleGetPlateListLoadingState = createAction<boolean>(
    PlateActionType.TOGGLE_GET_PLATE_LIST_LOADING_STATE
);

const resetPlateState = createAction<undefined>(
    PlateActionType.RESET_PLATE_STATE
);

const getPlates = () => async (dispatch: Dispatch) => {
    dispatch(toggleGetPlateListLoadingState(true));
    try {
        const { data: plateList } = await httpClient.get(platesUrl);
        dispatch(onGetPlateListSuccess(plateList));
    } catch (error) {
        dispatch(onGetPlateListError(error as Error));
    }
    dispatch(toggleGetPlateListLoadingState(false));
};

const createPlate = (plate: Partial<Plate>) => async (dispatch: Dispatch) => {
    dispatch(toggleCreatePlateLoadingState(true));
    try {
        const { data: response } = await httpClient.post(platesUrl, plate);
        dispatch(onCreatePlateSuccess(response));
    } catch (error) {
        dispatch(onCreatePlateError(error as Error));
    }
    dispatch(toggleCreatePlateLoadingState(false));
};

const updatePlate = (plate: Plate) => async (dispatch: Dispatch) => {
    dispatch(toggleUpdatePlateLoadingState(true));
    try {
        const { data: response } = await httpClient.put(
            `${platesUrl}/${plate.id}`,
            plate
        );
        dispatch(onUpdatePlateSuccess(response));
    } catch (error) {
        dispatch(onUpdatePlateError(error as Error));
    }
    dispatch(toggleUpdatePlateLoadingState(false));
};

const deletePlate = (id: string | number) => async (dispatch: Dispatch) => {
    dispatch(toggleDeletePlateLoadingState(true));
    try {
        await httpClient.delete(`${platesUrl}/${id}`);
        dispatch(onDeletePlateSuccess(id));
    } catch (error) {
        dispatch(onDeletePlateError(error as Error));
    }
    dispatch(toggleDeletePlateLoadingState(false));
};

export const PlatesActions = {
    onGetPlateListSuccess,
    onGetPlateListError,
    toggleGetPlateListLoadingState,
    getPlates,

    onCreatePlateSuccess,
    onCreatePlateError,
    toggleCreatePlateLoadingState,
    createPlate,

    onUpdatePlateSuccess,
    onUpdatePlateError,
    toggleUpdatePlateLoadingState,
    updatePlate,

    onDeletePlateSuccess,
    onDeletePlateError,
    toggleDeletePlateLoadingState,
    deletePlate,

    resetPlateState,

};
