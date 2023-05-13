import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";

const GenerateReport = () => {
    const [expense, setExpense] = useState([]);
    const [generate, setGenerateReport] = useState([]);
    const [expcategory, setExpCategory] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    // const [categoryFilter, setCategoryFilter] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("")

    const getData = async () => {
        try {
            const res = await axios.get(`/getgenerateexpenses`);
            setGenerateReport(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getECategory = async () => {
        try {
            const res = await axios.get('/getexpcategory');
            setExpCategory(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
        getECategory();
        // generate();
    }, []);

    return (
        <>
            <Sidebar />
            <section class="dashboard">
                <div class="top">
                    <i class="uil uil-bars sidebar-toggle"></i>

                    <div class="search-box">
                        <i class="uil uil-search"></i>
                        <input
                            type="search"
                            placeholder="Search here..."
                        />
                    </div>
                </div>

                <div class="dash-content mt-5">
                    <div class="row" style={{ display: "flex" }}>
                        <h5 class="pt-2 pl-5">Filter by Date : </h5>
                        <div class="group ml-5">
                            <input
                                placeholder=""
                                type="date"
                                value={startDate}
                                onChange={(e) => {
                                    setStartDate(e.target.value);
                                }}
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid rgba(0, 0, 0, 0.2)',
                                    marginBottom: '20px',
                                    outline: '0',
                                    width: '20rem',
                                    backgroundColor: 'transparent'
                                }}
                            />
                            <label style={{
                                fontSize: '14px',
                                color: 'rgb(99, 102, 102)',
                                position: 'absolute',
                                top: '-10px',
                                left: '10px',
                                backgroundColor: '#fff',
                                transition: 'all .3s ease'
                            }}>Start Date</label>
                        </div>

                        <div class="group ml-4">
                            <input
                                placeholder=""
                                type="date"
                                value={endDate}
                                onChange={(e) => {
                                    setEndDate(e.target.value);
                                }}
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid rgba(0, 0, 0, 0.2)',
                                    marginBottom: '20px',
                                    outline: '0',
                                    width: '20rem',
                                    backgroundColor: 'transparent'
                                }}
                            />
                            <label style={{
                                fontSize: '14px',
                                color: 'rgb(99, 102, 102)',
                                position: 'absolute',
                                top: '-10px',
                                left: '10px',
                                backgroundColor: '#fff',
                                transition: 'all .3s ease'
                            }}> End Date</label>
                        </div>
                    </div>

                    <div class="activity ">
                        <div class="title mt-5">
                            <i class="bi bi-journal-check"></i>
                            <span class="text">Expense Reports</span>
                        </div>


                        <div
                            style={{
                                maxWidth: "800px",
                                margin: "20px auto",
                                backgroundColor: "#ffffff",
                                padding: "20px",
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <div className="row d-flex">
                                <h1 style={{ fontSize: "24px", marginBottom: "20px", marginLeft: "1rem " }}>Valudas Expense Report</h1>
                                <span style={{ marginLeft: "16rem ", marginTop: "5px" }}>{`${startDate} / ${endDate}`}</span>
                            </div>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                        <th
                                            style={{
                                                padding: "10px",
                                                borderBottom: "1px solid #dddddd",
                                                backgroundColor: "#f9f9f9",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Category
                                        </th>
                                        <th
                                            style={{
                                                padding: "10px",
                                                borderBottom: "1px solid #dddddd",
                                                backgroundColor: "#f9f9f9",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {generate.length > 0 ?

                                        generate.filter((item) => {
                                            const searchTerm = searchFilter.toLowerCase();
                                            const dateFilter = item.e_date >= startDate && item.e_date <= endDate;

                                            return (searchFilter.toLowerCase() === "" ? dateFilter : (item.e_title.startsWith(searchTerm)))
                                        })

                                            .map((item) => {
                                                let flag = 0;
                                                let nameofit = expcategory.map((x) => {
                                                    if (item.category_id === x.id) {
                                                        flag = 1;
                                                        return x.e_category
                                                    }
                                                })
                                                return (
                                                    <>
                                                        <tr>
                                                            <td style={{ padding: "10px", borderBottom: "1px solid #dddddd" }}>
                                                                {nameofit}
                                                                {flag === 0 ? "null" : ""}
                                                            </td>
                                                            <td style={{ padding: "10px", borderBottom: "1px solid #dddddd" }}>
                                                                {item.e_received}
                                                            </td>
                                                        </tr>
                                                    </>
                                                )


                                            }) : ""}
                                </tbody>
                            </table>
                        </div>

                        {/* <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Discription</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Expense_by</th>
                                    <th scope="col">Payment</th>
                                    <th scope="col">Received Expense</th>
                                    <th scope="col">Category ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expense.length > 0
                                    ? expense
                                        .filter((item) => {
                                            const searchTerm = searchFilter.toLowerCase();
                                            const dateFilter = item.e_date >= startDate && item.e_date <= endDate;

                                            return (searchFilter.toLowerCase() === "" ? dateFilter : (item.e_title.startsWith(searchTerm) || item.e_disc.startsWith(searchTerm) || item.e_collected_by.startsWith(searchTerm) || item.e_check_cash.startsWith(searchTerm)))
                                        })

                                        .map((e, idx) => {
                                            let flag = 0;
                                            return (
                                                <>
                                                    <tr>
                                                        <th scope="row">{e.id}</th>
                                                        <td>{e.e_title}</td>
                                                        <td>{e.e_disc}</td>
                                                        <td>{e.e_date}</td>
                                                        <td>{e.e_collected_by}</td>
                                                        <td>{e.e_check_cash}</td>
                                                        <td>{e.e_received}</td>
                                                        <td>
                                                            {expcategory.map((x) => {
                                                                if (e.category_id === x.id) {
                                                                    flag = 1;
                                                                    return x.e_category
                                                                }
                                                            })}
                                                            {flag === 0 ? "null" : ""}
                                                        </td>
                                                    </tr>
                                                </>
                                            );
                                        })
                                    : ""}
                            </tbody>
                        </table> */}
                    </div>
                </div>
            </section >
        </>
    );
};

export default GenerateReport;
