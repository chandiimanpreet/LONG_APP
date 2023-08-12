import React from 'react'
import "./components.css"
import { Draggable } from '@hello-pangea/dnd'

function SingleItem({ data, index }) {
    // console.log(props.ticket)
    return (

        <Draggable index={index} draggableId={data.id.toString()}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className=' blend shadow p-10  m-3'
                >
                    <h1 className='text-3 bg-red blend text-center uppercase'>{data.title}</h1>
                </div>
            )}
        </Draggable>
    )
}
export default SingleItem