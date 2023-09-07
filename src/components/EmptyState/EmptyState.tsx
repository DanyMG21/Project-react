import React from 'react';
import { Box, Grid } from '@mui/material';
import PortableWifiOffIcon from '@mui/icons-material/PortableWifiOff';
interface loadingStateProps {
    message: string;
}

const EmptyState: React.FC<loadingStateProps> = ({ message }) => {
    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <h1>{message}</h1>
                <PortableWifiOffIcon sx={{ fontSize: 80 }} />
            </Box>
        </Grid>
    );
};
export default EmptyState;
