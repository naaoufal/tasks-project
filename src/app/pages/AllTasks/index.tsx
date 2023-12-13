"use client";
import NavBarComponent from '@/components/Navbar';
// import {
//     AppBar,
//     Accordion,
//     Card,
//     CardContent,
//     Typography,
//     CardActions,
//     Button,
// } from '@mui/material';
import { TabContext } from '@mui/lab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
// import Button from "@material-ui/core/Button";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { AppBar, Toolbar, IconButton, FormControl } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';

const DATA = [
    {id: 1, name: "task-1", desc: "description task", status: "Pending"},
    {id: 2, name: "task-2", desc: "description task", status: "Pending"},
    {id: 3, name: "task-3", desc: "description task", status: "Completed"},
    {id: 4, name: "task-4", desc: "description task", status: "Pending"},
    {id: 5, name: "task-5", desc: "description task", status: "Pending"},
    {id: 6, name: "task-5", desc: "description task", status: "Pending"},
    {id: 7, name: "task-5", desc: "description task", status: "Completed"},
];


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// async function getData() {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
//     // The return value is *not* serialized
//     // You can return Date, Map, Set, etc.
   
//     if (!res.ok) {
//       // This will activate the closest `error.js` Error Boundary
//       throw new Error('Failed to fetch data');
//     }
   
//     return res.json()
//   }

export default function AllTasks() {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const fetchData = () => {
    //     fetch("https://jsonplaceholder.typicode.com/posts/1")
    //         .then((res) => res.json())
    //         .then((data) => {
                // console.log(data);
    //     })
    // };

    // const staticData = await fetch(`https://jsonplaceholder.typicode.com/posts/1`, { cache: 'no-store' })

    // useEffect(() => {
    //     fetch('https://jsonplaceholder.typicode.com/posts/1')
    //     .then((res) => res.json())
    //     .then((data) => {
            // console.log(staticData);
    //         setData(data);
    //         // setLoading(false)
    //     })
    // }, []);

    console.log("allTasks", data);

    const fetchData = async () => {
        await fetch('http://localhost:3030/tasks')
            .then((res) => res.json())
            .then((items) => {
                setData(items);
            });
    };

    const handleAdd = async () => {
        console.log("function start");
        await fetch('http://localhost:3030/tasks', {
            method: 'POST',
            body: JSON.stringify({
                id: 4,
                title: "task 3",
                desc: "this is description for tast",
                status: "Pending"
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((res) => res.json())
        .then((data) => console.log("response for data", data));
        fetchData();
    };

    const handleDelete = (id: any) => {
        console.log("ID", id);
        fetch(`http://localhost:3030/tasks/${id}`, {
            method: 'DELETE',
        });
        fetchData();
    };

    // const [items, setItems] = useState([]);

    useEffect(() => { fetchData() }, []);

    return(
        <div>
            <NavBarComponent />
            {/* body content */}
            <div style={{
                // backgroundColor: "red",
                paddingTop: 20,
                margin: 20,
            }}>
                <div style={{
                    marginBottom: 30,
                }}>
                    <Grid container justifyContent="flex-end">
                        <Button 
                             variant="outlined" 
                             color="primary"
                            // onClick={handleAdd}
                            onClick={handleOpen}
                        >Add new task</Button>
                    </Grid>
                </div>
                {/* modal section start */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new task
                    </Typography>
                    <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                        <div style={{
                            // width: "100%",
                        }}>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Task title"
                                    multiline
                                    maxRows={6}
                                />
                                <TextField
                                    id="full-width-text-field"
                                    label="Task Description"
                                    multiline
                                    // maxRows={6}
                                    fullWidth
                                />
                                <Button variant="outlined" color="success">
                                    Add
                                </Button>
                            </FormControl>
                        </div>
                    </Box>
                    </Box>
                </Modal>
                {/* modal section end */}
                <Box sx={{ flexGrow: 1 }} >
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {data && data?.map((item: any) => (
                            <Grid item xs={4} md={4} key={item?.id}>
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {item?.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            {item?.desc}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="outlined" color="primary" startIcon={<EditIcon />}>
                                            Edit
                                        </Button>
                                        <Button variant="outlined" color="error" onClick={() => handleDelete(item?.id)} startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </div>
            {/* <Box sx={{ width: '90%', bgcolor: 'background.paper' }}>
                <nav>
                    <List>
                        {DATA && DATA.map((item: any) => (
                            <div style={{
                                backgroundColor: "red",
                            }}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={item?.name} />
                                    </ListItemButton>
                                </ListItem>
                            </div>
                        ))}
                    </List>
                </nav>
            </Box> */}
        </div>
    );
};