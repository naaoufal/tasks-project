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
import ReactGA from "react-ga4";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 34,
    p: 4,
};


export default function Home() {

    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [openPatch, setOpenPatch] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showErrorPatch, setShowErrorPatch] = useState(false);
    const [data, setData] = useState([]);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setShowError(false);
    };

    const handleOpenPatch = () => setOpenPatch(true);
    const handleClosePatch = () => {
        setOpenPatch(false);
        setShowErrorPatch(false);
    };

    const [objModify, setObjModify] = useState({});

    // console.log("routers", router);

    // handle google events :
    const handleClickGoogle = () => {
        ReactGA.event({
            'action': 'handle submit',
            'category': 'submit',
            'label': 'label'
        });
    };

    // handle firebase clicks :
    const handleBoxClick = async () => {
        console.log('this is message');
    };

    // fetch all tasks
    const fetchData = async () => {
        await fetch('http://localhost:3030/tasks?status=Pending')
            .then((res) => res.json())
            .then((items) => {
                setData(items);
            });
    };

    // add new task to list
    const handleAdd = async () => {
        // console.log("function start", title, desc);
        if(title && desc !== '') {
            setShowError(false);
            await fetch('http://localhost:3030/tasks', {
                method: 'POST',
                body: JSON.stringify({
                    id: Math.random()*1000000000,
                    title: title,
                    desc: desc,
                    status: "Pending" // default value is Pending after well change with completed
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then((res) => res.json())
            .then((data) => console.log("response for data", data));
            // load data after adding new entities :
            fetchData();
            // clear filed for title and desc state :
            setDesc(''); 
            setTitle('');
            // close modal if all is good :
            setOpen(false);
        } else {
            setShowError(true);
        }
    };

    // delete task from list :
    const handleDelete = (id: any) => {
        // console.log("ID", id);
        fetch(`http://localhost:3030/tasks/${id}`, {
            method: 'DELETE',
        });
        fetchData();
    };

    // patch task from list :
    const handleEdit = async (item: any) => {
        console.log("new values", objModify, title, desc, stat);
        if(title && desc && stat !== '') {
            setShowError(false);
            await fetch(`http://localhost:3030/tasks/${item?.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    // id: Math.random()*1000000000,
                    title: title,
                    desc: desc,
                    status: stat // default value is Pending after well change with completed
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then((res) => res.json())
            .then((data) => console.log("response for data", data));
            // load data after adding new entities :
            fetchData();
            // clear filed for title and desc state :
            setDesc(''); 
            setTitle('');
            // close modal if all is good :
            setOpenPatch(false);
            setShowErrorPatch(false);
        } else {
            setShowErrorPatch(true);
        }
    };

    // handle change for select :
    const [stat, setStat] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setStat(event.target.value as string);
      };

    // const [items, setItems] = useState([]);

    // fetch data when component mounted
    useEffect(() => { 
        fetchData(); 
    }, []);

    return(
        <div>
            <NavBarComponent />
            {/* body content */}
            <div style={{
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
                            onClick={handleOpen}
                        >Add new task</Button>
                        <Button variant='outlined' color='secondary' onClick={handleClickGoogle}>Test google</Button>
                    </Grid>
                    <Button onClick={() => router.push("/finishedTasks")}>Finished Tasks</Button>
                </div>
                {/* modal for add new task */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: "center" }}>
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
                                paddingTop: 20,
                            }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="full-width-text-field"
                                        label="Task title"
                                        multiline
                                        onChange={event => setTitle(event.target.value)}
                                        style={{
                                            width: "100%"
                                        }}
                                    />
                                    <TextField
                                        id="full-width-text-field"
                                        label="Task Description"
                                        multiline
                                        onChange={event => setDesc(event.target.value)}
                                        style={{
                                            width: "100%"
                                        }}
                                    />
                                    <div style={{
                                        paddingTop: 10,
                                        paddingBottom: 20,
                                    }}>
                                        {showError 
                                            ? <Alert severity="error">Please enter the title & description</Alert>
                                            : null
                                        }
                                    </div>
                                    <Grid container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <Grid item>
                                            <Button variant="outlined" color="primary" onClick={handleAdd}>
                                                Add
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="outlined" onClick={handleClose}>
                                                Close
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </div>
                        </Box>
                    </Box>
                </Modal>
                {/* modal section end */}
                {/* modal for patch task */}
                <Modal
                    open={openPatch}
                    onClose={handleClosePatch}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: "center" }}>
                        Edit task
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
                                paddingTop: 20,
                            }}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="full-width-text-field"
                                        label="Task title"
                                        // multiline
                                        onChange={event => setTitle(event.target.value)}
                                        style={{
                                            width: "100%"
                                        }}
                                        // defaultValue={objModify?.title}
                                    />
                                    <TextField
                                        id="full-width-text-field"
                                        label="Task Description"
                                        // multiline
                                        onChange={event => setDesc(event.target.value)}
                                        style={{
                                            width: "100%"
                                        }}
                                        // defaultValue={objModify?.desc}
                                    />
                                    <Box component="form" style={{ marginLeft: 7 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={stat}
                                                label="Status"
                                                onChange={handleChange}
                                                style={{
                                                    // width: "1%"
                                                }}
                                            >
                                                {/* <MenuItem value="">Select task status</MenuItem> */}
                                                <MenuItem value="Pending">Pending</MenuItem>
                                                <MenuItem value="Completed">Completed</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <div style={{
                                        paddingTop: 10,
                                        paddingBottom: 20,
                                    }}>
                                        {showErrorPatch
                                            ? <Alert severity="error">Please enter the title & description && status</Alert>
                                            : null
                                        }
                                    </div>
                                    <Grid container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <Grid item>
                                            <Button variant="outlined" color="primary" onClick={() => handleEdit(objModify)}>
                                                Edit
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="outlined" onClick={handleClosePatch}>
                                                Close
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </div>
                        </Box>
                    </Box>
                </Modal>
                {/* modal section end */}
                <Box sx={{ flexGrow: 1 }} >
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {data && data?.map((item: any) => (
                            <Box onClick={handleBoxClick}>
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
                                            <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={() => {
                                                setObjModify(item);
                                                setOpenPatch(true);
                                            }}>
                                                Edit
                                            </Button>
                                            <Button variant="outlined" color="error" onClick={() => handleDelete(item?.id)} startIcon={<DeleteIcon />}>
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Box>
                        ))}
                    </Grid>
                </Box>
            </div>
        </div>
    );
};