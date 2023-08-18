import React, { useState } from 'react'
import MainNavBar from '../components/mainNavBar'
import SideBar from '../components/sidebar'
import Layout from '../components/layout'
import Pulse from '../components/Pulse';


function Home({selected,setSelected ,userData, setUserData, setBoard, boardData, setPulseLoading, pulseLoading }) {

    const [theme, setTheme] = useState('light');

    return (
        <div className='dark:bg-[#161a1d]'>
            <hr />
            <MainNavBar setUserData={setUserData} theme={theme} setTheme={setTheme} setBoard={setBoard} />
            <div className='flex'>
                <SideBar selected={selected} setSelected={setSelected} setBoard={setBoard} setLoading={setPulseLoading} theme={theme} userData={userData} setUserData={setUserData} />
                {pulseLoading ? <Pulse /> : <Layout setBoard={setBoard} theme={theme} userData={userData} setLoading={setPulseLoading} boardData={boardData} />}

            </div>
        </div>
    )
}
export default Home
