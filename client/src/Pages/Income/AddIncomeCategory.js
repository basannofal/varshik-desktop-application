import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import TransitionAlerts from "../../Component/TransitionAlerts";
import ConfirmDialog from "../../Component/ConfirmDialog";

const AddIncomeCategory = () => {
    const navigate = useNavigate();
    const [incomeCategory, setIncomeCategory] = useState("");
    const [incomeSubCategory, setIncomeSubCategory] = useState(null);
    const [income, setIncome] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
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
            const res = await axios.get(`${process.env.REACT_APP_URL}/getincomecategory`);
            setIncome(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    //save data
    const savedata = async (e) => {
        e.preventDefault();
        const team = {
            incomeCategory: incomeCategory,
            incomeSubCategory: incomeSubCategory,
        };
        console.log(team);
        try {
            await axios.post(`${process.env.REACT_APP_URL}/addincomecategory`, team).then((res) => {
                console.log(res);
                displayAlert('Success', 'Income Added Successfully!', 'OK');
                getData()
            })
                .catch((e) => {
                    console.log(e);
                    displayAlert('Error', 'Income Not Added!', 'OK');
                });
        } catch (error) {
            displayAlert('Error', 'Income Not Added!', 'OK');
        }
    };



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

    const deleteIncomeCategory = async () => {
        try {

            const res = await axios.delete(`${process.env.REACT_APP_URL}/deleteincomecategory/${catId}`);

            getData();

        } catch (error) {
            displayAlert('Error', 'Income Not Deleted!', 'OK');
        }
        setdeleteOpen(false)
    };


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

                <div class="row">
                    <div class="dash-content col-lg-6 mt-5">
                        <div className="card">
                            <div class="activity ">
                                <div class="title mt-0">
                                    <i class="uil uil-clock-three"></i>
                                    <span class="text">All Income Category</span>
                                </div>

                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th style={{ cursor: 'pointer' }} onClick={() => sorting("i_category")} >Income Category <i class="bi bi-funnel-fill"></i></th>
                                            <th scope="col">Income Sub Category</th>
                                            <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {income.length > 0
                                            ? income.filter((item) => {

                                                return (
                                                    searchFilter.toLowerCase() === "" ? item : item.i_category.toLowerCase().includes(searchFilter)
                                                )
                                            })

                                                .map((e, idx) => {
                                                    let flag = 0;
                                                    return (
                                                        <>
                                                            <tr>
                                                                <th scope="row">{e.id}</th>
                                                                <td>{e.i_category}</td>
                                                                <td>
                                                                    {income.map((x) => {
                                                                        if (e.i_subcategory === x.id) {
                                                                            flag = 1;
                                                                            return x.i_category;
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
                                                            </tr>
                                                        </>
                                                    );
                                                })
                                            : ""}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="dash-content col-lg-6 mt-5">
                        <div class="card">
                            <span class="title mt-2">Add New Income Category </span>
                            <form class="form">
                                <div class="group">
                                    <input
                                        placeholder=""
                                        type="text"
                                        value={incomeCategory}
                                        onChange={(e) => {
                                            setIncomeCategory(e.target.value);
                                        }}
                                    />
                                    <label for="name">Income Category Name</label>
                                </div>
                                <label className="my-2 mb-4">Income Sub Category</label>
                                <div className="group">
                                    <label for="exampleInputEmail1">Income Sub Category</label>
                                    <select
                                        name="i_subcategory"
                                        placeholder=""
                                        id="i_subcategory"
                                        value={incomeSubCategory}
                                        onChange={(e) => {
                                            setIncomeSubCategory(e.target.value);
                                        }}
                                    >
                                        <option value="Null">Null</option>
                                        {income.map((e) => {
                                            return (
                                                <>
                                                    <option value={e.id}>{e.i_category}</option>
                                                </>
                                            );
                                        })}
                                    </select>
                                </div>
                                <button type="submit" onClick={savedata}>
                                    Submit
                                </button>
                                <ConfirmDialog
                                    open={deleteopen}
                                    handleClose={handledeleteCloseDialog}
                                    title="Confirmation Box ?"
                                    message="Are You Sure for Delete This Category"
                                    onAgree={deleteIncomeCategory}
                                    onDisagree={handledeleteCloseDialog}
                                />
                                <TransitionAlerts
                                    open={openAlert}
                                    handleClose={handleAlertClose}
                                    title={alertTitle}
                                    message={alertMessage}
                                    actionText={alertActionText}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddIncomeCategory;
