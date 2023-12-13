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
    Drawer
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavBarComponent = () => {

    // const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        // setOpen(true);
    };

    return(
        <>
            {/* Nav bar header */}
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {/* Drawer section */}
        </>
    );
};

export default NavBarComponent;