import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import TransitionAlerts from "../../Component/TransitionAlerts";
import ConfirmDialog from "../../Component/ConfirmDialog";

const AllIncome = () => {
    const [income, setIncome] = useState([]);
    const [incomeCategory, setIncomeCategory] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredMembers, setfilteredMembers] = useState([]);


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
            const res = await axios.get(`${process.env.REACT_APP_URL}/getincome`);
            setIncome(res.data);
            setfilteredMembers(res.data)
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getICategory = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/getincomecategory`);
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




    // confirm box
    const [catId, setcatId] = useState('');
    const [deleteopen, setdeleteOpen] = useState(false);

    const handledeleteCloseDialog = () => {
        setdeleteOpen(false);
    };
    
    const handleDeleteClick = (id) => {
        setcatId(id);
        setdeleteOpen(true);
    };

    const deleteIncome = async () => {
        try {

            const res = await axios.delete(`${process.env.REACT_APP_URL}/deleteincome/${catId}`);

            getData();

        } catch (error) {
            displayAlert('Error', 'Income Not Deleted!', 'OK');
        }
        setdeleteOpen(false)
    };





    // search filter
    const filterMembers = () => {
        return income.filter((item) => {
            const searchTerm = searchFilter.toLowerCase();
            const title = item.i_title.toLowerCase();
            const disc = item.i_disc.toLowerCase();
            const collectedBy = item.i_collected_by.toLowerCase();
            const payments = item.i_payments.toLowerCase();

            return (
                searchFilter === "" ||
                title.includes(searchTerm) ||
                disc.includes(searchTerm) ||
                collectedBy.includes(searchTerm) ||
                payments.includes(searchTerm)
            );
        });
    };


    useEffect(() => {
        setfilteredMembers(filterMembers())
        console.log(filterMembers());
    }, [searchFilter]);





    // pagination

    const itemPerPage = 4;

    const numberOfPage = Math.ceil(filteredMembers.length / itemPerPage);
    const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

    const handlePageChangeforpagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const rows = filteredMembers.slice(
        currentPage * itemPerPage,
        (currentPage + 1) * itemPerPage
    );



    // Alert Box
    const [openAlert, setOpenAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertActionText, setAlertActionText] = useState('');

    const handleAlertClose = () => {
        setOpenAlert(false);
    };

    const displayAlert = (title, message, actionText) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertActionText(actionText);
        setOpenAlert(true);
    };


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
                                                                    handleDeleteClick(e.id);
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
                            onClick={() => handlePageChangeforpagination(currentPage - 1)}
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
                                            onClick={() => handlePageChangeforpagination(page - 1)}
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
                            onClick={() => handlePageChangeforpagination(currentPage + 1)}
                        >
                            &gt;
                        </button>
                        <ConfirmDialog
                            open={deleteopen}
                            handleClose={handledeleteCloseDialog}
                            title="Confirmation Box ?"
                            message="Are You Sure for Delete This Income"
                            onAgree={deleteIncome}
                            onDisagree={handledeleteCloseDialog}
                        />
                        <TransitionAlerts
                            open={openAlert}
                            handleClose={handleAlertClose}
                            title={alertTitle}
                            message={alertMessage}
                            actionText={alertActionText}
                        />
                    </div>

                </div>
            </section>
        </>
    );
};

export default AllIncome;
