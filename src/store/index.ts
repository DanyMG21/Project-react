import {configureStore} from '@reduxjs/toolkit';
import {sessionReducer as session} from './reducers/session';
import {platesReducer as plates} from './reducers/plates';
import {clientsReducer as clients} from './reducers/clients';
import {invoiceReducer as invoices} from './reducers/invoices';

export default configureStore({
    reducer: {session, plates, clients, invoices},
});
