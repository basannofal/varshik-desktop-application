import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddYear from '../Pages/Yearly Income/AddYear'
import AllYearlyIncome from '../Pages/Yearly Income/AllYearlyIncome'

const YearlyIncome = () => {
    return (
        <>
            <Routes>
                <Route path='/allyearlyincome' element={<AllYearlyIncome />} />
            </Routes>

            <Routes>
                <Route path='/addyear' element={<AddYear />} />
            </Routes>
        </>
    )
}

export default YearlyIncome