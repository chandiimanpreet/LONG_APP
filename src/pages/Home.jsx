import React, { useEffect, useState } from 'react'
import MainNavBar from '../components/mainNavBar'
import SideBar from '../components/sidebar'
import Layout from '../components/layout'
import { DragDropContext } from '@hello-pangea/dnd'
import BoardData from "../backend/boardData.json"

function Home() {
    const [ready, setReady] = useState(false);
    console.log(BoardData);
    const [boardData, setBoardData] = useState(BoardData);

    useEffect(() => {
        if (process.browser) {
            setReady(true);
        }
    }, []);


    const onDragEnd = (re) => {
        let newBoardData = boardData;
        var dragItem = newBoardData[parseInt(re.source.dropppableId)].items[re.source.index];
        newBoardData[parseInt(re.source.dropppableId)].items.splice(re.source.index, 1);
        newBoardData[parseInt(re.destination.dropppableId)].items.splice(re.destination.index, 0, dragItem);
        setBoardData(newBoardData);
    };

    return (
        <div>
            <MainNavBar />
            <div className='flex'>
                <SideBar />
                {
                    ready &&
                    (<DragDropContext
                        onDragEnd={onDragEnd}
                    >
                        <Layout />
                    </DragDropContext>)
                }

            </div>

        </div>
    )
}
export default Home
