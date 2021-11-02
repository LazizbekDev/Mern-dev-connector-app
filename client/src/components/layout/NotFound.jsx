import React from 'react';
import {Container, Paper, Typography} from "@mui/material";

const NotFound = () => {
    const bodyStyle = {
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'grid',
        placeItems: 'center',
        background: 'rgba(0,0,0,0.74)'
    }
    return (
        <div style={bodyStyle}>
            <Container component={Paper} style={{display: 'grid', placeItems: 'center'}}>
                <Typography variant={'h2'} style={{ color: 'crimson' }}>404 Page Not Found :(</Typography>
            </Container>
        </div>
    );
};

export default NotFound;