import * as React from 'react';
import {
    AppBar,
    Accordion,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    Toolbar,
    IconButton,
    Drawer,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import MenuIcon from '@mui/icons-material/Menu';

const NavBarComponent = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <>
            {/* Nav bar header */}
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton> */}
                </Toolbar>
            </AppBar>
            {/* Drawer section */}
        </>
    );
};

export default NavBarComponent;