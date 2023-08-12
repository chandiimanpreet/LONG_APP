import React, {  useState } from 'react';
import {
    Backdrop, Box, Modal, Fade, Typography, Avatar, Select, TextField, InputLabel, MenuItem, FormControl, Button
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const MyModal = ({ open, data, openModal, closeModal, onTextAreaKeyPress, getModalDataFromModal }) => {

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
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1200,
        boxShadow: 10,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        p: 4,
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
                        <textarea className="border-gray-300 rounded focus:ring-purple-400 w-1/2 text-3xl font-semibold"
                            name='text'
                            value={data.title !== '' ? data.title : modalData.text}
                            onChange={dataHandler} placeholder='Ticket Name' />

                        <ClearIcon onClick={closeModal} sx={{ cursor: 'pointer' }} />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ marginTop: '1rem' }}>
                                <Typography>Description</Typography>
                                <TextField className="border-gray-300 rounded focus:ring-purple-400 w-96 "
                                    rows={3} placeholder="Add a description" name='description'
                                    value={modalData.description}
                                    onChange={dataHandler} />
                            </Box>
                            <Box sx={{ marginTop: '2rem', }}>
                                <Typography>Created  </Typography>
                                <Typography>Updated </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <Box sx={{ display: 'flex', marginBottom: '15px' }}>
                                <Typography sx={{ marginRight: '8rem' }} >Assignee</Typography>
                                <Box sx={{ minWidth: 240 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="assigneeID">Assignee</InputLabel>
                                        <Select
                                            labelId="assigneeID"
                                            id="demo"
                                            name='assigneeName'
                                            value={modalData.assigneeName}
                                            label="Assignee"
                                            onChange={dataHandler}
                                            MenuProps={{ style: { maxHeight: '60vh', maxWidth: '16vw', }, }}

                                        >
                                            {
                                                assignees.map((name, idx) => (
                                                    <MenuItem key={idx} value={name} ><Avatar sx={{ width: 5, height: 5, display: 'inline' }} {...stringAvatar(name)} />
                                                        <Typography sx={{ marginLeft: '7px' }}>{name}</Typography>
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', }}>
                                <Typography sx={{ marginRight: '8rem' }} >Reporter</Typography>
                                <Box sx={{ minWidth: 240 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="reporterID">Reporter</InputLabel>
                                        <Select
                                            labelId="reporterID"
                                            id="simple"
                                            name='reporterName'
                                            value={modalData.reporterName}
                                            label="Reporter"
                                            onChange={dataHandler}
                                            MenuProps={{ style: { maxHeight: '60vh', maxWidth: '16vw', }, }}
                                        >
                                            {
                                                reporters.map((name, idx) => (
                                                    <MenuItem key={idx} value={name} ><Avatar sx={{ width: 5, height: 5, }} {...stringAvatar(name)} />
                                                        <Typography sx={{ marginLeft: '7px' }}>{name}</Typography>
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                                <Button onClick={closeModal} variant='outlined' color='error' sx={{ marginRight: '1rem' }}>Cancel</Button>
                                <Button variant='outlined' color='success' onClick={() => {
                                    getModalDataFromModal(modalData);
                                    closeModal();
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
