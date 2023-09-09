import React, { Fragment } from 'react'
import { useState } from 'react'
import "./components.css"
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs"
import { TextField, Box, Button, Typography, Modal, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addBoard } from '../backend/api/board';

function SideBar({ selected, setSelected, theme, userData, setUserData, setLoading}) {

    // <div className={`${theme === 'light'? 'shadow': ''} dark:bg-[#21272d] h-screen duration-200 p-5 pt-8 ${open ? "w-72" : "w-20"} m-2 rounded-lg relative`}>

    const [sideopen, setSideOpen] = useState(true);
    const [project, setProject] = useState("");
    const [open, setOpen] = useState(false);
    const [sidebutton, setSideButton] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const classes = useStyles();

    const style = {
        position: 'absolute',
        borderRadius: '20px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        zIndex: 1300,
        p: 4,
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

    const clickLeftArrow = () => {
        setSideButton(!sidebutton)
        setSideOpen(!sideopen)

    }
    const clickRightArrow = () => {
        setSideButton(!sidebutton)
        setSideOpen(!sideopen)

    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await addBoard({ name: project }, userData);
            handleClose();
            setUserData({ ...userData, boards: { [res.message]: project, ...userData.boards } });//pehele joo board tha usme add kardo
            openBoardHandler(res.message);
            setSelected(res.message);
            setProject("")//jab create ho geya hoo then khali kar doo
        } catch (error) {
            console.log("error");
        }
    }
    const openBoardHandler = async (boardId) => {
        setLoading(true);
        setSelected(boardId);
    }
   
    return (

        <Fragment>
            <div className='flex'>
                <div className={`flex flex-col ${sideopen ? "px-2" : "px-0"} pt-3 space-y-8 bg-slate-100 dark:bg-[#21272d] color-red rounded-lg min-h-screen duration-200 border border-black dark:border-white ${sideopen ? "w-56" : "w-16"}`}>
                    {
                        !sideopen ? <div className='flex justify-center'><BsArrowRightShort className='text-4xl text-black dark:text-white' onClick={clickRightArrow} /></div> : <div className='flex justify-end'><BsArrowLeftShort className='text-4xl text-black dark:text-white'
                            onClick={clickLeftArrow} /></div>
                    }
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box onSubmit={submitHandler} component='form' sx={style}>

                            <Box display='flex' justifyContent='space-between'>
                                <Typography fontWeight='bold' className='dark:text-white' id="modal-modal-title" variant="h6" component="h2">
                                    Project Name
                                </Typography>

                                <CloseIcon className='dark:text-white' fontWeight='bold' onClick={handleClose} />
                            </Box><br />

                            <TextField onChange={(e) => setProject(e.target.value)} required
                                sx={textFieldStyle}
                                id="outlined-basic"
                                label="Enter Project Name"
                                variant="outlined"
                                autoFocus
                                margin="dense"
                                type="text"
                                value={project}
                                fullWidth />

                            <br /> <br />
                            <Button type='submit' variant="contained" color='success'>
                                Create</Button>
                        </Box>
                    </Modal>

                    {
                        !sidebutton && (
                            <div className='flex flex-col space-y-6'>
                                <button className='text-xl w-[13rem] h-12 font-semibold rounded-md' style={{
                                    color: theme === 'dark' ? 'black' : 'white',
                                    backgroundColor: theme === 'dark' ? 'white' : '#282C35'
                                }} onClick={handleOpen} >
                                    <div className='flex justify-center space-x-4'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        <p className='tracking-wider mt-[2px]'>Add Board</p>
                                    </div>
                                </button>
                                <p className='text-lg text-center dark:text-white font-semibold text-[#282C35]'>Your Boards</p>
                                <hr />
                                <div className='flex flex-col space-y-6'>
                                    {
                                        userData && Object.keys(userData.boards).map((ele) => {
                                            return <button key={ele} className={`${(selected && selected === ele) ? "dark:bg-black bg-slate-200" : ""} text-lg dark:hover:bg-black font-medium rounded-md hover:bg-slate-200`} style={{
                                                color: theme === 'dark' ? 'white' : 'black',

                                            }} onClick={() => openBoardHandler(ele)} >
                                                <div className='flex items-center'>
                                                    <div className='w-1/3 flex justify-center text-xl'>{(selected && selected === ele) ? <IconFilled theme={theme} /> : <IconOutlined theme={theme} />}</div>
                                                    <div className='w-2/3 flex justify-start'>{userData.boards[ele]}</div>
                                                </div>
                                            </button>
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                    
                    {
                        sidebutton &&
                        <div className='space-y-4'>
                            <div className='flex justify-center'>
                                <Tooltip title="Add Board" placement='right'>
                                    <button onClick={handleOpen} className='bg-black dark:bg-white dark:text-black text-white p-0.5 rounded-md'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </Tooltip>
                            </div>
                            <hr />
                            <div className='flex flex-col space-y-8'>
                                {
                                    userData && Object.keys(userData.boards).map((ele) => {
                                        return <Tooltip title={userData.boards[ele]} placement='right'>
                                            <button key={ele} onClick={() => openBoardHandler(ele)} >
                                                <div className='flex justify-center'>
                                                    {(selected && selected === ele) ? <IconFilled theme={theme} /> : <IconOutlined theme={theme} />}
                                                </div>
                                            </button>
                                        </Tooltip>
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Fragment>

    )
};

function IconOutlined({ theme }) {
    return (
        <svg
            fill={theme === 'dark' ? 'white' : 'black'}
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 -960 960 960"
        >
            <path d="M197.694-140.001q-23.596 0-40.645-17.048-17.048-17.049-17.048-40.645v-564.612q0-23.596 17.048-40.645 17.049-17.048 40.645-17.048h564.612q23.596 0 40.645 17.048 17.048 17.049 17.048 40.645v564.612q0 23.596-17.048 40.645-17.049 17.048-40.645 17.048H197.694zm219.614-45.384v-271.923H185.385v259.614q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462h219.614zm45.384 0h299.614q5.385 0 8.847-3.462 3.462-3.462 3.462-8.847v-259.614H462.692v271.923zM185.385-502.692h589.23v-259.614q0-5.385-3.462-8.847-3.462-3.462-8.847-3.462H197.694q-5.385 0-8.847 3.462-3.462 3.462-3.462 8.847v259.614z"></path>
        </svg>
    );
};

function IconFilled({ theme }) {
    return (
        <svg
            fill={theme === 'dark' ? 'white' : 'black'}
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 -960 960 960"
        >
            <path d="M197.694-140.001q-23.5 0-40.596-17.097-17.097-17.096-17.097-40.596v-269.614h277.307v327.307H197.694zm264.998 0v-327.307h357.307v269.614q0 23.5-17.097 40.596-17.096 17.097-40.596 17.097H462.692zM140.001-512.692v-249.614q0-23.5 17.097-40.596 17.096-17.097 40.596-17.097h564.612q23.5 0 40.596 17.097 17.097 17.096 17.097 40.596v249.614H140.001z"></path>
        </svg>
    );
};

export default SideBar