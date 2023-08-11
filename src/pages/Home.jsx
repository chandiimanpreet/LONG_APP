import React, { useEffect, useState } from 'react'
import MainNavBar from '../components/mainNavBar'
import SideBar from '../components/sidebar'
import Layout from '../components/layout'
import BoardData from "../backend/boardData.json"


function Home() {


    return (
        <div>
            <MainNavBar />
            <div className='flex'>
                <SideBar />
                <Layout />

            </div>

        </div>
    )
}
export default Home
