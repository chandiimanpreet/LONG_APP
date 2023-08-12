import SubLayout from './subLayout'
import React, { useEffect, useState } from 'react'
import BoardData from '../backend/boardData.json'; // Path to your generated JSON data file
import { DragDropContext } from '@hello-pangea/dnd';

function Layout({theme}) {

    const [ready, setReady] = useState(false);
    console.log(BoardData);
    const [boardData, setBoardData] = useState(BoardData);

    useEffect(() => {
        if (process.browser) {
            setReady(true);
        }
    }, []);


    const onDragEnd = (re) => {
        if (!re.destination) return;
        let newBoardData = boardData;
        var dragItem =
            newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
        newBoardData[parseInt(re.source.droppableId)].items.splice(
            re.source.index,
            1
        );
        newBoardData[parseInt(re.destination.droppableId)].items.splice(
            re.destination.index,
            0,
            dragItem
        );
        setBoardData(newBoardData);
    };


    return (
        <div className="dark:bg-[#161a1d]">
            {ready && (
                <DragDropContext
                    onDragEnd={onDragEnd}
                >
                    <div className="w-full blend flex">
                        {boardData.map((board, bIndex) => {
                            return (
                                <SubLayout theme={theme} key={bIndex} board={board} bIndex={bIndex} />
                            );
                        })}
                    </div>
                </DragDropContext>   
            )}
      
        </div>


    )
}

export default Layout