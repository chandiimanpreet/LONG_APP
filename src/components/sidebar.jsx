import React from 'react'
//import { AppBar, Toolbar, Button } from "@mui/material";
import { useState } from 'react'
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useStyles } from "./style";
import { addBoard, getBoard } from '../backend/api/board';

function SideBar({ theme, userData, setUserData, setLoading, setBoard }) {

    // <div className={`${theme === 'light'? 'shadow': ''} dark:bg-[#21272d] h-screen duration-200 p-5 pt-8 ${open ? "w-72" : "w-20"} m-2 rounded-lg relative`}>

    const [sideopen, setSideOpen] = useState(true);
    const [project, setProject] = useState("");
    const [open, setOpen] = React.useState(false);
    const [sidebutton, setSideButton] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            const res = await addBoard({ name: project });
            if (res.message !== "success") {
                alert("Project name already exists");
            } else {
                handleClose();
                setUserData({ ...userData, boards: [project, ...userData.boards] });
                openBoardHandler(project);
            }
            setProject("")
        } catch (error) {
            console.log("error");
        }
    }
    const openBoardHandler = async (projectname) => {
        setLoading(true);
        const boardData = await getBoard(projectname);
        setBoard(boardData);
        setLoading(false);
    }
    const classes = useStyles();
    return (

        <>
            <div>
                <div className={` ${theme === 'light' ? 'shadow' : ''} dark:bg-[#21272d] color-red h-screen duration-200 p-5 pt-8 ${sideopen ? "w-fill" : "w-20"} m-2 relative`} style={{ borderRadius: '0.6em' }}>

                    {
                        !sideopen ? <BsArrowRightShort className='text-4xl bg-black text-white 
                    absolute rounded-full -right-3 top-9' onClick={clickRightArrow} /> : <BsArrowLeftShort className='text-4xl bg-black text-white 
                    absolute rounded-full -right-3 top-9' onClick={clickLeftArrow} />
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


                    {!sidebutton &&
                        <>
                            <button className='text-lg font-semibold rounded-md' style={{
                                color: theme === 'dark' ? 'white' : 'black',
                                border: theme === 'dark' ? '3px solid white' : '3px solid black',
                                width: "98%",
                                height: "3rem",
                                position: "relative",
                                left: "-4px",
                                marginTop: "8px"
                            }} onClick={handleOpen} >
                                <AddCircleRoundedIcon className={classes.addIcon} />
                                Add Board
                            </button>
                            <p className='text-lg dark:text-white font-bold mt-4'>Your Boards</p>
                            {
                                userData && userData.boards.map((ele) => {
                                    return <button key={ele} className='text-lg font-semibold rounded-md' style={{
                                        color: theme === 'dark' ? 'white' : 'black',
                                        border: theme === 'dark' ? '3px solid white' : '3px solid black',
                                        width: "15rem",
                                        height: "3rem",
                                        position: "relative",
                                        left: "-4px",
                                        marginTop: "12px"

                                    }} onClick={() => openBoardHandler(ele)} >
                                        {ele}
                                    </button>
                                })
                            }
                        </>

                    }
                </div>

            </div >
        </>

    )
}

export default SideBar