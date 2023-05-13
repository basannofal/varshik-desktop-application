import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";

const EditExpenses = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [id, setId] = useState("");
    const [etitle, setEtitle] = useState("");
    const [edisc, setEdisc] = useState("");
    const [edate, setEdate] = useState("");
    const [eexpenseby, setEexpenseby] = useState("");
    const [ereceived, setEreceived] = useState("");
    const [echeckcash, setEcheckcash] = useState("");
    const [categoryid, setCategoryid] = useState(Number);
    const [expense, setExpense] = useState([]);
    const [ep, setEp] = useState([]);

    const getData = async () => {
        try {
            const res = await axios.get(`/getexpcategory`);
            setExpense(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getPerExpenses = async () => {
        try {
            await axios.get(`/getperexpenses/${location.state.id}`).then((res) => {
                setEp(res.data)

                setId(res.data[0].id)
                setEtitle(res.data[0].e_title)
                setEdisc(res.data[0].e_disc)
                setEdate(res.data[0].e_date)
                setEexpenseby(res.data[0].e_collected_by)
                setEreceived(res.data[0].e_received)
                setEcheckcash(res.data[0].e_check_cash)
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
        getPerExpenses();
    }, []);

    const updateExpense = async (e) => {
        e.preventDefault();
        const team = {
            id: id,
            etitle: etitle,
            edisc: edisc,
            edate: edate,
            eexpenseby: eexpenseby,
            echeckcash: echeckcash,
            ereceived: ereceived,
            categoryid: categoryid,
        };
        console.log(team);
        try {
            await axios
                .put("/editexpenses", team)
                .then((res) => {
                    console.log(res);
                    window.alert("Expenses Updated Successfully");
                    navigate("/allexpenses", { replace: true });
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
                        <span class="title mt-2">Edit Expenses </span>
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
                                <label for="name">Expense ID</label>
                            </div>
                            <div class="group">
                                <input
                                    placeholder=""
                                    type="text"
                                    value={etitle}
                                    onChange={(e) => {
                                        setEtitle(e.target.value);
                                    }}
                                />
                                <label for="name">Expense Title</label>
                            </div>
                            <div class="group">
                                <input
                                    placeholder=""
                                    type="text"
                                    value={edisc}
                                    onChange={(e) => {
                                        setEdisc(e.target.value);
                                    }}
                                />
                                <label for="name">Expense Description</label>
                            </div>
                            <div class="group">
                                <input
                                    placeholder=""
                                    type="date"
                                    value={edate}
                                    onChange={(e) => {
                                        setEdate(e.target.value);
                                    }}
                                />
                                <label for="name">Expense Date</label>
                            </div>
                            <div class="group">
                                <input
                                    placeholder=""
                                    type="text"
                                    value={eexpenseby}
                                    onChange={(e) => {
                                        setEexpenseby(e.target.value);
                                    }}
                                />
                                <label for="name">Expense Collected by</label>
                            </div>

                            <div class="group">
                                <input
                                    placeholder=""
                                    type="number"
                                    value={ereceived}
                                    onChange={(e) => {
                                        setEreceived(e.target.value);
                                    }}
                                />
                                <label for="name">Received Expense</label>
                            </div>

                            <label className="my-2 mb-4">Expense Payment</label>
                            <div className="group">
                                <label for="exampleInputEmail1">Expense Payment</label>
                                <select
                                    name="e_check_cash"
                                    placeholder=""
                                    id="echeckcash"
                                    value={echeckcash}
                                    onChange={(e) => {
                                        setEcheckcash(e.target.value);
                                    }}
                                >
                                    <option value="" selected disabled>Select Payment Method</option>
                                    <option value="cash">💲 Cash</option>
                                    <option value="check">💶 Check</option>
                                    <option value="online">🤑 Online</option>
                                </select>
                            </div>

                            <label className="my-2 mb-4">Expnese Category ID</label>
                            <div className="group">
                                <label for="exampleInputEmail1">Expnese Category ID</label>
                                <select
                                    name="category_id"
                                    placeholder=""
                                    id="category_id"
                                    value={categoryid}
                                    onChange={(e) => {
                                        setCategoryid(e.target.value);
                                    }}
                                >
                                    <option value={''} selected disabled >Select Expense Category ID</option>
                                    {expense.map((e) => {
                                        return (
                                            <>
                                                <option value={e.id}>{e.e_category}</option>
                                            </>
                                        );
                                    })}
                                </select>
                            </div>
                            <button type="submit" onClick={updateExpense}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EditExpenses;
