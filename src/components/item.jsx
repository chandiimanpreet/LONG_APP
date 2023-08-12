import React, { Fragment, useState } from 'react'
import "./components.css"
import { Draggable } from '@hello-pangea/dnd';
import {
    Backdrop, Box, Modal, Fade, Typography, Avatar, Select, TextField, InputLabel, MenuItem, FormControl
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

function SingleItem({ data, index, theme }) {

    const assignees = ['Manpreet Singh', 'Gautam Kumar', 'Roshan Singh', 'Somnath Das', 'Pranav Rastagi', 'Rahul Shah',
        'Arshdeep Singh', 'Priyanshu Maikhuri', 'Raj Kumar', 'Aakash Kshyap', 'Himalay Das', 'Chaavi Jain', 'Komal Bairwa'];

    const reporters = ['Pranav Rastagi', 'Rahul Shah', 'Himalay Das'];

    const [assigneeName, setAssigneeName] = useState('');
    const [reporterName, setReporterName] = useState('');

    const handleAssignee = (event) => {
        setAssigneeName(event.target.value);
    };
    const handleReporter = (event) => {
        setReporterName(event.target.value);
    };


    const [open, setOpen] = useState(false);
    const [text, setText] = useState(data.title);

    const openModal = () => {
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    }

    const handleChange = event => {
        setText(event.target.value);
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

    const onTextAreaKeyPress = (e) => {
        console.log(e.target.value)
    }

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



    return (
        <Fragment>
            <Draggable index={index} draggableId={data.id.toString()}>
                {(provided) => (
                    <Fragment>
                        <div onClick={openModal}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={` blend  ${theme === 'light' ? 'shadow' : 'shadow-dark'}   px-10 pt-5 pb-3 m-3`}
                        >
                            <h1 className='text-3 bg-red blend  pb-8'>{data.title}</h1>
                            <div className="flex justify-between mt-1">
                                <p className='mt-4'>EG-{data.id}</p>
                                <Avatar sx={{ width: '5px !important', height: '5px !important' }} {...stringAvatar('hello fdgdf')} />
                            </div>
                        </div>
                    </Fragment>

                )}
            </Draggable>

            {
                open && (
                    <Modal open={open} onClose={closeModal} closeAfterTransition
                        slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500, }, }}
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <textarea className="border-gray-300 rounded focus:ring-purple-400 w-1/2 text-3xl font-semibold"
                                        value={text} onChange={handleChange} />

                                    <ClearIcon onClick={closeModal} sx={{ cursor: 'pointer' }} />
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Box>
                                            <Typography>Description</Typography>
                                            <TextField className="border-gray-300 rounded focus:ring-purple-400 w-96 "
                                                rows={3} placeholder="Add a description"
                                                onKeyDown={(e) => onTextAreaKeyPress(e)} />
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
                                                        value={assigneeName}
                                                        label="Assignee"
                                                        onChange={handleAssignee}
                                                        MenuProps={{ style: { maxHeight: '60vh', maxWidth: '16vw', }, }}
                                                        InputProps={{ style: { display: 'flex' }, }}
                                                    >
                                                        {
                                                            assignees.map((name, idx) => (
                                                                <MenuItem value={name} ><Avatar sx={{ width: 5, height: 5, display: 'inline' }} {...stringAvatar(name)} />
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
                                                        value={reporterName}
                                                        label="Reporter"
                                                        onChange={handleReporter}
                                                    >
                                                        {
                                                            reporters.map((name, idx) => (
                                                                <MenuItem value={name} ><Avatar sx={{ width: 5, height: 5, }} {...stringAvatar(name)} />
                                                                    <Typography sx={{ marginLeft: '7px' }}>{name}</Typography>
                                                                </MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Fade>
                    </Modal>
                )
            }
        </Fragment>
    )
}
export default SingleItem