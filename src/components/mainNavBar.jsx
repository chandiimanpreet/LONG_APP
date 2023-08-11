import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../backend/firebase'
function MainNavBar() {
    const [user] = useAuthState(auth);
    return (
        <div className='justify-between'>
            <header className='flex  justify-between  p-5 shadow-lg sticky top-0  z-10'>
                <h1 className='text-4xl bg-back font-bold '>Long app</h1>
                <div className='flex  justify-between '>
                    <img
                        src={user?.photoURL.toString()}
                        alt={user?.displayName.charAt(0).toUpperCase()}
                        className='rounded-full  cursor-pointer h-12 w-12'
                    ></img>
                    <br />
                    <button onClick={() => auth.signOut()} className=' logout-btn'>sign out</button>
                </div>

            </header>
        </div >
    )
}

export default MainNavBar