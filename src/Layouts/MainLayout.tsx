import React from 'react'
import {Header} from '../components/Header'
import { Outlet } from 'react-router-dom'

const MainLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        {/* Outlet рендеримо в тому місці де потрібно рендерити динамічні роути */}
        <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout