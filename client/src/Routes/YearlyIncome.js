import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddYear from '../Pages/Yearly Income/AddYear'
import AllYearlyIncome from '../Pages/Yearly Income/AllYearlyIncome'
import EditYear from '../Pages/Yearly Income/EditYear'

const YearlyIncome = () => {
    return (
        <>
            <Routes>
                <Route path='/allyearlyincome' element={<AllYearlyIncome />} />
            
                <Route path='/addyear' element={<AddYear />} />
            
                <Route path='/edityearincome/:id' element={<EditYear />} />
            
            </Routes>
        </>
    )
}

export default YearlyIncome