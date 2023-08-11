import React from 'react'
import SubLayout from './subLayout'
import jsonData from '../backend/boardData.json'; // Path to your generated JSON data file



function Layout() {
    return (
        <div className='w-full flex '>
            {jsonData.map((ticket, index) => (
                <SubLayout title={ticket.label} ind={index} key={index} data={ticket.data} />
            ))}
        </div>
    )
}

export default Layout