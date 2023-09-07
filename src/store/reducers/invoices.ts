import { createReducer } from '@reduxjs/toolkit'
import {
    clearInvoicesByUser,
    geInvoicesByUserFail,
    geInvoicesByUserSuccess,
    geInvoicesDetailFail,
    geInvoicesDetailSuccess,
    geInvoicesFail,
    geInvoicesSuccess,
    toggleGetInvoicesByUserState,
    toggleGetInvoicesDetailState,
    toggleGetInvoicesState,
} from '../actions/invoices'

interface InnerSTate {
    loading: boolean
    data: any
    error: { message: string } | null
}

export interface InvoiceState {
    list: InnerSTate
    filterList: InnerSTate
    invoiceDetail: InnerSTate
}

const getInitialInnerState = () => {
    return {
        loading: false,
        data: null,
        error: null,
    }
}

const getInitialState = () => {
    return {
        list: getInitialInnerState(),
        filterList: getInitialInnerState(),
        invoiceDetail: getInitialInnerState(),
    }
}

export const geInvoicesByUserSuccessExecutor = (
    state: InvoiceState,
    action: any
) => {
    state.filterList.data = action.payload
}

export const geInvoicesByUserFailExecutor = (
    state: InvoiceState,
    action: any
) => {
    const { message } = action.payload
    state.filterList.error = { message }
}
export const toggleGetInvoicesByUserStateExecutor = (
    state: InvoiceState,
    action: any
) => {
    state.filterList.loading = action.payload
}

export const clearInvoicesByUserExecutor = (state: InvoiceState) => {
    return {
        ...state,
        filterList: getInitialInnerState(),
    }
}
export const geInvoicesDetailSuccessExecutor = (
    state: InvoiceState,
    action: any
) => {
    state.invoiceDetail.data = action.payload
}
export const geInvoicesDetailFailExecutor = (
    state: InvoiceState,
    action: any
) => {
    const { message } = action.payload
    state.invoiceDetail.error = { message }
}
export const toggleGetInvoicesDetailStateExecutor = (
    state: InvoiceState,
    action: any
) => {
    state.invoiceDetail.loading = action.payload
}
export const geInvoicesSuccessExecutor = (state: InvoiceState, action: any) => {
    state.list.data = action.payload
}
export const geInvoicesFailExecutor = (state: InvoiceState, action: any) => {
    const { message } = action.payload
    state.list.error = { message }
}

export const toggleGetInvoicesStateExecutor = (
    state: InvoiceState,
    action: any
) => {
    state.list.loading = action.payload
}

const invoiceReducerBuilder = (builder: any) => {
    return builder
        .addCase(geInvoicesByUserSuccess, geInvoicesByUserSuccessExecutor)
        .addCase(geInvoicesByUserFail, geInvoicesByUserFailExecutor)
        .addCase(
            toggleGetInvoicesByUserState,
            toggleGetInvoicesByUserStateExecutor
        )
        .addCase(geInvoicesDetailSuccess, geInvoicesDetailSuccessExecutor)
        .addCase(geInvoicesDetailFail, geInvoicesDetailFailExecutor)
        .addCase(
            toggleGetInvoicesDetailState,
            toggleGetInvoicesDetailStateExecutor
        )
        .addCase(geInvoicesSuccess, geInvoicesSuccessExecutor)
        .addCase(geInvoicesFail, geInvoicesFailExecutor)
        .addCase(toggleGetInvoicesState, toggleGetInvoicesStateExecutor)
        .addCase(clearInvoicesByUser, clearInvoicesByUserExecutor)
}

export const invoiceReducer = createReducer(
    getInitialState(),
    invoiceReducerBuilder
)
