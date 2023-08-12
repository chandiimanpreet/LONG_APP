import React, { Fragment, useState } from 'react'
import "./components.css"
import { Draggable } from '@hello-pangea/dnd';
import { Avatar, } from '@mui/material';
import MyModal from './MyModal';

function SingleItem({ data, index, theme }) {


    const [open, setOpen] = useState(false);
    

    const openModal = () => {
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    }

    const stringToColor = (string) => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    const stringAvatar = (name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <Fragment>
            <Draggable index={index} draggableId={data[0].toString()}>
                {(provided) => (
                    <Fragment>
                        <div onClick={openModal}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={` blend  ${theme === 'light' ? 'shadow' : 'shadow-dark'}   px-10 pt-5 pb-3 m-3`}
                        >
                            <h1 className='text-3 bg-red blend  pb-8'>{data[1]}</h1>
                            <div className="flex justify-between mt-1">
                                <p className='mt-4'>EG-{data[0]}</p>
                                <Avatar sx={{ width: '5px !important', height: '5px !important' }} {...stringAvatar('hello fdgdf')} />
                            </div>
                        </div>
                    </Fragment>

                )}
            </Draggable>

            {
                open && (
                    <MyModal open={open} data={data} openModal={openModal} closeModal={closeModal} />
                )
            }

        </Fragment>
    )
}
export default SingleItem