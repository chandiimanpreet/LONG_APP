import React from 'react'
import "./components.css"
import SingleItem from './item'
import { Droppable } from '@hello-pangea/dnd'
// import jsonData from '../backend/boardData.json'; // Path to your generated JSON data file

function SubLayout({board,bIndex}) {
    return (
        <div key={board.label} className='flex flex-col w-full h-full pb-3  py-5  px-2 m-2  shadow'>
            <Droppable droppableId={bIndex.toString()}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className='blend'
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

                        {/* {
                            showForm && selectedBoard === bIndex ? (
                                <div className="p-3">
                                    <textarea className="border-gray-300 rounded focus:ring-purple-400 w-full"
                                        rows={3} placeholder="Task info"
                                        data-id={bIndex}
                                        onKeyDown={(e) => onTextAreaKeyPress(e)} />
                                </div>
                            ) : (
                                <button
                                    className="flex justify-center items-center my-3 space-x-2 text-lg"
                                    onClick={() => { setSelectedBoard(bIndex); setShowForm(true); }}
                                >
                                    <span>Add task</span>
                                    <PlusCircleIcon className="w-5 h-5 text-gray-500" />
                                </button>
                            )
                        } */}

                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default SubLayout