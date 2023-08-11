import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../backend/firebase'
import { useState } from 'react'
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs"
function SideBar() {
    const [open, setOpen] = useState(true)
    return (
        <div className=''>
            <div className={`bg-white shadow color-red h-screen duration-200 p-5 pt-8 ${open ? "w-72" : "w-20"} m-2 relative`}>
                {
                    !open ? <BsArrowRightShort className='text-4xl bg-black text-white 
                    absolute rounded-full -right-3 top-9' onClick={() => setOpen(!open)} /> : <BsArrowLeftShort className='text-4xl bg-black text-white 
                    absolute rounded-full -right-3 top-9' onClick={() => setOpen(!open)} />
                }

            </div>
        </div >
    )
}

export default SideBar