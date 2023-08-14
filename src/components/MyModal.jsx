import React, { useEffect, useState } from 'react';
import {
    Backdrop, Box, Modal, Fade, Typography, Avatar, Select, TextField, InputLabel, MenuItem, FormControl, Button
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { ModalPulse } from './Pulse'
import { getTicket } from '../backend/api/tickets';
const MyModal = ({ boardData, open, id, theme, closeModal, getModalDataFromModal }) => {
    const [loading, setLoading] = useState(id !== 0 ? true : false);
    const [ticketInfo, setTicketInfo] = useState(null);
    const [modalData, setmodalData] = useState({
        title: '',
        assignee: '',
        reporter: '',
        description: '',
        priority: 0,
    });

    console.log(ticketInfo);
    const dataHandler = (e) => {
        setmodalData({ ...modalData, [e.target.name]: e.target.value })
    };

    const style = {
        position: 'absolute',
        borderRadius: '20px',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1200',
        padding: '2rem',
        color: theme === 'dark' ? 'white' : 'black',
        background: theme === 'dark' ? 'linear-gradient(145deg, #282E33, #282E33)' : 'linear-gradient(145deg, #c1c1c1, #e5e5e5)',
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

    const stringAvatar = (name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0].toUpperCase()}${name.split(' ').length > 1 ? name.split(' ')[1][0].toUpperCase() : ''}`,
        };
    }
    const getTicketData = async () => {
        const res = await getTicket(id, boardData.boardName);
        setmodalData({ title: res.title, assignee: res.assignee, priority: res.priority, description: res.description, reporter: res.reporter });
        setTicketInfo({ createdAt: res.createdAt, createdBy: res.createdBy });
        setLoading(false);
    }
    useEffect(() => {
        if (loading) {
            getTicketData();
        }
    }, [loading])
    return (
        <Modal open={open} onClose={closeModal} closeAfterTransition
            slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500, }, }}
        >
            <Fade in={open}>
                <Box component='form' onSubmit={(e) => {
                    e.preventDefault();
                    getModalDataFromModal(modalData);
                    closeModal();
                }} sx={style}>
                    {loading ?
                        <ModalPulse /> : <>
                            {id > 0 &&
                                <Box sx={{ display: 'flex',marginBottom:'1rem'}}>
                                    <Typography sx={{display:'inline-flex'}}><Avatar {...stringAvatar((boardData.owner[ticketInfo.createdBy] === undefined ? boardData.member[ticketInfo.createdBy] : boardData.owner[ticketInfo.createdBy]))} />{(boardData.owner[ticketInfo.createdBy] === undefined ? boardData.member[ticketInfo.createdBy] : boardData.owner[ticketInfo.createdBy])}</Typography>
                                    <Typography ml={2}>EG-{id}</Typography>
                                </Box>
                            }
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <textarea required className="border-gray-300 bg-[#cfcfcf] dark:bg-[#282E33] rounded focus:ring-purple-400 w-1/2 text-3xl font-semibold"
                                    name='title'
                                    value={modalData.title}
                                    onChange={dataHandler} placeholder='Ticket Name' />

                                <ClearIcon onClick={closeModal} sx={{ cursor: 'pointer' }} />
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ marginTop: '1rem' }}>
                                        <TextField sx={textFieldStyle} className="border-gray-300 rounded focus:ring-purple-400 w-96 "
                                            rows={3} placeholder="Add a description" name='description'
                                            value={modalData.description}
                                            onChange={dataHandler} />
                                    </Box>
                                    <Box sx={{ marginTop: '2rem', }}>
                                        {id > 0 && <Typography>Created At :- {new Date(ticketInfo.createdAt.seconds * 1000).toDateString() + " " + new Date(ticketInfo.createdAt.seconds * 1000).toLocaleTimeString()}</Typography>}
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                    <Box sx={{ display: 'flex', marginBottom: '15px' }}>
                                        <Typography sx={{ margin: '1rem 3.85rem' }} >Assignee</Typography>
                                        <Box sx={{ minWidth: '15rem' }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="assigneeID">Assignee</InputLabel>
                                                <Select
                                                    required
                                                    SelectDisplayProps={{ style: { display: 'flex' } }}
                                                    sx={textFieldStyle}
                                                    labelId="assigneeID"
                                                    id="demo"
                                                    name='assignee'
                                                    value={modalData.assignee}
                                                    label="Assignee"
                                                    onChange={dataHandler}
                                                    MenuProps={{ style: { maxHeight: '60vh', maxWidth: '16vw' } }}
                                                >
                                                    {
                                                        Object.keys(boardData.member).length > 0 && Object.keys(boardData.member).map((ele, idx) => (
                                                            <MenuItem key={idx} value={ele}>
                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <Avatar {...stringAvatar(boardData.member[ele])} />
                                                                    <Typography marginLeft={1}>{boardData.member[ele]}</Typography>
                                                                </div>
                                                            </MenuItem>
                                                        ))
                                                    }
                                                    {
                                                        Object.keys(boardData.owner).length > 0 && Object.keys(boardData.owner).map((ele, idx) => (
                                                            <MenuItem key={idx} value={ele}>
                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <Avatar {...stringAvatar(boardData.owner[ele])} />
                                                                    <Typography marginLeft={1}>{boardData.owner[ele]}</Typography>
                                                                </div>
                                                            </MenuItem>
                                                        ))
                                                    }
                                                </Select >
                                            </FormControl >
                                        </Box >
                                    </Box >
                                    <Box sx={{ display: 'flex', }}>
                                        <Typography sx={{ margin: '1rem 4rem' }} >Reporter</Typography>
                                        <Box sx={{ minWidth: '15rem' }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="reporterID">Reporter</InputLabel>
                                                <Select
                                                    required
                                                    SelectDisplayProps={{ style: { display: 'flex' } }}
                                                    sx={textFieldStyle}
                                                    labelId="reporterID"
                                                    id="simple"
                                                    name='reporter'
                                                    value={modalData.reporter}
                                                    label="Reporter"
                                                    onChange={dataHandler}
                                                    MenuProps={{ style: { maxHeight: '60vh', maxWidth: '16vw' } }}
                                                >
                                                    {
                                                        Object.keys(boardData.owner).length > 0 && Object.keys(boardData.owner).map((ele, idx) => (
                                                            <MenuItem key={idx} value={ele}>
                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <Avatar {...stringAvatar(boardData.owner[ele])} />
                                                                    <Typography marginLeft={1}>{boardData.owner[ele]}</Typography>
                                                                </div>
                                                            </MenuItem>
                                                        ))
                                                    }
                                                </Select >
                                            </FormControl >

                                        </Box >
                                    </Box >

                                    <Box sx={{ display: 'flex', gap: '3rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                                        <Button type='button' onClick={closeModal} variant='contained' color='error'>Cancel</Button>

                                        <Button type='submit' variant='contained' color='success'>
                                            {id !== 0 ? 'Update' : 'Create'}
                                        </Button>
                                    </Box>

                                </Box >
                            </Box ></>
                    }
                </Box >
            </Fade >
        </Modal >
    )
}

export default MyModal
