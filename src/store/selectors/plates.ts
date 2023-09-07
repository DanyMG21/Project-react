import { PlatesState } from '../reducers/plates';
import { createSelector } from '@reduxjs/toolkit';

export const platesStateSelector = (state: any): PlatesState => state.plates;

export const plateListSelector = createSelector(
    platesStateSelector,
    (plateState) => {
        return plateState.platesList;
    } 
);

export const getPlatesListInProgressSelector = createSelector(
    platesStateSelector,
    (plateState) => {
        return plateState.getPlatesListInProgress;
    }
);

export const getPlatesListErrorSelector = createSelector(
    platesStateSelector,
    (plateState) => {
        return plateState.getPlatesListError;
    }
);

export const updatePlateInProgressSelector = createSelector(
    platesStateSelector,
    (plateState) => {
        return plateState.updatePlateInProgress;
    }
);

export const updatePlateErrorSelector = createSelector(
    platesStateSelector,
    (plateState) => {
        return plateState.updatePlateError;
    }
);

export const deletePlateInProgressSelector = createSelector(
    platesStateSelector,
    (plateState) => {
        return plateState.deletePlateInProgress;
    }
);

export const createPlateInProgressSelector = createSelector(
    platesStateSelector,
    (plateState) => {
        return plateState.createPlateInProgress;
    }
);

export const createPlateErrorSelector = createSelector(
    platesStateSelector,
    (plateState) => {
        return plateState.createPlateError;
    }
);

export const deletePlateError = createSelector(
    platesStateSelector,
    (plateState) => {
        return plateState.deletePlateError;
    }
);

export const platesMapSelector = createSelector(
    plateListSelector,
    plateList => {
        return plateList?.reduce((acc, curr: any) => {
            return {...acc, [curr.id]: curr}
        }, {})
    }
)
