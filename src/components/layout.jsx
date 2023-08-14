import SubLayout from './subLayout'
import React, { useEffect, useState, Fragment } from 'react'
import { DragDropContext } from '@hello-pangea/dnd';
import {
    Backdrop, Button, Modal, Fade, Typography, Avatar, AvatarGroup, Select, TextField, InputLabel, FormControl, Box, MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { moveTicket } from '../backend/api/tickets';
import { addMember } from '../backend/api/user';

function Layout({ theme, userData, boardData, setBoard }) {

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
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const addNewMember = async () => {
        closeModal();
        const res = await addMember(data, boardData);
        setData({ name: '', email: '', permission: '' });
        setBoard({ ...res });
    }
    useEffect(() => {
        if (process.browser) {
            setReady(true);
        }
    }, []);

    const onDragEnd = async (re) => {
        if (!re.destination) return;
        await moveTicket(re.source.droppableId, re.source.index, re.destination.droppableId, re.destination.index, boardData.boardName, boardData);
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
        // boxShadow: theme === 'dark' ? '12px 12px 24px #0b0d0f, -12px -12px 24px #2d353d' : '12px 12px 24px #494949, -12px -12px 24px #ffffff',
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
            children: `${name.split(' ')[0][0].toUpperCase()}${name.split(' ').length>1?name.split(' ')[1][0].toUpperCase():''}`,
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
                <AvatarGroup total={Object.keys(boardData.owner).length+Object.keys(boardData.member).length} sx={{ marginTop: '2rem', marginLeft: '2rem' }}>
                    {
                        boardData && Object.keys(boardData.owner).map((owner) => {
                            return <Avatar key={owner} sx={{ width: '5px !important', height: '5px !important' }} {...stringAvatar(boardData["owner"][owner])} />
                        })
                    }
                    {
                        boardData && Object.keys(boardData.member).map((member) => {
                            return <Avatar key={member} sx={{ width: '5px !important', height: '5px !important' }} {...stringAvatar(boardData["member"][member])} />
                        })
                    }
                </AvatarGroup>
                <Button sx={{ margin: '2rem 2rem 2rem 0', fontWeight: 'bold' }} onClick={openModal} > <AddIcon /> Add member</Button>
            </Box>

            {
                ready && (
                    <DragDropContext
                        onDragEnd={onDragEnd}
                    >
                        <Box width='100%' className=" blend flex">
                            {
                                boardData.ticketsEntity && boardData.ticketsEntity.map((board, bIndex) => {
                                    return (
                                        <SubLayout theme={theme} setBoard={setBoard} boardData={boardData} key={bIndex} board={board} bIndex={bIndex} />
                                    );
                                })
                            }
                        </Box>
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
                    <Box component='form' onSubmit={(e)=>{e.preventDefault();addNewMember()}} sx={style}>
                        <Box sx={{ display: 'flex',gap: '1rem', flexDirection: 'column' }}>
                            <Typography variant='h5' >Add Member</Typography>
                            <TextField name='name' type='text' required id="outlined-controlled" label="Name" value={data.name}
                                onChange={dataHandler} sx={textFieldStyle}
                            />
                            <TextField name='email' type='email' required id="outlined-controlled" label="Email" value={data.email}
                                onChange={dataHandler} sx={textFieldStyle}
                            />
                            <FormControl sx={textFieldStyle} fullWidth>
                                <InputLabel required id="demo-simple-select-label">Permission</InputLabel>
                                <Select required name='permission' labelId="demo-simple-select-label" id="demo-simple-select" onChange={dataHandler}
                                    value={data.permission} label="Permission"
                                >
                                    <MenuItem value={'Owner'}>Owner</MenuItem>
                                    <MenuItem value={'Editor'}>Editor</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '2rem' }}>
                            <Button type='button' onClick={closeModal} variant='contained' color='error'>Cancel</Button>
                            <Button type='submit' variant='contained' color='success'>Add</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default Layout