import React, { useState } from 'react'
import "./components.css"
import MyModal from './MyModal';
import SingleItem from './item'
import { Droppable } from '@hello-pangea/dnd'
import { addTicket } from '../backend/api/tickets';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { deleteBoard } from '../backend/api/board';


const SubLayout = ({ board, bIndex, theme, boardData, setBoard ,userData}) => {

    const options = ['Delete'];

    // States
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    // Handlers

    const openModal = () => { setOpen(true); }
    const closeModal = () => { setOpen(false); }

    const getModalDataFromModal = async (modalData) => {
        const newData = await addTicket(modalData, selectedBoard.columnIndex, selectedBoard.columnName, boardData)
        setBoard(newData);
    };

    const handleClick = (e) => { setAnchorEl(e.currentTarget); };
    const handleClose = () => { setAnchorEl(null); }

    const handleDelete = async () => {
        if(boardData.member[userData.email]!==undefined){
            setAnchorEl(null);
            alert("You don't have permission to delete.")
            return;
        }
        const newBoard = await deleteBoard(bIndex, boardData);
        setBoard({ ...newBoard });

        handleClose();
    };

    return (
        <div width='15rem' style={{ width: '15rem', backgroundColor: ' #161A1D #F4F5F7' }}
            className={`flex flex-col h-full pb-2 py-2 px-2 m-2 rounded-lg `}
        >
            <Droppable droppableId={bIndex.toString()}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`dark:text-white rounded-md blend h-full  relative`}
                    >
                        <div className='flex justify-between'>
                            <h1 className={`text-3 pl-2 font-bold py-5 text-center uppercase`}>
                                {Object.keys(board)[0]}
                            </h1>
                            <h1 className={`text-md font-normal pt-[20px]`}>
                                {board[Object.keys(board)[0]].length > 0 && board[Object.keys(board)[0]].length}
                            </h1>
                            <div className='pt-3'>
                                <IconButton aria-label="more" id="long-button"
                                    aria-controls={open ? 'long-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined} aria-haspopup="true"
                                    className={`dark:text-white`} onClick={handleClick}
                                >
                                    <MoreHorizIcon />
                                </IconButton>
                                <Menu id="long-menu"
                                    MenuListProps={{ 'aria-labelledby': 'long-button', }}
                                    anchorEl={anchorEl} open={openMenu} onClose={handleClose}
                                    slotProps={{ paper: { style: { maxHeight: 48 * 4.5, width: '20ch', }, } }}
                                >
                                    {options.map((option) => (
                                        <MenuItem key={option} onClick={handleDelete}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        </div>
                        <div className={` overflow-y-auto ${theme === 'light' ? 'shadow' : 'shadow-dark'}  overflow-x-hidden h-auto`}
                            style={{ maxHeight: 'calc(100vh - 290px)' }}>
                            {board[Object.keys(board)[0]].length > 0 &&
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
                            }} className="flex p-1.5 w-full items-center rounded-md hover:bg-slate-300 dark:hover:bg-zinc-900" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className='text-sm'>&nbsp; Add Ticket</p>
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