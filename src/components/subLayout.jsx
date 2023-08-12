import React, { useEffect, useState } from 'react'
import "./components.css"
import BoardData from "../backend/boardData.json";
import MyModal from './MyModal';
import SingleItem from './item'
import { Droppable } from '@hello-pangea/dnd'
import { BsPlus } from 'react-icons/bs'

const SubLayout = ({ board, bIndex, theme }) => {

    const [boardData, setBoardData] = useState(BoardData);
    const [selectedBoard, setSelectedBoard] = useState(0);
    const [open, setOpen] = useState(false);


    const openModal = () => {
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    }

    const getModalDataFromModal = (modalData) => {
        onTextAreaKeyPress(modalData)
    }
    console.log(34535)

    useEffect(() => {
        console.log(board)

    }, [board]);

    const createGuidId = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const onTextAreaKeyPress = (data) => {

        console.log(data);

        const val = data.text;
        if (val.length !== 0) {

            const boardId = selectedBoard;
            const item = {
                id: createGuidId(),
                title: val,
                priority: 0,
                chat: 0,
                attachment: 0,
                assignees: data.assigneeName,
                reporter: data.reporterName,
            }
            let newBoardData = boardData;
            newBoardData[boardId].items.push(item);
            setBoardData(newBoardData);
        }
    };

    return (
        <div key={Object.keys(board)[0]}
            className={`flex flex-col w-full h-full pb-2 py-2 px-2 m-2 rounded-lg`}
        >
            {console.log(534535)}
            <Droppable droppableId={bIndex.toString()}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`dark:text-white rounded-md  blend h-full`}
                    >

                        <h1 className={`text-3 px-2  xl py-5 text-center uppercase`}>
                            {Object.keys(board)[0]}
                        </h1>
                        {/* <DotsVerticalIcon className="w-5 h-5 text-gray-500" /> */}


                        <div className={` overflow-y-auto  ${theme === 'light' ? 'shadow' : 'shadow-dark'}  overflow-x-hidden h-auto`}
                            style={{ maxHeight: 'calc(100vh - 290px)' }}>
                            {board[Object.keys(board)[0]].length > 0 &&
                                board[Object.keys(board)[0]].map((ticket, iIndex) => {
                                    const ticketData = ticket.split("+")
                                    return (
                                        <SingleItem key={ticketData[0]} data={ticketData} index={iIndex} theme={theme} />
                                    );
                                })}
                            {provided.placeholder}
                        </div>
                        {
                            console.log(Object.keys(board)[0])
}
                        <button className="flex  my-3 space-x-2 text-lg relative" >
                            <BsPlus id={Object.keys(board)[0]} onClick={(e) => {
                                setSelectedBoard(board.id);
                                openModal();
                            }}
                                className=" text-4xl absolute  -right-3   bg-black relative text-white 
                                                absolute rounded-full" />
                        </button>

                        {
                            open && (
                                <MyModal open={open} data={[]} openModal={openModal} closeModal={closeModal}
                                    onTextAreaKeyPress={onTextAreaKeyPress} getModalDataFromModal={getModalDataFromModal} />
                            )
                        }
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default SubLayout;