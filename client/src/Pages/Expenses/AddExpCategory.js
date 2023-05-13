import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";

const AddExpCategory = () => {
    const navigate = useNavigate();
    const [expCategory, setExpCategory] = useState("");
    const [expSubCategory, setExpSubCategory] = useState(null);
    const [expense, setExpense] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [order, setOrder] = useState("ASC");

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
            const res = await axios.get(`/getexpcategory`);
            setExpense(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const savedata = async (e) => {
        e.preventDefault();
        const team = {
            expCategory: expCategory,
            expSubCategory: expSubCategory,
        };
        console.log(team);
        try {
            await axios
                .post("/addexpcategory", team)
                .then((res) => {
                    console.log(res);
                    window.alert("Expense Category Added Successfully");
                    window.location.reload();
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (error) {
            console.log(error);
        }
    };


    const deleteExpCategory = async (id) => {
        try {
            console.log(id);
            if (window.confirm("Are you sure you want to delete this record")) {
                const res = await axios.delete(`/deleteexpcategory/${id}`);
                getData();
            }
        } catch (error) {
            window.alert(error);
        }


    }

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
                                                                            deleteExpCategory(e.id);
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
