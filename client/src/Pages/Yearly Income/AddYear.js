import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layout/Sidebar';

const AddYear = () => {

    const [amount, setAmount] = useState('');
    const [yearDate, setYearDate] = useState(Date);

    const savedata = async (e) => {
        e.preventDefault();
        const team = {
          amount: amount,
          yearDate: yearDate,
        }
        console.log(team);
        try {
          await axios.post('/addyear', team).then((res) => {
            console.log(res);
            window.alert("Year Added Successfully");
          }).catch((e) => {
            console.log(e);
          })
        } catch (error) {
          console.log(error);
        }
      }

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
                                <input placeholder="" type="Number" value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                                <label for="name">Year Amount</label>
                            </div>

                            <div class="group mt-4">
                                <input placeholder="" type="date" value={yearDate} onChange={(e) => { setYearDate(e.target.value) }} />
                                <label for="name">Year Date /  (mm/dd/yyyy)</label>
                            </div>

                            <button type="submit" onClick={savedata}>Submit</button>
                        </form>
                    </div>

                </div>
            </section>
        </>
    )
}

export default AddYear