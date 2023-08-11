import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../backend/firebase';

function MainNavBar({ theme, setTheme}) {
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const handleThemeSwitch = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className='justify-between '>
            <header className='flex  justify-between dark:bg-[#1d2125] p-5 shadow-lg sticky top-0  z-10 '>
                <h1 className='text-4xl bg-back dark:text-white dark:bg-[#1d2125] font-bold '>Long app</h1>

                <div className='flex  justify-between  dark:bg-[#1d2125]'>
                    <button className='text-black bg-[#06b6d4] mr-10 p-2 rounded-lg' onClick={handleThemeSwitch}>
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>

                    <img
                        src={user?.photoURL.toString()}
                        alt={user?.displayName.charAt(0).toUpperCase()}
                        className='rounded-full  cursor-pointer h-12 w-12'
                    />
                    <br />
                    <button onClick={() => auth.signOut()} className='logout-btn'>Sign Out</button>
                </div>
            </header>
        </div>
    );
}

export default MainNavBar;
