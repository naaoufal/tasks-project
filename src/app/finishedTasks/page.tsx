"use client";
import NavBarComponent from '@/components/Navbar';
import 'dotenv/config'
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
import { AppBar, Toolbar, IconButton, FormControl, Alert, Select, MenuItem, SelectChangeEvent, InputLabel } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FinishedTasks() {

    const [data, setData] = useState([]);
    const router = useRouter();

    // fetch all tasks
    const fetchData = async () => {
        await fetch('http://localhost:3030/tasks?status=Completed')
            .then((res) => res.json())
            .then((items) => {
                setData(items);
            });
    };

    // delete task from list :
    const handleDelete = (id: any) => {
        // console.log("ID", id);
        fetch(`http://localhost:3030/tasks/${id}`, {
            method: 'DELETE',
        });
        fetchData();
    };

    // fetch data when component mounted
    useEffect(() => { 
        fetchData(); 
    }, []);

    return(
        <div>
            <NavBarComponent />
            <div style={{
                paddingTop: 20,
                margin: 20,
                // marginBottom: 30,
            }}>
                <div style={{
                    marginBottom: 30,
                }}>
                    <Grid container justifyContent="flex-end">
                        <Button 
                             variant="outlined" 
                             color="primary"
                            onClick={() => router.push("/")}
                        >My Home</Button>
                    </Grid>
                    {/* <Button onClick={() => router.push("/")}>Finished Tasks</Button> */}
                </div>
            </div>
            <div style={{
                paddingTop: 20,
                margin: 20,
            }}>
                <Box sx={{ flexGrow: 1 }} >
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {data && data?.map((item: any) => (
                            <Grid item xs={4} md={4} key={item?.id}>
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {item?.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            {item?.desc}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {/* <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={() => {
                                            setObjModify(item);
                                            setOpenPatch(true);
                                        }}>
                                            Edit
                                        </Button> */}
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
        </div>
    );
};