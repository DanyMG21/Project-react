import { InvoiceState } from "../reducers/invoices";
import { createSelector } from "@reduxjs/toolkit";

export const invoiceStateSelector = (store:any): InvoiceState => store.invoices;
export const invoiceDetailSelector = createSelector(
    invoiceStateSelector,
    (invoiceState) => {
        return invoiceState.invoiceDetail.data;
    }
);
