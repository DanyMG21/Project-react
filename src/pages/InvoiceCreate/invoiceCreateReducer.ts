export const InvoiceCreatorActions = {
    updateDescription: 'updateDescription',
    addEntry: 'addEntry',
    removeEntry: 'removeEntry',
    resetOrders: 'resetOrders',
    resetState: 'resetState',
}

interface InvoiceReducerAction {
    type: string,
    payload?: any
}

export const invoiceCreateReducer = (state: any, action: InvoiceReducerAction) => {
    const {type, payload} = action
    switch (type) {

        case InvoiceCreatorActions.updateDescription:
            return {
                ...state, description: payload
            }

        case InvoiceCreatorActions.addEntry: {
            const existingOrder = state.orders[payload.id]

            if (existingOrder) {
                return {
                    ...state,
                    orders: {
                        ...state.orders,
                        [payload.id]: {
                            ...existingOrder,
                            quantity: existingOrder.quantity + 1
                        }
                    }
                }
            }


            return {
                ...state,
                orders: {
                    ...state.orders,
                    [payload.id]: {
                        quantity: 1,
                        name: payload.name,
                        id: payload.id
                    }
                }
            }
        }

        case InvoiceCreatorActions.removeEntry: {
            const existingOrder = {...state.orders[payload.id]}
            existingOrder.quantity -= 1
            if (existingOrder.quantity === 0) {
                const {[payload.id]: toRemove, ...newOrders} = state.orders
                return {
                    ...state,
                    orders: newOrders
                }
            }

            return {
                ...state,
                orders: {
                    ...state.orders,
                    [existingOrder.id]: existingOrder
                }
            }

        }

        case InvoiceCreatorActions.resetState:
            return getInvoiceInitialState()

        case InvoiceCreatorActions.resetOrders:
            return {
                ...state,
                orders:{}
            }

    }
}

export const getInvoiceInitialState = () => (
    {
         description: '', orders: {}
    })