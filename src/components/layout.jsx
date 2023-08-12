import SubLayout from './subLayout'
import React, { useEffect, useState } from 'react'
import BoardData from '../backend/boardData.json'; // Path to your generated JSON data file
import { DragDropContext } from '@hello-pangea/dnd';
import {
    Backdrop, Button, Modal, Fade, Typography, Avatar, Select, TextField, InputLabel, FormControl, Box, MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function Layout({ theme }) {

    const [ready, setReady] = useState(false);

    const [data, setData] = useState({
        name: '',
        email: '',
        permission: '',
    });

    const dataHandler = (e) => {
        setData({ [e.target.name]: e.target.value });
    }


    console.log(BoardData);
    const [boardData, setBoardData] = useState(BoardData);

    useEffect(() => {
        if (process.browser) {
            setReady(true);
        }
    }, []);


    const onDragEnd = (re) => {
        if (!re.destination) return;
        let newBoardData = boardData;
        var dragItem =
            newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
        newBoardData[parseInt(re.source.droppableId)].items.splice(
            re.source.index,
            1
        );
        newBoardData[parseInt(re.destination.droppableId)].items.splice(
            re.destination.index,
            0,
            dragItem
        );
        setBoardData(newBoardData);
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



    return (
        <div className="dark:bg-[#161a1d]">
            <Button sx={{ margin: '2rem', }} onClick={openModal} > <AddIcon /> Add member</Button>
            {ready && (
                <DragDropContext
                    onDragEnd={onDragEnd}
                >
                    <div className="w-full blend flex">
                        {boardData.map((board, bIndex) => {
                            return (
                                <SubLayout theme={theme} key={bIndex} board={board} bIndex={bIndex} />
                            );
                        })}
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
                                    <TextField
                                        id="outlined-controlled"
                                        label="Name"
                                        value={data.name}
                                        onChange={dataHandler}
                                        sx={{ marginBottom: '1rem',marginTop: '1rem' }}
                                    />
                                    <TextField
                                        id="outlined-controlled"
                                        label="Email"
                                        value={data.email}
                                        onChange={dataHandler}
                                        sx={{ marginBottom: '1rem' }}
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Permission</InputLabel>
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
                                <Button variant='contained' color='success'>Save</Button>
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