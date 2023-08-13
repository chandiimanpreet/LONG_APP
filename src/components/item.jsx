import React, { Fragment, useState } from 'react'
import "./components.css"
import { Draggable } from '@hello-pangea/dnd';
import { Avatar, } from '@mui/material';
import MyModal from './MyModal';

function SingleItem({ data, index, theme }) {

    const [open, setOpen] = useState(false);
    const openModal = () => { setOpen(true); }
    const closeModal = () => { setOpen(false); }

    // const handleChange = event => {
    //     setText(event.target.value);
    // };

    // const style = {
    //     position: 'absolute',
    //     top: '40%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 1200,
    //     boxShadow: 10,
    //     borderRadius: '10px',
    //     border: '2px solid #000',
    //     p: 4,
    //     color: theme === 'dark' ? 'white' : 'black',
    //     background: theme === 'dark' ? 'linear-gradient(145deg, #1e2329, #232a30)' : 'linear-gradient(145deg, #c1c1c1, #e5e5e5)',
    //     boxShadow: theme === 'dark' ? '20px 20px 60px #3e3e3e, -20px -20px 60px #9e9e9e' : '20px 20px 60px #b6b6b6, -20px -20px 60px #f6f6f6',
    // };

    // const textFieldStyle = {
    //     color: theme === 'dark' ? 'white' : 'black', // Text color
    //     '& .MuiInputLabel-root': {
    //         color: theme === 'dark' ? 'white' : 'black', // Label color
    //     },
    //     '& .MuiInputBase-input': {
    //         color: theme === 'dark' ? 'white' : 'black', // Input text color
    //     },
    //     '& .MuiOutlinedInput-notchedOutline': {
    //         borderColor: theme === 'dark' ? 'white' : 'black', // Border color
    //     },
    //     '& .MuiInputBase-input.Mui-disabled': {
    //         color: theme === 'dark' ? 'white' : 'black', // Disabled input text color
    //     },
    // };

    // const onTextAreaKeyPress = (e) => {
    //     console.log(e.target.value)
    // }

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
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <Fragment>
            <Draggable index={index} draggableId={data[0].toString()}>
                {(provided) => (
                    <Fragment>
                        <div onClick={openModal} ref={provided.innerRef} {...provided.draggableProps}                        
                            {...provided.dragHandleProps}
                            className={` blend  ${theme === 'light' ? 'shadow' : 'shadow-dark-item'} min-w-fit px-10 pt-5 pb-3 m-3`}
                        >
                            <h1 className='text-3 bg-red blend  pb-8'>{data[1]}</h1>
                            <div className="flex justify-between mt-1">
                                <p className='mt-4'>EG-{data[0]}</p>
                                <Avatar sx={{ width: '2rem !important', height: '2rem !important', }}
                                    {...stringAvatar('Manpreet Singh')} />
                            </div>
                        </div>
                    </Fragment>
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