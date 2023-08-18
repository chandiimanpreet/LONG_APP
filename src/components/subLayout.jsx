import React, { useState } from 'react'
import "./components.css"
import MyModal from './MyModal';
import SingleItem from './item'
import { Droppable } from '@hello-pangea/dnd'
import { BsPlus } from 'react-icons/bs'
import { addTicket } from '../backend/api/tickets';

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
        <div className='w-72 bg-slate-200 dark:bg-[#21272d] rounded-md shadow-lg'>
            <Droppable droppableId={bIndex.toString()}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`dark:text-white rounded-md blend h-full  relative`}
                    >
                        <div className={`sticky text-center uppercase font-semibold h-12 top-0`}>
                            <p className='mt-3'>{Object.keys(board)[0]}</p>
                        </div>

                        <div style={{overflowY:'auto',height:'64vh'}} className={`example flex flex-col space-y-2 mx-1.5 mb-6`}>
                            {board[Object.keys(board)[0]].length > 0 &&
                                board[Object.keys(board)[0]].map((ticket, iIndex) => {
                                    const ticketData = ticket.split("-#$%-")
                                    return (
                                        <SingleItem setBoard={setBoard} bIndex={bIndex} boardData={boardData} key={ticketData[0]} data={ticketData} index={iIndex} theme={theme} />
                                    );
                                })}
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