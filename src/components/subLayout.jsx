import React from 'react'
import "./components.css"
import { useState } from 'react'
import BoardData from "../backend/boardData.json"


import SingleItem from './item'
import { Droppable } from '@hello-pangea/dnd'
import { BsPlus } from 'react-icons/bs'
// import jsonData from '../backend/boardData.json'; // Path to your generated JSON data file

function SubLayout({ board, bIndex, theme }) {
    const [boardData, setBoardData] = useState(BoardData);
    const [showForm, setShowForm] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(0);
    const onTextAreaKeyPress = (e) => {
        if (e.keyCode === 13) //Enter
        {
            const val = e.target.value;
            if (val.length === 0) {
                setShowForm(false);
            }
            else {
                const boardId = e.target.attributes['data-id'].value;
                const item = {
                    id: createGuidId(),
                    title: val,
                    priority: 0,
                    chat: 0,
                    attachment: 0,
                    assignees: []
                }
                let newBoardData = boardData;
                newBoardData[boardId].items.push(item);
                setBoardData(newBoardData);
                setShowForm(false);
                e.target.value = '';
            }
        }
    }

    function createGuidId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
            return v.toString(16);
        });
    }


    return (
        <div
            key={board.label}
            className={`flex dark:bg-[#9fadbc] ${theme === 'light'? 'shadow': ''} flex-col w-full h-full pb-2 py-2 px-2 m-2 rounded-lg`}
        >
            <Droppable droppableId={bIndex.toString()}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className='blend dark:bg-[#21272d] dark:text-white rounded-md h-full'
                    >
                        <h1 className="text-3 px-2 xl blend py-5  text-center uppercase">
                            {board.label}
                        </h1>
                        {/* <DotsVerticalIcon className="w-5 h-5 text-gray-500" /> */}


                        <div className="blend overflow-y-auto overflow-x-hidden h-auto"
                            style={{ maxHeight: 'calc(100vh - 290px)' }}>
                            {board.items.length > 0 &&
                                board.items.map((ticket, iIndex) => {
                                    return (
                                        <SingleItem key={ticket.id} data={ticket} index={iIndex} />
                                    );
                                })}
                            {provided.placeholder}
                        </div>

                        {
                            showForm && selectedBoard === bIndex ? (
                                <div className="p-3">
                                    <textarea className="border-gray-300 rounded focus:ring-purple-400 w-full"
                                        rows={3} placeholder="Task info"
                                        data-id={bIndex}
                                        onKeyDown={(e) => onTextAreaKeyPress(e)} />
                                </div>
                            ) : (
                                <button
                                    className="flex  my-3 space-x-2 text-lg relative"
                                    onClick={() => { setSelectedBoard(bIndex); setShowForm(true); }}
                                >
                                    <BsPlus className=" text-4xl absolute  -right-3   bg-black relative text-white 
                                        absolute rounded-full" />
                                </button>
                            )
                        }

                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default SubLayout