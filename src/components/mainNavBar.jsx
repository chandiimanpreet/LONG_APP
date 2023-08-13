import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../backend/firebase'
function MainNavBar({setUserData,theme,setTheme}) {
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
        <div className='justify-between'>
            <header className='flex  justify-between dark:bg-[#1d2125] p-5 shadow-lg sticky top-0  z-10 '>
                <h1 className='text-4xl bg-back dark:text-white dark:bg-[#1d2125] font-bold '>Long app</h1>

                <div className='flex justify-between  dark:bg-[#1d2125]'>

                    <div className="flex dark:bg-[#1d2125] items-center justify-center mr-10 ">

                        <label for="toggleB" className="flex items-center dark:bg-[#1d2125] cursor-pointer">

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

                    <img
                        src={user?.photoURL.toString()}
                        alt={user?.displayName.charAt(0).toUpperCase()}
                        className='rounded-full  cursor-pointer h-12 w-12'
                    />
                    <br />
                    <button onClick={() => {auth.signOut();setUserData(null);}} className='logout-btn'>Sign out</button>
                </div>
            </header>
        </div>
    );
}

export default MainNavBar;
