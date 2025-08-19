import React from 'react'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import Profile from '../components/Profile'

function Dashboard() {
  return (
    <div>
      <Navbar/>
      <Profile/>
      <Footer/>
    </div>
  )
}

export default Dashboard
