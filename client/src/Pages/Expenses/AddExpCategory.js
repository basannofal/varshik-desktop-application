import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import TransitionAlerts from "../../Component/TransitionAlerts";
import ConfirmDialog from "../../Component/ConfirmDialog";

const AddExpCategory = () => {
    const navigate = useNavigate();
    const [expCategory, setExpCategory] = useState("");
    const [expSubCategory, setExpSubCategory] = useState(null);
    const [expense, setExpense] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [order, setOrder] = useState("ASC");
    const [catId, setcatId] = useState('');


    // sorting
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


    // get data
    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/getexpcategory`);
            setExpense(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    // save data
    const savedata = async (e) => {
        e.preventDefault();
        const team = {
            expCategory: expCategory,
            expSubCategory: expSubCategory,
        };
        console.log(team);
        try {
            await axios.post(`${process.env.REACT_APP_URL}/addexpcategory`, team)
                .then((res) => {
                    console.log(res);
                    displayAlert('Success', 'Category Added Successfully !', 'OK');
                    getData()
                })
                .catch((e) => {
                    console.log(e);
                    displayAlert('Error', 'Category Not Added!', 'OK');
                });
        } catch (error) {
            displayAlert('Error', 'Category Not Added!', 'OK');
            console.log(error);
        }
    };




    // confirm box
    const [open, setOpen] = useState(false);

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleDeleteClick = (id) => {
        setcatId(id);
        setOpen(true);
    };

    const deleteExpCategory = async () => {
        try {

            const res = await axios.delete(`${process.env.REACT_APP_URL}/deleteexpcategory/${catId}`);
            getData();

        } catch (error) {
            displayAlert('Error', 'Category Not Deleted!', 'OK');
        }

        setOpen(false)


    }

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
                                    <span class="text">All Expense Category</span>
                                </div>

                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th style={{ cursor: 'pointer' }} onClick={() => sorting("e_category")} >Expense Category <i class="bi bi-funnel-fill"></i></th>
                                            <th scope="col">Expense Sub Category</th>
                                            <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expense.length > 0
                                            ? expense.filter((item) => {

                                                return (
                                                    searchFilter.toLowerCase() === "" ? item : item.e_category.toLowerCase().includes(searchFilter)
                                                )
                                            })

                                                .map((e, idx) => {
                                                    let flag = 0;
                                                    return (
                                                        <>
                                                            <tr>
                                                                <th scope="row">{e.id}</th>
                                                                <td>{e.e_category}</td>
                                                                <td>
                                                                    {expense.map((x) => {
                                                                        if (e.e_subcategory === x.id) {
                                                                            flag = 1;
                                                                            return x.e_category;
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
                            <span class="title mt-2">Add New Expenses Category </span>
                            <form class="form">
                                <div class="group">
                                    <input
                                        placeholder=""
                                        type="text"
                                        value={expCategory}
                                        onChange={(e) => {
                                            setExpCategory(e.target.value);
                                        }}
                                    />
                                    <label for="name">Expenses Category Name</label>
                                </div>
                                <label className="my-2 mb-4">Expenses Sub Category</label>
                                <div className="group">
                                    <label for="exampleInputEmail1">Expenses Sub Category</label>
                                    <select
                                        name="e_subcategory"
                                        placeholder=""
                                        id="e_subcategory"
                                        value={expSubCategory}
                                        onChange={(e) => {
                                            setExpSubCategory(e.target.value);
                                        }}
                                    >
                                        <option value="Null">Null</option>
                                        {expense.map((e) => {
                                            return (
                                                <>
                                                    <option value={e.id}>{e.e_category}</option>
                                                </>
                                            );
                                        })}
                                    </select>
                                </div>

                                <TransitionAlerts
                                    open={openAlert}
                                    handleClose={handleAlertClose}
                                    title={alertTitle}
                                    message={alertMessage}
                                    actionText={alertActionText}
                                />
                                <ConfirmDialog
                                    open={open}
                                    handleClose={handleCloseDialog}
                                    title="Confirmation Box ?"
                                    message="Are You Sure for Delete This Category"
                                    onAgree={deleteExpCategory}
                                    onDisagree={handleCloseDialog}
                                />
                                <button type="submit" onClick={savedata}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddExpCategory;
