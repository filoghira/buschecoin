import React from 'react';
import { Grid, Avatar, TextField, Stack } from '@mui/material';

export default function Home() {
    return (
        <Grid
            container 
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} justifyContent="center">
                <Stack direction="row" justifyContent="center">
                    <Avatar alt="test" src="" sx={{width: 150, height: 150}}/>
                </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Stack direction="row" justifyContent="center">
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Username"
                        defaultValue="usertonto"
                    />
                </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Stack direction="row" justifyContent="center" spacing={2}>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Nome"
                        defaultValue="nome"
                    />
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Cognome"
                        defaultValue="cognome"
                    />
                </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Stack direction="row" justifyContent="center" spacing={2}>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Email"
                        defaultValue="nome.cognome@pippo.com"
                    />
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Classe"
                        defaultValue="6AIN"
                    />
                </Stack>
            </Grid>
        </Grid>
    );
};
