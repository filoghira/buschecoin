import React from 'react';
import { Grid, List, ListItem, IconButton,  ListItemAvatar, Avatar, ListItemText } from '@mui/material';

function generate(element) {

    let items = [0, 1, 2];

    return items.map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

export default function Marketplace() {
    return (
        <Grid
            container 
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
        </Grid>
    );
};
