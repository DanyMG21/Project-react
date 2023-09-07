import {useEffect, useMemo, useReducer, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clientListSelector, clientsMapSelector} from '../../store/selectors/clients';
import {plateListSelector, platesMapSelector} from '../../store/selectors/plates';

//import {invoicesUrl} from '../../constants/endpoints';

import Layout from '../../Layout';
import {ClientsActions} from '../../store/actions/clients';
import {PlatesActions} from '../../store/actions/plates';
//import httpClient from '../../services/httpClient';
import {Button, Grid, IconButton, MenuItem, Paper, Select, TextField} from '@mui/material';
import {
    RemoveCircle as RemoveCircleIcon,
    AddCircle as AddCircleOutlineIcon,
} from '@mui/icons-material';
import {getInvoiceInitialState, invoiceCreateReducer, InvoiceCreatorActions} from "./invoiceCreateReducer";
import {Client} from "../../types/Client";
import {Plate} from "../../types/Plate";
import {useInvoiceCreate} from "../../hooks/invoiceCreate";

function InvoiceCreate() {
    const [client, setClient] = useState<Client>();
    const [plate, setPlate] = useState<Plate>();
    const [description,setDescription] = useState("");
    const [state, localDispatch] = useReducer(invoiceCreateReducer, getInvoiceInitialState())
    const {orders:orderMap} = state
    const orders = useMemo(()=>{
        return Object.values(orderMap) as any
    },[orderMap])
    const clientList = useSelector(clientListSelector);
    const plateList = useSelector(plateListSelector);
    const platesMap=useSelector(platesMapSelector)
    const clientsMap=useSelector(clientsMapSelector)

    const {createNewInvoice}= useInvoiceCreate()

    const dispatch = useDispatch();

    useEffect(() => {
        if (!clientList) { // @ts-ignore
            dispatch(ClientsActions.getClients());
        }
        if (!plateList) { // @ts-ignore
            dispatch(PlatesActions.getPlates());
        }
    }, );


    const onNewInvoice = async () => {
        function transformOrders() {
            return orders.map((p) => {
                return {
                    key: p.id,
                    quantity: p.quantity,
                    plate: {
                        id: p.id,
                    },
                    
                };
            });
        }

        try {
            const payload = {
                description:description,
                client: {
                    id: client.id,
                },
                items: transformOrders(),
            };
            createNewInvoice(payload)
            localDispatch({type: InvoiceCreatorActions.resetState})
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectCustomer = (event: any) => {
        setClient(clientsMap[event.target.value]);
        setPlate(undefined);
        localDispatch({type: InvoiceCreatorActions.resetOrders})
    };

    const handleSelectPlate = (event: any) => {
        setPlate(platesMap[event.target.value]);
    };

    /*const onChangeDescription = (event: any) => {
        localDispatch({type: InvoiceCreatorActions.updateDescription})
    };*/



    const renderOrders = () => {
        return (
            <div className="tablePedidos">
                <div className="tableOrders__head">
                    <div className="tableOrders__head--item">Plate</div>
                    <div className="tableOrders__head--item">Quantity</div>
                    <div className="tableOrders__head--item">action</div>
                </div>
                <div className="tableOrders__body">
                    {orders.map((order) => (
                        <div className="tableOrders__body--row" key={order.id}>
                            <div className="tableOrders__body--col">
                                {order.name}
                            </div>
                            <div className="tableOrders__body--col">
                                {order.quantity}
                            </div>
                            <div className="tableOrders__body--col">
                                <IconButton
                                    color="inherit"
                                    onClick={() => localDispatch({
                                        type: InvoiceCreatorActions.removeEntry,
                                        payload: order
                                    })}
                                >
                                    <RemoveCircleIcon/>
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <Layout>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TextField
                        id="description"
                        label="Description"
                        multiline
                        fullWidth
                        rows={1}
                        margin="normal"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>
            </Grid>
            <br/>
            <br/>
            <br/>
            <br/>

            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Select
                        id="client"
                        style={{width: '100%'}}
                        //value={client || ''}
                        defaultValue="Initial value"
                        onChange={handleSelectCustomer}
                    >
                        {clientList &&
                            clientList.map((client) => (
                                <MenuItem value={client.id} key={client.id}>
                                    {client.firstName} {client.lastName}
                                </MenuItem>
                            ))}
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <Select
                        id="plate"
                        style={{width: '100%'}}
                       // value={plate || ''}
                       defaultValue="Initial value"
                        onChange={handleSelectPlate}
                    >
                        {plateList &&
                            plateList.map((plate) => (
                                <MenuItem key={plate.id} value={plate.id}>
                                    {plate.name}
                                </MenuItem>
                            ))}
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <IconButton
                        color="inherit"
                        onClick={() => localDispatch(
                            {
                                type: InvoiceCreatorActions.addEntry,
                                payload: plate
                            }
                        )}>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            <br/>
            <br/>
            <br/>
            <br/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <div style={{padding: '15px'}}>
                            {orders.length === 0 && (
                                <div>
                                    You haven't add any plate to your order yet
                                </div>
                            )}
                            {orders.length > 0 && renderOrders()}
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <br/>
                    <br/>
                    <Button
                        fullWidth
                        onClick={onNewInvoice}
                        variant="contained"
                        color="primary"
                    >
                        Create Invoice
                    </Button>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default InvoiceCreate;
