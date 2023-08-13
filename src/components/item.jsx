import React, { Fragment, useState } from 'react'
import "./components.css"
import { Draggable } from '@hello-pangea/dnd';
import { Avatar, } from '@mui/material';
import MyModal from './MyModal';
import { Typography } from '@mui/material';

function SingleItem({ data, index, theme }) {

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
            },
            children: `${name.split(' ')[0][0].toUpperCase()}${name.split(' ').length > 1 ? name.split(' ')[1][0].toUpperCase() : ''}`,
        };
    }

    return (
        <Fragment>
            <Draggable  index={index} draggableId={data[0].toString()}>
                {(provided) => (
                   
                        <div onClick={openModal} ref={provided.innerRef} {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={` blend  ${theme === 'light' ? 'shadow' : 'shadow-dark'} w-55 px-5 pt-5 pb-5 m-3`}
                        >
                            <Typography className='text-3 line-clamp-3 bg-red blend'>{data[1]}</Typography>
                            <div className="flex justify-between items-center mt-2">
                                <p>EG-{data[0]}</p>
                                <Avatar sx={{ width: '2rem !important', height: '2rem !important' }} {...stringAvatar(data[2])} />
                            </div>
                        </div>

                )}
            </Draggable>

            {
                open && (
                    <MyModal theme={theme} open={open} data={data} openModal={openModal} closeModal={closeModal} />
                )
            }

        </Fragment>
    )
}
export default SingleItem