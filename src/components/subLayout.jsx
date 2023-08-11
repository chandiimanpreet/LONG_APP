import React from 'react'
import "./components.css"
import SingleItem from './item'
import { Droppable } from '@hello-pangea/dnd'
// import jsonData from '../backend/boardData.json'; // Path to your generated JSON data file

function SubLayout(props) {
    return (
        <div key={props.title} className='flex flex-col w-full h-full pb-3  py-5  px-2 m-2  shadow'>
            <h1 className='text-3 px-2 xl blend py-5  text-center uppercase'>{props.title}</h1>

            <Droppable droppableId={props.title}>
                {(provided, snapshot) => {

                    return (
                        <div className='blend' ref={provided.innerRef} {...provided.droppableProps}>
                            {props.data.map((ticket, iIndex) => (
                                <SingleItem key={ticket.uid} data={ticket} index={iIndex} />
                            ))}
                            {provided.placeholder}

                        </div>

                    )
                }}
            </Droppable >

        </div>
    )
}

export default SubLayout