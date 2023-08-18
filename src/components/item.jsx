import React, { Fragment, useState } from 'react'
import "./components.css"
import { Draggable } from '@hello-pangea/dnd';
import { Avatar, } from '@mui/material';
import MyModal from './MyModal';

function SingleItem({ bIndex, data, index, theme, boardData, setBoard }) {

    const [open, setOpen] = useState(false);
    const openModal = () => { setOpen(true); }
    const closeModal = () => { setOpen(false); }

    function stringToColor(string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    const stringAvatar = (name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
                width:24,
                height:24,
                fontSize:'small'
            },
            children: `${name.split(' ')[0][0].toUpperCase()}${name.split(' ').length > 1 ? name.split(' ')[1][0].toUpperCase() : ''}`,
        };
    }

    return (
        <Fragment>
            <Draggable index={index} draggableId={data[0].toString()}>
                {(provided) => (

                    <div onClick={openModal} ref={provided.innerRef} {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`bg-indigo-100 dark:bg-zinc-900 rounded-md p-2 flex flex-col space-y-4 border border-black shadow-lg`}
                    >
                        <p className='text-md tracking-wide line-clamp-3' style={{overflowWrap:'anywhere'}}>{data[1]}</p>
                        <div className="flex justify-between items-center mt-2">
                            <p className='text-sm'>EG-{data[0]}</p>
                            <Avatar {...stringAvatar(data[2])} />
                        </div>
                    </div>

                )}
            </Draggable>

            {
                open && (
                    <MyModal setBoard={setBoard} boardData={boardData} ticketPosition={{ bIndex, index }} theme={theme} open={open} id={data[0]} openModal={openModal} closeModal={closeModal} />
                )
            }

        </Fragment>
    )
}
export default SingleItem