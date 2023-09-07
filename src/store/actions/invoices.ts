import { createAction } from '@reduxjs/toolkit';
import httpClient from '../../services/httpClient';
import {
    clientsUrl,
    invoicesByUserUrl,
    invoicesUrl,
    platesUrl,
} from '../../constants/endpoints';

export enum InvoicesActionTypes {
    GET_INVOICES_BY_USER_SUCCESS = 'GET_INVOICES_BY_USER_SUCCESS',
    GET_INVOICES_BY_USER_FAIL = 'GET_INVOICES_BY_USER_FAIL',
    TOGGLE_GET_INVOICES_BY_USER_STATE = 'TOGGLE_GET_INVOICES_BY_USER_STATE',
    GET_INVOICES_DETAIL_SUCCESS = 'GET_INVOICES_DETAIL_SUCCESS',
    GET_INVOICES_DETAIL_FAIL = 'GET_INVOICES_DETAIL_FAIL',
    TOGGLE_GET_INVOICES_DETAIL = 'TOGGLE_GET_INVOICES_DETAIL',
    GET_INVOICES_SUCCESS = 'GET_INVOICES_SUCCESS',
    GET_INVOICES_FAIL = 'GET_INVOICES_FAIL',
    TOGGLE_GET_INVOICES_STATE = 'TOGGLE_GET_INVOICES_STATE',
    CLEAR_INVOICES_BY_USER = 'CLEAR_INVOICES_BY_USER',
}

export const geInvoicesByUserSuccess = createAction<any>(
    InvoicesActionTypes.GET_INVOICES_BY_USER_SUCCESS
);
export const geInvoicesByUserFail = createAction<any>(
    InvoicesActionTypes.GET_INVOICES_BY_USER_FAIL
);
export const toggleGetInvoicesByUserState = createAction<boolean>(
    InvoicesActionTypes.TOGGLE_GET_INVOICES_BY_USER_STATE
);

export const geInvoicesDetailSuccess = createAction<any>(
    InvoicesActionTypes.GET_INVOICES_DETAIL_SUCCESS
);
export const geInvoicesDetailFail = createAction<any>(
    InvoicesActionTypes.GET_INVOICES_DETAIL_FAIL
);
export const toggleGetInvoicesDetailState = createAction<boolean>(
    InvoicesActionTypes.TOGGLE_GET_INVOICES_DETAIL
);

export const geInvoicesSuccess = createAction<any>(
    InvoicesActionTypes.GET_INVOICES_SUCCESS
);
export const geInvoicesFail = createAction<any>(
    InvoicesActionTypes.GET_INVOICES_FAIL
);
export const toggleGetInvoicesState = createAction<boolean>(
    InvoicesActionTypes.TOGGLE_GET_INVOICES_STATE
);

export const clearInvoicesByUser = createAction<undefined>(
    InvoicesActionTypes.CLEAR_INVOICES_BY_USER
);

export const getInvoicesByUser = (userId: any) => async (dispatch: any) => {
    dispatch(toggleGetInvoicesByUserState(true));
    try {
        const payload = {
            idCliente: userId,
        };
        const response = await httpClient.post(invoicesByUserUrl, payload);

        dispatch(geInvoicesByUserSuccess(response.data));
    } catch (e) {
        dispatch(geInvoicesByUserFail(e));
    }

    dispatch(toggleGetInvoicesByUserState(false));
};

export const getInvoiceDetail =
    (invoiceId: any, callback: any) => async (dispatch: any) => {
        dispatch(toggleGetInvoicesDetailState(true));
        try {
            const invoiceResponse = await httpClient.get(
                `${invoicesUrl}/${invoiceId}`
            );

            const clientId = invoiceResponse.data.client.id;
            const clientRequest = httpClient.get(
                `${clientsUrl}/${clientId}`
            ).then(({ data }: any) => data);

            const platesRequest = invoiceResponse.data.items.map((p: any) => {
                return httpClient
                    .get(`${platesUrl}/${p.plate.id}`)
                    .then(({ data }: any) => data);
            });

            const [clientResponse, ...platesResponse] = await Promise.all([clientRequest,...platesRequest]);

            const jsonResponse = {
                invoice: invoiceResponse.data,
                client: clientResponse,
                plates: platesResponse,
            };

            dispatch(geInvoicesDetailSuccess(jsonResponse));
            callback();
        } catch (error) {
            dispatch(geInvoicesDetailFail(error));
        }

        dispatch(toggleGetInvoicesDetailState(false));
    };

export const getInvoiceList = () => async (dispatch: any) => {
    dispatch(toggleGetInvoicesState(true));
    try {
        const response = await httpClient.get(invoicesUrl);

        dispatch(geInvoicesSuccess(response.data));
    } catch (error) {
        dispatch(geInvoicesFail(error));
    }

    dispatch(dispatch(toggleGetInvoicesState(false)));
};
