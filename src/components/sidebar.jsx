import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../backend/firebase'
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
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    zIndex:1300,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    background: 'wheat'
  };
function SideBar({theme}) {
    // <div className={`${theme === 'light'? 'shadow': ''} dark:bg-[#21272d] h-screen duration-200 p-5 pt-8 ${open ? "w-72" : "w-20"} m-2 rounded-lg relative`}>
    const [sideopen, setSideOpen] = useState(true)
    const [open, setOpen] = React.useState(false);
    const [sidebutton, setSideButton] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const clickLeftArrow = () => {
        setSideButton(!sidebutton)
        setSideOpen(!sideopen)
        
    }
    const clickRightArrow = () => {
        setSideButton(!sidebutton)
        setSideOpen(!sideopen)
        
    }
    const classes = useStyles();
    return (
       
        <>    
                <div className='dark:bg-[#161a1d]'>
            <div className={`bg-white ${theme === 'light'? 'shadow': ''} dark:bg-[#21272d] color-red h-screen duration-200 p-5 pt-8 ${sideopen ? "w-72" : "w-20"} m-2 relative`}>
                {
                        !sideopen ? <BsArrowRightShort className='text-4xl bg-black text-white 
                    absolute rounded-full -right-3 top-9' onClick={clickRightArrow}  /> : <BsArrowLeftShort className='text-4xl bg-black text-white 
                    absolute rounded-full -right-3 top-9' onClick={clickLeftArrow} />
                    }
                    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ProjectName 
          </Typography>
          <Box
      component="form"
      noValidate
      
    >
             <TextField  sx={{color:'black'}} id="outlined-basic"
                label="Enter Project Name"
                variant="outlined"
                autoFocus
                margin="dense"
                type="text"
                fullWidth/>
                </Box>
            <CloseIcon className={classes.closeButton} onClick={handleClose} />
            <Button variant="outlined" sx={{left: "-22px",
                    top: "3px",
                    borderColor: "black",
                    color: "black",
                    width: "6rem"}}>SUBMIT</Button>                 
            </Box>
      </Modal>

                    
                    {!sidebutton &&
                        <button style={{
                            color: "black",
                            border: "1px solid black",
                            width: "15rem",
                            borderRadius: "30px",
                            height: "3rem",
                            position: "relative",
                            left: "-4px"            
         }} onClick={handleOpen} >
            <AddCircleRoundedIcon className={classes.addIcon}/>
            Add Board       
            </button>
                    
                    }
            </div>
            
        </div >
        </>
      
    )
}

export default SideBar