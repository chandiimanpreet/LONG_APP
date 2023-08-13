import React, { useState } from 'react';
import {
    Backdrop, Box, Modal, Fade, Typography, Avatar, Select, TextField, InputLabel, MenuItem, FormControl, Button
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const MyModal = ({ open, data, theme, openModal, closeModal, onTextAreaKeyPress, getModalDataFromModal }) => {

    const assignees = ['Manpreet Singh', 'Gautam Kumar', 'Roshan Singh', 'Somnath Das', 'Pranav Rastagi', 'Rahul Shah',
        'Arshdeep Singh', 'Priyanshu Maikhuri', 'Raj Kumar', 'Aakash Kshyap', 'Himalay Das', 'Chaavi Jain', 'Komal Bairwa'];

    const reporters = ['Pranav Rastagi', 'Rahul Shah', 'Himalay Das'];

    const [modalData, setmodalData] = useState({
        text: '',
        assigneeName: '',
        reporterName: '',
        description: '',
    });


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
        boxShadow: theme === 'dark' ? '0 0 0 1px rgba(9, 30, 66, 0.08), 0 2px 1px rgba(9, 30, 66, 0.08), 0 0 20px -6px rgba(9, 30, 66, 0.31)' : '20px 20px 60px #b6b6b6, -20px -20px 60px #f6f6f6',
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
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <Modal open={open} onClose={closeModal} closeAfterTransition
            slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500, }, }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <textarea className="border-gray-300 bg-[#cfcfcf] dark:bg-[#282E33] rounded focus:ring-purple-400 w-1/2 text-3xl font-semibold"
                            name='text'
                            value={data.title !== '' ? data.title : modalData.text}
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
                                <Typography>Created  </Typography>
                                <br />
                                <Typography>Updated </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <Box sx={{ display: 'flex', marginBottom: '15px' }}>
                                <Typography sx={{ margin: '1rem 4rem' }} >Assignee</Typography>
                                <Box sx={{ minWidth: 240 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="assigneeID">Assignee</InputLabel>
                                        <Select
                                            SelectDisplayProps={{ style: { display: 'flex' } }}
                                            sx={textFieldStyle}
                                            labelId="assigneeID"
                                            id="demo"
                                            name='assigneeName'
                                            value={modalData.assigneeName}
                                            label="Assignee"
                                            onChange={dataHandler}
                                            MenuProps={{ style: { maxHeight: '60vh', maxWidth: '16vw' } }}
                                        >
                                            {assignees.map((name, idx) => (
                                                <MenuItem key={idx} value={name}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Avatar {...stringAvatar(name)} />
                                                        <Typography marginLeft={1}>{name}</Typography>
                                                    </div>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', }}>
                                <Typography sx={{ margin: '1rem 4rem' }} >Reporter</Typography>
                                <Box sx={{ minWidth: 240 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="reporterID">Reporter</InputLabel>
                                        <Select
                                            SelectDisplayProps={{ style: { display: 'flex' } }}
                                            sx={textFieldStyle}
                                            labelId="reporterID"
                                            id="simple"
                                            name='reporterName'
                                            value={modalData.reporterName}
                                            label="Reporter"
                                            onChange={dataHandler}
                                            MenuProps={{ style: { maxHeight: '60vh', maxWidth: '16vw' } }}
                                        >
                                            {reporters.map((name, idx) => (
                                                <MenuItem key={idx} value={name}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Avatar {...stringAvatar(name)} />
                                                        <Typography marginLeft={1}>{name}</Typography>
                                                    </div>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                                <Button onClick={closeModal} variant='outlined' color='error' sx={{
                                    marginRight: '1rem',
                                    fontWeight: 'bold',
                                    borderWidth: '2px',
                                }}>Cancel</Button>

                                <Button variant='outlined' color='success' onClick={() => {
                                    getModalDataFromModal(modalData);
                                    closeModal();
                                }} sx={{
                                    marginRight: '1rem',
                                    fontWeight: 'bold',
                                    borderWidth: '2px',
                                }}>
                                    {data.id !== undefined ? 'Save' : 'Create'}
                                </Button>
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default MyModal
