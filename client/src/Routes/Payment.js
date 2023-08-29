import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddPayment from '../Pages/Payment/AddPayment'
import PaymentHistory from '../Pages/Payment/PaymentHistory'
import EditPayment from '../Pages/Payment/EditPayment'
const Payment = () => {
    return (
        <>
            <Routes>
                <Route path='/addpayment' element={<AddPayment />} />
            </Routes>
            <Routes>
                <Route path="/paymentHistory" element={<PaymentHistory/>} />
            </Routes>
            <Routes>
                <Route path="/editPayment" element={<EditPayment/>} />
            </Routes>
        </>
    )
}

export default Payment