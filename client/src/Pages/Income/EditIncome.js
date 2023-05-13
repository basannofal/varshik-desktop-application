import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";

const EditIncome = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [id, setId] = useState("");
    const [ititle, setItitle] = useState("");
    const [idisc, setIdisc] = useState("");
    const [idate, setIdate] = useState("");
    const [icollectedby, setIcollectedby] = useState("");
    const [ipayments, setIpayments] = useState("");
    const [ireceived, setIreceived] = useState("");
    const [categoryid, setCategoryid] = useState("");
    const [incomeCategory, setIncomeCategory] = useState([]);
    const [income, setIncome] = useState([]);
    const getData = async () => {
        try {
            const res = await axios.get(`/getincomecategory`);
            setIncomeCategory(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getPerIncome = async () => {
        try {
            await axios.get(`/getperincome/${location.state.id}`).then((res) => {
                setIncome(res.data)

                setId(res.data[0].id)
                setItitle(res.data[0].i_title)
                setIdisc(res.data[0].i_disc)
                setIdate(res.data[0].i_date)
                setIcollectedby(res.data[0].i_collected_by)
                setIpayments(res.data[0].i_payments)
                setIreceived(res.data[0].i_received)
                setCategoryid(res.data[0].category_id)

            }).catch((e) => {
                console.log(e);
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
        getPerIncome();
    }, []);

    const updateIncome = async (e) => {
        e.preventDefault();
        const team = {
            id: id,
            ititle: ititle,
            idisc: idisc,
            idate: idate,
            icollectedby: icollectedby,
            ipayments: ipayments,
            ireceived: ireceived,
            categoryid: categoryid,
        };
        console.log(team);
        try {
            await axios
                .put("/editincome", team)
                .then((res) => {
                    console.log(res);
                    window.alert("Income Updated Successfully");
                    navigate("/allincome", { replace: true });
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Sidebar />
            <section class="dashboard">
                <div class="top">
                    <i class="uil uil-bars sidebar-toggle"></i>

                    <div class="search-box">
                        <i class="uil uil-search"></i>
                        <input type="text" placeholder="Search here..." />
                    </div>
                </div>

                <div class="dash-content mt-5">
                    <div class="card">
                        <span class="title mt-2">Edit Income </span>
                        <form class="form">
                            <div class="group">
                                <input
                                    placeholder=""
                                    type="text"
                                    value={id}
                                    onChange={(e) => {
                                        setId(e.target.value);
                                    }}
                                    readOnly="readonly"
                                />
                                <label for="name">Income ID</label>
                            </div>
                            <div class="group">
                                <input
                                    placeholder=""
                                    type="text"
                                    value={ititle}
                                    onChange={(e) => {
                                        setItitle(e.target.value);
                                    }}
                                />
                                <label for="name">Income Title</label>
                            </div>
                            <div class="group">
                                <input
                                    placeholder=""
                                    type="text"
                                    value={idisc}
                                    onChange={(e) => {
                                        setIdisc(e.target.value);
                                    }}
                                />
                                <label for="name">Income Description</label>
                            </div>
                            <div class="group">
                                <input
                                    placeholder=""
                                    type="date"
                                    value={idate}
                                    onChange={(e) => {
                                        setIdate(e.target.value);
                                    }}
                                />
                                <label for="name">Income Date</label>
                            </div>
                            <div class="group">
                                <input
                                    placeholder=""
                                    type="text"
                                    value={icollectedby}
                                    onChange={(e) => {
                                        setIcollectedby(e.target.value);
                                    }}
                                />
                                <label for="name">Income Collected by</label>
                            </div>

                            <div class="group">
                                <input
                                    placeholder=""
                                    type="number"
                                    value={ireceived}
                                    onChange={(e) => {
                                        setIreceived(e.target.value);
                                    }}
                                />
                                <label for="name">Received Income</label>
                            </div>


                            <label className="my-2 mb-4">Income Payment</label>
                            <div className="group">
                                <label for="exampleInputEmail1">Income Payment</label>
                                <select
                                    name="i_payments"
                                    placeholder=""
                                    id="i_payments"
                                    value={ipayments}
                                    onChange={(e) => {
                                        setIpayments(e.target.value);
                                    }}
                                >
                                    <option value="" selected disabled>Select Payment Option</option>
                                    <option value="cash">💲 Cash</option>
                                    <option value="check">💶 Check</option>
                                    <option value="online">🤑 Online</option>
                                </select>
                            </div>

                            <label className="my-2 mb-4">Income Category ID</label>
                            <div className="group">
                                <label for="exampleInputEmail1">Income Category ID</label>
                                <select
                                    name="category_id"
                                    placeholder=""
                                    id="category_id"
                                    value={categoryid}
                                    onChange={(e) => {
                                        setCategoryid(e.target.value);
                                    }}
                                >
                                    <option value={''} selected disabled >Select Income Category ID</option>
                                    {incomeCategory.map((e) => {
                                        return (
                                            <>
                                                <option value={e.id}>{e.i_category}</option>
                                            </>
                                        );
                                    })}
                                </select>
                            </div>
                            <button type="submit" onClick={updateIncome}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EditIncome;
