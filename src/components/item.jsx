import React, { Fragment, useState } from 'react'
import "./components.css"
import { Draggable } from '@hello-pangea/dnd';
import { Avatar, Box, Menu,  MenuItem } from '@mui/material';
import MyModal from './MyModal';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { deleteTicket } from '../backend/api/tickets';


function SingleItem({ bIndex, data, index, theme, boardData, setBoard }) {

    const [open, setOpen] = useState(false);
    const openModal = () => { setOpen(true); }
    const closeModal = () => { setOpen(false); }

    function stringToColor(string) {
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
                width: 24,
                height: 24,
                fontSize: 'small'
            },
            children: `${name.split(' ')[0][0].toUpperCase()}${name.split(' ').length > 1 ? name.split(' ')[1][0].toUpperCase() : ''}`,
        };
    }
    const options = ['Delete'];

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        console.log(e)
    };
    const handleClose = async () => {
        setAnchorEl(null);
    };
    const deleteTicketData = async () => {
        const newData = await deleteTicket(data[0], bIndex, index, boardData);
        setBoard({ ...newData });
        handleClose();
    }

    return (
        <Fragment>
            <Draggable index={index} draggableId={data[0].toString()}>
                {(provided) => (

                    <div ref={provided.innerRef} {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`bg-indigo-100 dark:bg-zinc-900 rounded-md p-2 flex flex-col space-y-4 border border-black shadow-lg`}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', }} className="">
                            <p className='text-md tracking-wide line-clamp-3 p-1 rounded-md w-full dark:hover:bg-[#21272d] hover:bg-indigo-200' style={{ overflowWrap: 'anywhere' }}>{data[1]}</p>
                            <div>
                                <IconButton aria-label="more" id="long-button"
                                    aria-controls={open ? 'long-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined} aria-haspopup="true"
                                    className={`dark:text-white`}
                                    sx={{ padding: '5px 0px 0px 0px', }} onClick={handleClick}
                                >
                                    <MoreHorizIcon />
                                </IconButton>
                                <Menu id="long-menu"
                                    MenuListProps={{ 'aria-labelledby': 'long-button', }}
                                    anchorEl={anchorEl} open={openMenu} onClick={handleClose}
                                    slotProps={{ paper: { style: { maxHeight: 48 * 4.5, width: '20ch', }, } }}
                                >
                                    {options.map((option, idx) => (
                                        <MenuItem key={option} onClick={deleteTicketData}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        </Box>
                        <div className="flex justify-between items-center pt-2" onClick={openModal}>
                            <p className='text-sm'>EG-{data[0]}</p>
                            <Avatar {...stringAvatar(data[2])} />
                        </div>
                    </div>

                )}
            </Draggable>

            {
                open && (
                    <MyModal setBoard={setBoard} boardData={boardData} ticketPosition={{ bIndex, index }} theme={theme} open={open} id={data[0]} openModal={openModal} closeModal={closeModal} />
                )
            }

        </Fragment>
    )
}
export default SingleItem