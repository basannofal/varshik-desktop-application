import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";

const AllIncome = () => {
    const [income, setIncome] = useState([]);
    const [incomeCategory, setIncomeCategory] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    const [order, setOrder] = useState("ASC");

    const sorting = (col) => {
        if (order === "ASC") {
            const sorted = [...income].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setIncome(sorted);
            setOrder("DSC")
        }

        if (order === "DSC") {
            const sorted = [...income].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setIncome(sorted);
            setOrder("ASC")
        }
    }

    const getData = async () => {
        try {
            const res = await axios.get(`/getincome`);
            setIncome(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getICategory = async () => {
        try {
            const res = await axios.get('/getincomecategory');
            setIncomeCategory(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
        getICategory();
    }, []);

    const deleteIncome = async (id) => {
        try {
            console.log(id);
            if (window.confirm("Are you sure you want to delete this records")) {
                const res = await axios.delete(`/deleteincome/${id}`);

                getData();
            }
        } catch (error) {
            window.alert(error);
        }
    };

    const itemPerPage = 2;

    const numberOfPage = Math.ceil(income.length / itemPerPage);
    const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const rows = income.slice(
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
                            <NavLink to={`/addincome`} style={{ textDecoration: "none" }}>
                                <button
                                    className="btn btn-primary d-flex "
                                    style={{ justifyContent: "center", alignItems: "center" }}
                                >
                                    <i
                                        class="uil uil-plus mr-2"
                                        style={{ backgroundColor: "#007bff" }}
                                    ></i>
                                    Add New Income
                                </button>
                            </NavLink>

                            <NavLink to={`/addincomecategory`} style={{ textDecoration: "none", marginLeft: "30px" }}>
                                <button
                                    className="btn btn-primary d-flex "
                                    style={{ justifyContent: "center", alignItems: "center" }}
                                >
                                    <i
                                        class="uil uil-plus mr-2"
                                        style={{ backgroundColor: "#007bff" }}
                                    ></i>
                                    Add Income Category
                                </button>
                            </NavLink>
                        </div>
                    </div>

                    <div class="activity ">
                        <div class="title mt-0">
                            <i class="uil uil-clock-three"></i>
                            <span class="text">All Income</span>
                        </div>

                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th style={{ cursor: 'pointer' }} onClick={() => sorting("i_title")} >Title <i class="bi bi-funnel-fill"></i></th>
                                    <th style={{ cursor: 'pointer', width: "150px" }} onClick={() => sorting("i_disc")} >Discription <i class="bi bi-funnel-fill"></i></th>
                                    <th style={{ cursor: 'pointer' }} onClick={() => sorting("i_date")} >Date <i class="bi bi-funnel-fill"></i></th>
                                    <th style={{ cursor: 'pointer' }} onClick={() => sorting("i_collected_by")} >Collecte_by <i class="bi bi-funnel-fill"></i></th>
                                    <th style={{ cursor: 'pointer' }} onClick={() => sorting("i_payments")} >Payment <i class="bi bi-funnel-fill"></i></th>
                                    <th scope="col">Received Income</th>
                                    <th scope="col">Category ID</th>
                                    <th scope="col" className="text-center" colSpan={2}>Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.length > 0
                                    ? rows
                                        .filter((item) => {
                                            const searchTerm = searchFilter.toLowerCase();
                                            return (searchFilter.toLowerCase() === "" ? item : item.i_title.startsWith(searchTerm) || item.i_disc.startsWith(searchTerm) || item.i_collected_by.startsWith(searchTerm) || item.i_payments.startsWith(searchTerm))
                                        })

                                        .map((e, idx) => {
                                            let flag = 0;
                                            return (
                                                <>
                                                    <tr>
                                                        <th scope="row">{e.id}</th>
                                                        <td>{e.i_title}</td>
                                                        <td>{e.i_disc}</td>
                                                        <td>{e.i_date}</td>
                                                        <td>{e.i_collected_by}</td>
                                                        <td>{e.i_payments}</td>
                                                        <td>{e.i_received}</td>
                                                        <td>
                                                            {incomeCategory.map((x) => {
                                                                if (e.category_id === x.id) {
                                                                    flag = 1;
                                                                    return x.i_category
                                                                }
                                                            })}
                                                            {flag === 0 ? "null" : ""}
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() => {
                                                                    deleteIncome(e.id);
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <Link to="/editincome" state={{ id: e.id }}>
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

export default AllIncome;
