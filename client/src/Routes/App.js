import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Dashboard from '../Pages/Dashboard/Dashboard';
import PaymentHistory from '../Pages/Payment/PaymentHistory'
    
    function App() {
    return (
    <>
        <Routes>
        <Route exact path="/" element={<PaymentHistory />}></Route>
        </Routes>
        
    </>
    );
    }
    export default App;