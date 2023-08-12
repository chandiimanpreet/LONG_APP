import React, { useEffect, useState } from 'react'
import MainNavBar from '../components/mainNavBar'
import SideBar from '../components/sidebar'
import Layout from '../components/layout'
import BoardData from "../backend/boardData.json"


function Home() {

    const [theme, setTheme] = useState('light');

    return (
        <div>
            <MainNavBar theme={theme} setTheme={setTheme}/>
            <hr/>
            <div className='flex'>
                <SideBar theme={theme} />
                <Layout theme={theme} />
            </div>

        </div>
    )
}
export default Home
