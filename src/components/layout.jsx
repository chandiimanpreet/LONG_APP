import SubLayout from './subLayout'
import React, { useEffect, useState, Fragment } from 'react'
import { DragDropContext } from '@hello-pangea/dnd';
import {
    Backdrop, Button, Modal, Fade, Typography, Avatar, AvatarGroup, Select, TextField, InputLabel, FormControl, Box, MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { moveTicket } from '../backend/api/tickets';

function Layout({ theme, userData, boardData }) {
    console.log(boardData);

    const [ready, setReady] = useState(false);

    const [data, setData] = useState({
        name: '',
        email: '',
        permission: '',
    });

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
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    }
    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        boxShadow: 10,
        bgcolor: 'background.paper',
        p: 6,
    };

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
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
                <Button sx={{ margin: '2rem 2rem 2rem 0', }} onClick={openModal} > <AddIcon /> Add member</Button>
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
                )}

            {
                open && (
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={closeModal}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant='h5' >Add Member</Typography>
                                    <TextField required
                                        id="outlined-controlled"
                                        label="Name"
                                        value={data.name}
                                        onChange={dataHandler}
                                        sx={{ marginBottom: '1rem', marginTop: '1rem' }}
                                    />
                                    <TextField required
                                        id="outlined-controlled"
                                        label="Email"
                                        value={data.email}
                                        onChange={dataHandler}
                                        sx={{ marginBottom: '1rem' }}
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel required id="demo-simple-select-label">Permission</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={data.permission}
                                            label="Permission"
                                            onChange={dataHandler}
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
                )

            }

        </div >


    )
}

export default Layout