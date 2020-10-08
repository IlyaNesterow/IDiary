import React from 'react'
import Navbar from '../components/navbar/index'
import { ViewForVisitors } from '../components/mainsection/Main-Unit'

export default ({isAuth}) => {
  return (
    <>
      <Navbar/>
      {!isAuth &&
        <ViewForVisitors/>
      }
    </>
  )
}