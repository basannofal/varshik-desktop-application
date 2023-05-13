import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './Routes/App';
import Clan from './Routes/Clan';
import Member from './Routes/Member';
import YearlyIncome from './Routes/YearlyIncome';
import Payment from './Routes/Payment';
import './Assets/css/App.css'
import './Assets/css/Sidebar.css'
import Report from './Routes/Report'
import Expenses from './Routes/Expenses';
import Income from './Routes/Income';

ReactDOM.render(
    <BrowserRouter>
        <App />
        <Member />
        <Clan />
        <Expenses />
        <Income />
        <Payment />
        <YearlyIncome />
        <Report />
    </BrowserRouter>,
    document.getElementById("root"))
