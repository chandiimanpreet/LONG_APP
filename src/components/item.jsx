import React from 'react'
import "./components.css"
import { Draggable } from '@hello-pangea/dnd'

function SingleItem({data,index}) {
    console.log(data)
    return (
        <Draggable index={index} key={data.uid} draggableId={data.uid.toString()} >
            {(provided) => (
                <div ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className=' bg-red py-5  px-5 mt-5 m-1 w-full h-20 shadow'>
                    <h1 className='text-3 bg-red blend text-center uppercase'>{data.title}</h1>
                </div>
            )}
        </Draggable>

    )
}

export default SingleItem