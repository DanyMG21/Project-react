import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Layout from '../../Layout';
import {clientListSelector} from '../../store/selectors/clients';
import {invoiceStateSelector} from '../../store/selectors/invoices';
import {
    clearInvoicesByUser,
    getInvoiceList,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getInvoicesByUser,
} from '../../store/actions/invoices';
import {ClientsActions} from '../../store/actions/clients';
import {
    Button,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {Visibility as VisibilityIcon} from '@mui/icons-material';

function Invoices() {
    const [idSelected, setIdSelected] = useState('');

    const state = useSelector(invoiceStateSelector);
    const clientList = useSelector(clientListSelector);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event: any) => {
        setIdSelected(event.target.value);
    };

    const onSearchByUser = async () => {
        console.log('click');
        // dispatch(getInvoicesByUser(idSelected));
    };

    const onClearFilter = () => {
        setIdSelected('');
        dispatch(clearInvoicesByUser());
    };

    const onDetail = (data: any) => {
        navigate(`/invoices/${data.id}`);
    };

    const fetchInvoices = () => {
        // @ts-ignore
        dispatch(getInvoiceList());
    };

    useEffect(() => {
        if (!clientList) {
            // @ts-ignore
            dispatch(ClientsActions.getClients());
        }
        fetchInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderListClients = () => {
        return state.list.data.map((data: any, i: any) => (
            <ListItem key={i}>
                <ListItemText primary={data.description}/>
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => onDetail(data)}
                    >
                        <VisibilityIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ));
    };

    const renderListClientsByUser = () => {
        if (state.filterList.data.length === 0) {
            return <div>There are no invoices for this Client</div>;
        }
        return state.filterList.data.map((data: any, i: any) => (
            <ListItem key={i}>
                <ListItemText primary={data.description}/>
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => onDetail(data)}
                    >
                        <VisibilityIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ));
    };

    return (
        <Layout>
            <Grid item xs={12} md={12}>
                <Typography variant="h4" gutterBottom>
                    Invoice List
                </Typography>
                <div>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                style={{width: '100%'}}
                                value={idSelected}
                                onChange={handleChange}
                            >
                                {clientList &&
                                    clientList.map((client, i) => (
                                        <MenuItem key={i} value={client.id}>
                                            {client.firstName} {client.lastName}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={onSearchByUser}
                                variant="contained"
                                color="primary"
                            >
                                Search
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={onClearFilter} variant="contained">
                                Clean
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <br/>
                <br/>
                <Divider/>
                <br/>
                <br/>
                <div>
                    <List dense={false}>
                        {(state.list.loading || state.filterList.loading) && (
                            <CircularProgress color="inherit"/>
                        )}
                        {state.list.data &&
                            state.filterList.data === null &&
                            renderListClients()}
                        {state.filterList.data !== null &&
                            renderListClientsByUser()}
                    </List>
                </div>
            </Grid>
        </Layout>
    );
}

export default Invoices;
