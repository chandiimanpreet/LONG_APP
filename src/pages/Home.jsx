import React, { useState } from 'react'
import MainNavBar from '../components/mainNavBar'
import SideBar from '../components/sidebar'
import Layout from '../components/layout'
import Pulse from '../components/Pulse';


function Home({ userData, setUserData, setBoard ,boardData}) {

    const [theme, setTheme] = useState('light');
    const [loading, setLoading] = useState(false);
    console.log(boardData);

    return (
        <div>
            <hr />
            <MainNavBar setUserData={setUserData} theme={theme} setTheme={setTheme} />
            <div className='flex'>
                <SideBar setBoard={setBoard} setLoading={setLoading} theme={theme} userData={userData} setUserData={setUserData} />
                {loading ? <Pulse /> : <Layout theme={theme} userData={userData} setLoading={setLoading} boardData={boardData}/>}

            </div>

        </div>
    )
}
export default Home
