import React, { useState } from 'react'
import "./components.css"
import MyModal from './MyModal';
import SingleItem from './item'
import { Droppable } from '@hello-pangea/dnd'
import { BsPlus } from 'react-icons/bs'
import { addTicket } from '../backend/api/tickets';
import { Box } from '@mui/material';

const SubLayout = ({ board, bIndex, theme, boardData, setBoard }) => {

    const [selectedBoard, setSelectedBoard] = useState(null);
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    }

    const getModalDataFromModal = async (modalData) => {
        const newData = await addTicket(modalData, selectedBoard.columnIndex, selectedBoard.columnName, boardData)
        setBoard(newData)
    }

    return (
        <Box width='15rem'  key={Object.keys(board)[0]} style={{ backgroundColor: ' #161A1D #F4F5F7' }}
            className={`flex flex-col h-full pb-2 py-2 px-2 m-2 rounded-lg `}
        >
            <Droppable droppableId={bIndex.toString()}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`dark:text-white rounded-md blend h-full`}
                    >
                        <h1 className={`text-3 px-2 font-bold py-5 text-center uppercase`}>
                            {Object.keys(board)[0]}
                        </h1>
                        {/* <DotsVerticalIcon className="w-5 h-5 text-gray-500" /> */}

                        <div className={` overflow-y-auto ${theme === 'light' ? 'shadow' : 'shadow-dark'}  overflow-x-hidden h-auto`}
                            style={{ maxHeight: 'calc(100vh - 290px)' }}>
                            {board[Object.keys(board)[0]].length > 0 &&
                                board[Object.keys(board)[0]].map((ticket, iIndex) => {
                                    const ticketData = ticket.split("-#$%-")
                                    return (
                                        <SingleItem key={ticketData[0]} data={ticketData} index={iIndex} theme={theme} />
                                    );
                                })}
                            {provided.placeholder}
                        </div>

                        <div className="flex justify-center">
                            <button className="flex  my-3 space-x-2 text-lg relative" >
                                <BsPlus id={Object.keys(board)[0]} onClick={(e) => {
                                    setSelectedBoard({ columnIndex: bIndex, columnName: Object.keys(board)[0] });
                                    openModal();
                                }}
                                    className="text-4xl absolute bg-black relative text-white rounded-full" />
                            </button>
                        </div>

                        {
                            open && (
                                <MyModal boardData={boardData} theme={theme} open={open} data={[]} openModal={openModal} closeModal={closeModal}
                                    getModalDataFromModal={getModalDataFromModal} />
                            )
                        }
                    </div>
                )}
            </Droppable>
        </Box>
    )
}

export default SubLayout;