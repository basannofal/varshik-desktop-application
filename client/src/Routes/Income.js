import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddIncome from '../Pages/Income/AddIncome'
import AllIncome from '../Pages/Income/AllIncome'
import AddIncomeCategory from '../Pages/Income/AddIncomeCategory'
import EditIncome from '../Pages/Income/EditIncome'

const Income = () => {
    return (
        <>
            <Routes>
                <Route path='/addincome' element={<AddIncome />} />
            </Routes>

            <Routes>
                <Route path='/allincome' element={<AllIncome />} />
            </Routes>

            <Routes>
                <Route path='/addincomecategory' element={<AddIncomeCategory />} />
            </Routes>

            <Routes>
                <Route path='/editincome' element={<EditIncome />} />
            </Routes>
        </>
    )
}

export default Income