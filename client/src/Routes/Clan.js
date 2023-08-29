import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddClan from '../Pages/Clan/AddClan'
import AllClan from '../Pages/Clan/AllClan'
import EditClan from '../Pages/Clan/EditClan'

const Clan = () => {
  return (
    <>
        <Routes>
            <Route path='/allclan' element={<AllClan />} />
        
            <Route path='/addclan' element={<AddClan />} />
       
            <Route path='/editclan/:id' element={<EditClan />} />
       
        </Routes>
       
    </>
  )
}

export default Clan