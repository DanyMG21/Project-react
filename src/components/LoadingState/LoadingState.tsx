import React from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
interface loadingStateProps {
    message: string;
}

const LoadingState: React.FC<loadingStateProps> = ({ message }) => {
    return (
        <Grid  container sx={{display:'flex', justifyContent:'center'}}>
            <Box sx={{ display: 'flex', alignItems:'center',flexDirection: 'column' }}>
                <h2>{message}</h2>
                <CircularProgress />
            </Box>
        </Grid>
    );
};
export default LoadingState;
