import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../../Layout/Sidebar'


const AllYearlyIncome = () => {

    const [allyear, setAllyear] = useState([]);

    const getData = async () => {
        try {
            const res = await axios.get(`/getyear`)
            setAllyear(res.data)
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getData()
    }, []);

    const deleteYear = async (id) => {
        try {

            
            console.log(id);
            const res = await axios.delete(`/deleteyear/${id}`)


            getData()
        } catch (error) {
            window.alert(error)
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

                <div class="dash-content  pt-3" >
                    <div class="overview" >
                        <div class="title" style={{ display: "flex", justifyContent: "right" }}>
                            <NavLink to={`/addyear`} style={{ textDecoration: "none" }}>
                                <button className='btn btn-primary d-flex ' style={{ justifyContent: "center", alignItems: "center" }}>
                                    <i class="uil uil-plus mr-2" style={{ backgroundColor: "#007bff" }}></i>
                                    Add New Year
                                </button>
                            </NavLink>
                        </div>

                        {/* <div class="boxes">
            <div class="box box1">
              <i class="uil uil-thumbs-up"></i>
              <span class="text">Total Likes</span>
              <span class="number">50,120</span>
            </div>
            <div class="box box2">
              <i class="uil uil-comments"></i>
              <span class="text">Comments</span>
              <span class="number">20,120</span>
            </div>
            <div class="box box3">
              <i class="uil uil-share"></i>
              <span class="text">Total Share</span>
              <span class="number">10,120</span>
            </div>
          </div> */}
                    </div>

                    <div class="activity ">
                        <div class="title mt-0">
                            <i class="uil uil-clock-three"></i>
                            <span class="text">All Yearly Income</span>
                        </div>



                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allyear.map((e, idx) => {
                                        var d = new Date(e.year_date);
                                        var yyyy = d.getUTCFullYear() // Year
                                        var mm = (d.getUTCMonth() + 1);
                                        var dd = d.getUTCDate();
                                        return (
                                            <>
                                                <tr>
                                                    <th scope="row">{e.id}</th>
                                                    <td>{e.amount}</td>
                                                    <td>{`${dd}-${mm}-${yyyy}`}</td>
                                                    <td><button className='btn btn-danger' disabled onClick={() => { deleteYear(e.id) }}>Delete</button></td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>





                    </div>
                </div>
            </section>

        </>
    )
}

export default AllYearlyIncome