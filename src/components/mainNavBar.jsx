import React, { useEffect } from 'react';
import { auth } from '../backend/firebase';

function MainNavBar({ setUserData, theme, setTheme, setBoard }) {
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
        <div className='justify-between'>
            <header className='flex justify-between dark:bg-[#1d2125] p-5 shadow-lg sticky top-0 z-10 '>
                <h1 className='text-4xl bg-back dark:text-white dark:bg-[#1d2125] font-bold '>Long app</h1>

                <div className='flex justify-between dark:bg-[#1d2125]'>

                    <div className="flex dark:bg-[#1d2125] items-center justify-center mr-10 ">

                        <label htmlFor="toggleB" className="flex items-center dark:bg-[#1d2125] cursor-pointer">

                            <div className="relative dark:bg-[#1d2125]">
                                <input type="checkbox" onClick={handleThemeSwitch} id="toggleB" className="sr-only" />
                                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                            </div>

                            <div className="ml-3 dark:bg-[#1d2125] dark:text-white font-medium">
                                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                            </div>
                        </label>

                    </div>
                    <div className="relative group">
                        <img
                            src={auth.currentUser?.photoURL.toString()}
                            alt={auth.currentUser?.displayName.charAt(0).toUpperCase()}
                            className='rounded-full cursor-pointer h-12 w-12'
                        />
                        <div className="hidden group-hover:block bg-gray-800 text-white text-xs rounded p-1 absolute">
                            {auth.currentUser.email}
                        </div>
                    </div>
                    <br />
                    <div className="flex items-center">
                        <button onClick={() => { auth.signOut(); setUserData(null); setBoard(null); }} className='logout-btn dark:text-white flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                            <span className="ml-1">Sign out</span>
                        </button>
                    </div>

                </div>
            </header>
        </div>
    );
}

export default MainNavBar;
