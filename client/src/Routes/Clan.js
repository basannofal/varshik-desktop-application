import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddClan from '../Pages/Clan/AddClan'
import AllClan from '../Pages/Clan/AllClan'

const Clan = () => {
  return (
    <>
        <Routes>
            <Route path='/allclan' element={<AllClan />} />
        </Routes>

        <Routes>
            <Route path='/addclan' element={<AddClan />} />
        </Routes>
    </>
  )
}

export default Clan