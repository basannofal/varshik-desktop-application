import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layout/Sidebar';

const EditYear = () => {

    const { id } = useParams("");
    const [amount, setAmount] = useState('');
    const [yearDate, setYearDate] = useState(Date);

    const navigate = useNavigate();

    const UpdateYearIncome = async (e) => {
        e.preventDefault();
        const team = {
            amount: amount,
            yearDate: yearDate,
        }
        console.log(team);
        try {
            await axios.patch(`${process.env.REACT_APP_URL}/edityearincome/${id}`, team).then((res) => {
                console.log(res);
                navigate("/allyearlyincome")
            }).catch((e) => {
                console.log(e);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/getperyearincome/${id}`);
            setAmount(res.data[0].amount)
            setYearDate(res.data[0].year_date.substr(0, 10))
            console.log(res.data[0].year_date.substr(0, 10));
            console.log(res.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <Sidebar />
            <section class="dashboard">
                <div class="top">
                    <i class="uil uil-bars sidebar-toggle" ></i>

                    <div class="search-box">
                        <i class="uil uil-search"></i>
                        <input type="text" placeholder="Search here..." />
                    </div>

                </div>

                <div class="dash-content   mt-5" >
                    <div class="card">
                        <span class="title mt-2">Add New Year </span>
                        <form class="form">
                            <div class="group">
                                <input placeholder="" type="text" value={amount} onChange={(e) => {
                                    if (!isNaN(e.target.value)) {
                                        setAmount(e.target.value)
                                    }
                                }} />
                                <label for="name">Year Amount</label>
                            </div>

                            <div class="group mt-4">
                                <input placeholder="" type="date" value={yearDate} onChange={(e) => {
                                    console.log(e.target.value)
                                    setYearDate(e.target.value)
                                }} />
                                <label for="name">Year Date /  (mm/dd/yyyy)</label>
                            </div>

                            <button type="submit" onClick={UpdateYearIncome}>Submit</button>
                        </form>
                    </div>

                </div>
            </section>
        </>
    )
}

export default EditYear