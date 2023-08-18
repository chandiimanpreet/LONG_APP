import React, {  useEffect, useState } from 'react'
import "./components.css"
import MyModal from './MyModal';
import SingleItem from './item'
import { Droppable } from '@hello-pangea/dnd'
import { BsPlus } from 'react-icons/bs'
import { addTicket } from '../backend/api/tickets';
import { Box, Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { deleteBoard } from '../backend/api/board';


const SubLayout = ({ board, bIndex, theme, boardData, setBoard }) => {

    useEffect(() => {
        console.log(bIndex)
    },[bIndex])

    const [selectedBoard, setSelectedBoard] = useState(null);
    const [open, setOpen] = useState(false);

    const openModal = () => { setOpen(true); }
    const closeModal = () => { setOpen(false); }

    const getModalDataFromModal = async (modalData) => {
        const newData = await addTicket(modalData, selectedBoard.columnIndex, selectedBoard.columnName, boardData)
        setBoard(newData);
    };

    const options = ['Delete'];

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        console.log(e)
    };
    const handleClose = async () => {
        setAnchorEl(null);
        const newBoard = await deleteBoard(bIndex, boardData);
        setBoard({ ...newBoard });
    };


    return (
        <Box width='15rem' key={Object.keys(board)[0]} style={{ backgroundColor: ' #161A1D #F4F5F7' }}
            className={`flex flex-col h-full pb-2 py-2 px-2 m-2 rounded-lg `}
        >
            <Droppable droppableId={bIndex.toString()}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`dark:text-white rounded-md blend h-full  relative`}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', }}>
                                <h1 className={`text-3 px-2 font-bold py-5 text-center uppercase`}>
                                    {Object.keys(board)[0]}
                                </h1>
                                <h1 className={`text-2 px-1 py-5 text-center`}>
                                    {board[Object.keys(board)[0]].length > 0 && board[Object.keys(board)[0]].length}</h1>
                            </Box>
                            <div>
                                <IconButton aria-label="more" id="long-button"
                                    aria-controls={open ? 'long-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined} aria-haspopup="true"
                                    sx={{ marginTop: '.7rem !important' }}
                                    className={`dark:text-white`}
                                >
                                    <MoreHorizIcon onClick={handleClick} id={`${Object.keys(board)[0]}`} />
                                </IconButton>
                                <Menu id="long-menu"
                                    MenuListProps={{ 'aria-labelledby': 'long-button', }}
                                    anchorEl={anchorEl} open={openMenu} onClose={handleClose}
                                    slotProps={{ paper: { style: { maxHeight: 48 * 4.5, width: '20ch', }, } }}
                                >
                                    {options.map((option) => (
                                        <MenuItem key={option} onClick={handleClose}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        </Box>
                        {/* <DotsVerticalIcon className="w-5 h-5 text-gray-500" /> */}

                        <div className={` overflow-y-auto ${theme === 'light' ? 'shadow' : 'shadow-dark'}  overflow-x-hidden h-auto`}
                            style={{ maxHeight: 'calc(100vh - 290px)' }}>
                            {
                                board[Object.keys(board)[0]].length > 0 &&
                                board[Object.keys(board)[0]].map((ticket, iIndex) => {
                                    const ticketData = ticket.split("-#$%-")
                                    return (
                                        <SingleItem setBoard={setBoard} bIndex={bIndex} boardData={boardData}
                                            key={ticketData[0]} data={ticketData} index={iIndex} theme={theme} />
                                    );
                                })
                            }
                            {provided.placeholder}
                            <button onClick={(e) => {
                                setSelectedBoard({ columnIndex: bIndex, columnName: Object.keys(board)[0] });
                                openModal();
                            }} className="flex p-1.5 rounded-md hover:bg-slate-300 dark:hover:bg-zinc-900" >
                                <BsPlus id={Object.keys(board)[0]}
                                    className="text-3xl dark:text-white text-black rounded-md" /><p className='text-sm mt-1'>Add Ticket</p>
                            </button>
                        </div>

                        {
                            open && (
                                <MyModal setBoard={setBoard} boardData={boardData} ticketPosition={null} theme={theme} open={open} id={0} openModal={openModal} closeModal={closeModal}
                                    getModalDataFromModal={getModalDataFromModal} />
                            )
                        }
                    </div>
                )}
            </Droppable>
        </div>

    )
}

export default SubLayout;