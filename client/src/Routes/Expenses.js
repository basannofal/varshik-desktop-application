import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddExpenses from '../Pages/Expenses/AddExpenses'
import AllExpenses from '../Pages/Expenses/AllExpenses'
import AddExpCategory from '../Pages/Expenses/AddExpCategory'
import EditExpenses from '../Pages/Expenses/EditExpenses'
import GenerateReport from '../Pages/Expenses/GenerateReport'

const Expenses = () => {
    return (
        <>
            <Routes>
                <Route path='/addexpenses' element={<AddExpenses />} />
            </Routes>

            <Routes>
                <Route path='/allexpenses' element={<AllExpenses />} />
            </Routes>

            <Routes>
                <Route path='/addexpcategory' element={<AddExpCategory />} />
            </Routes>

            <Routes>
                <Route path='/editexpenses' element={<EditExpenses />} />
            </Routes>

            <Routes>
                <Route path='/generatereport' element={<GenerateReport />} />
            </Routes>
        </>
    )
}

export default Expenses