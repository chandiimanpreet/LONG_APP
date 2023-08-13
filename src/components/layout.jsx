import SubLayout from './subLayout'
import React, { useEffect, useState, Fragment } from 'react'
import { DragDropContext } from '@hello-pangea/dnd';
import {
    Backdrop, Button, Modal, Fade, Typography, Avatar, AvatarGroup, Select, TextField, InputLabel, FormControl, Box, MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { moveTicket } from '../backend/api/tickets';

function Layout({ theme, userData, boardData }) {

    const [ready, setReady] = useState(false);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        permission: '',
    });

    const openModal = () => { setOpen(true); }
    const closeModal = () => { setOpen(false); }

    const dataHandler = (e) => {
        setData({ [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (process.browser) {
            setReady(true);
        }
    }, []);

    const onDragEnd = async (re) => {
        if (!re.destination) return;
        await moveTicket(re.source.droppableId, re.source.index, re.destination.droppableId, re.destination.index, boardData.boardName, boardData);
        // setBoardData(newBoardData);
    };

    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '20px',
        width: 600,
        p: 6,
        color: theme === 'dark' ? 'white' : 'black',
        background: theme === 'dark' ? 'linear-gradient(145deg, #1e2329, #232a30)' : 'linear-gradient(145deg, #c1c1c1, #e5e5e5)',
        boxShadow: theme === 'dark' ? '20px 20px 60px #3e3e3e, -20px -20px 60px #9e9e9e' : '20px 20px 60px #b6b6b6, -20px -20px 60px #f6f6f6',
    };

    const textFieldStyle = {
        color: theme === 'dark' ? 'white' : 'black', // Text color
        '& .MuiInputLabel-root': {
            color: theme === 'dark' ? 'white' : 'black', // Label color
        },
        '& .MuiInputBase-input': {
            color: theme === 'dark' ? 'white' : 'black', // Input text color
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme === 'dark' ? 'white' : 'black', // Border color
        },
        '& .MuiInputBase-input.Mui-disabled': {
            color: theme === 'dark' ? 'white' : 'black', // Disabled input text color
        },
    };

    const stringToColor = (string) => {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    const stringAvatar = (name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }


    if (userData.boards.length === 0) {
        return (
            <Fragment>
                <div className='mt-80 ml-96'>
                    <button className='text-xl font-semibold bg-slate-300 rounded-lg h-12 w-48'>Create your board</button>
                </div>
            </Fragment>
        )
    }

    return (
        <div className="dark:bg-[#161a1d]">

            <Box sx={{ display: 'flex', }}>
                <AvatarGroup total={11} sx={{ marginTop: '2rem', marginLeft: '2rem' }}>
                    <Avatar sx={{ width: '5px !important', height: '5px !important' }} {...stringAvatar('Manpreet Singh')} />
                    <Avatar sx={{ width: '5px !important', height: '5px !important' }} {...stringAvatar('Roshan Singh')} />
                    <Avatar sx={{ width: '5px !important', height: '5px !important' }} {...stringAvatar('Arshdeep Singh')} />
                </AvatarGroup>
                <Button sx={{ margin: '2rem 2rem 2rem 0', fontWeight: 'bold' }} onClick={openModal} > <AddIcon /> Add member</Button>
            </Box>

            {
                ready && (
                    <DragDropContext
                        onDragEnd={onDragEnd}
                    >
                        <div className="w-full blend flex">
                            {
                                boardData.ticketsEntity.map((board, bIndex) => {
                                    return (
                                        <SubLayout theme={theme} key={bIndex} board={board} bIndex={bIndex} />
                                    );
                                })
                            }
                        </div>
                    </DragDropContext>
                )
            }

            <Modal
                open={open}
                onClose={closeModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500, }, }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant='h5' >Add Member</Typography>
                            <TextField required id="outlined-controlled" label="Name" value={data.name}
                                onChange={dataHandler} sx={{ marginBottom: '1rem', marginTop: '1rem' }}
                            />
                            <TextField required id="outlined-controlled" label="Email" value={data.email}
                                onChange={dataHandler} sx={{ marginBottom: '1rem' }}
                            />
                            <FormControl fullWidth>
                                <InputLabel required id="demo-simple-select-label">Permission</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={dataHandler}
                                    value={data.permission} label="Permission"
                                >
                                    <MenuItem value={'Owner'}>Owner</MenuItem>
                                    <MenuItem value={'Editor'}>Editor</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '2rem' }}>
                            <Button onClick={closeModal} variant='contained' color='error'>Cancel</Button>
                            <Button variant='contained' color='success'>Add</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default Layout