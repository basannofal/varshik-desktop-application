import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";

const AllExpenses = () => {
    const [expense, setExpense] = useState([]);
    const [expcategory, setExpCategory] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    const [order, setOrder] = useState("ASC");

    console.log(categoryFilter);

    const sorting = (col) => {
        if (order === "ASC") {
            const sorted = [...expense].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setExpense(sorted);
            setOrder("DSC")
        }

        if (order === "DSC") {
            const sorted = [...expense].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setExpense(sorted);
            setOrder("ASC")
        }
    }

    const getData = async () => {
        try {
            const res = await axios.get(`/getexpenses`);
            setExpense(res.data);
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
    }, []);

    const deleteExpenses = async (id) => {
        try {
            console.log(id);
            if (window.confirm("Are you sure you want to delete this records")) {
                const res = await axios.delete(`/deleteexpenses/${id}`);

                getData();
            }
        } catch (error) {
            window.alert(error);
        }
    };

    const itemPerPage = 3;

    const numberOfPage = Math.ceil(expense.length / itemPerPage);
    const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const rows = expense.slice(
        currentPage * itemPerPage,
        (currentPage + 1) * itemPerPage
    );


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
                            onChange={(e) => {
                                setSearchFilter(e.target.value);
                            }}
                            value={searchFilter}
                        />
                    </div>
                </div>

                <div class="dash-content  pt-3">
                    <div class="overview">


                        <div
                            class="title"
                            style={{ display: "flex", justifyContent: "right" }}
                        >
                            <div class="group">
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    style={{
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid rgba(0, 0, 0, 0.2)',
                                        outline: '0',
                                        fontSize: '16px',
                                        width: '15rem',
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    <option value=''>All categories</option>
                                    {expcategory.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.e_category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <NavLink to={`/generatereport`} style={{ textDecoration: "none", marginLeft: "30px" }}>
                                <button
                                    className="btn btn-primary d-flex "
                                    style={{ justifyContent: "center", alignItems: "center" }}
                                >
                                    <i
                                        class="bi bi-journal-check mr-2"
                                        style={{ backgroundColor: "#007bff" }}
                                    ></i>
                                    Generate Reports
                                </button>
                            </NavLink>

                            <NavLink to={`/addexpenses`} style={{ textDecoration: "none", marginLeft: "30px" }}>
                                <button
                                    className="btn btn-primary d-flex "
                                    style={{ justifyContent: "center", alignItems: "center" }}
                                >
                                    <i
                                        class="uil uil-plus mr-2"
                                        style={{ backgroundColor: "#007bff" }}
                                    ></i>
                                    Add New Expenses
                                </button>
                            </NavLink>

                            <NavLink to={`/addexpcategory`} style={{ textDecoration: "none", marginLeft: "30px" }}>
                                <button
                                    className="btn btn-primary d-flex "
                                    style={{ justifyContent: "center", alignItems: "center" }}
                                >
                                    <i
                                        class="uil uil-plus mr-2"
                                        style={{ backgroundColor: "#007bff" }}
                                    ></i>
                                    Add Expenses Category
                                </button>
                            </NavLink>
                        </div>
                    </div>

                    <div class="activity ">
                        <div class="title mt-0">
                            <i class="uil uil-clock-three"></i>
                            <span class="text">All Expenses</span>
                        </div>

                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th style={{ cursor: 'pointer' }} onClick={() => sorting("e_title")} >Title <i class="bi bi-funnel-fill"></i></th>
                                    <th style={{ cursor: 'pointer', width: "150px" }} onClick={() => sorting("e_disc")} >Discription <i class="bi bi-funnel-fill"></i></th>
                                    <th style={{ cursor: 'pointer' }} onClick={() => sorting("e_date")} >Date <i class="bi bi-funnel-fill"></i></th>
                                    <th style={{ cursor: 'pointer' }} onClick={() => sorting("e_expense_by")} >Expense By <i class="bi bi-funnel-fill"></i></th>
                                    <th style={{ cursor: 'pointer' }} onClick={() => sorting("e_check_cash")} >Payment <i class="bi bi-funnel-fill"></i></th>
                                    <th scope="col">Received Expense</th>
                                    <th scope="col">Expense Category</th>
                                    <th scope="col" className="text-center" colSpan={2}>Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.length > 0
                                    ? rows
                                        .filter((item) => {
                                            // console.log(item);
                                            // const searchTerm = searchFilter.toLowerCase();
                                            // return (searchFilter.toLowerCase() === "" ? item : item.e_title.startsWith(searchTerm) || item.e_disc.startsWith(searchTerm) || item.e_expense_by.startsWith(searchTerm) || item.e_check_cash.startsWith(searchTerm) )
                                            // console.log(categoryFilter);
                                            // console.log(item.category_id);
                                            // return (
                                            //     item.category_id == categoryFilter ? item : item
                                            // )
                                            if(item.category_id == categoryFilter) {
                                                console.log(item);
                                                return (
                                                    item 
                                                )
                                            }
                                            if(categoryFilter == ''){
                                                return item
                                            }

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
                                                        <td>{e.e_expense_by}</td>
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
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() => {
                                                                    deleteExpenses(e.id);
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <Link to="/editexpenses" state={{ id: e.id }}>
                                                                <button className="btn btn-success">
                                                                    Edit
                                                                </button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                </>
                                            );
                                        })
                                    : ""}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination" style={{ display: "flex", justifyContent: "right", marginRight: "2rem" }}>
                        <button
                            disabled={currentPage < 1}
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            &lt;
                        </button>
                        {pageIndex
                            .slice(
                                Math.max(0, currentPage - 2),
                                Math.min(numberOfPage, currentPage + 3)
                            )
                            .map((page) => {
                                return (
                                    <>
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page - 1)}
                                            className={page === currentPage + 1 ? "active page-link bg-primary text-white" : "page-link"}
                                        >
                                            {page}
                                        </button>
                                    </>
                                )
                            })
                        }
                        <button
                            disabled={currentPage >= numberOfPage - 1}
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            &gt;
                        </button>
                    </div>

                </div>
            </section>
        </>
    );
};

export default AllExpenses;
