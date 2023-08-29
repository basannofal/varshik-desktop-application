import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import TransitionAlerts from "../../Component/TransitionAlerts";

const EditClan = () => {

    const {id} = useParams("");

    const navigate = useNavigate();
    const [clanName, setClanName] = useState("");
    const [parentClan, setParentClan] = useState(null);
    const [clan, setClan] = useState([]);
    

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/getperclan/${id}`);
            setClanName(res.data[0].clan_name)
            setParentClan(res.data[0].parent_clan)
            console.log(res.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    
    const getAllClan = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/getclan`);
            console.log(res.data);
            setClan(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
        getAllClan()
    }, []);


    // save data
    const UpdateClan = async (e) => {
        e.preventDefault();
        console.log(parentClan);
        const team = {
            clanName: clanName,
            parentClan: parentClan,
        };
        console.log(team);
        try {
            await axios.patch(`${process.env.REACT_APP_URL}/editclan/${id}`, team)
                .then((res) => {
                    console.log(res);
                    displayAlert('Success', 'Clan Updated successfully!', 'OK');
                    navigate("/allclan", { replace: true });
                })
                .catch((e) => {
                    displayAlert('Error', 'Clan Not Updated!', 'Please Try Again');
                    console.log(e);
                });
        } catch (error) {
            console.log(error);
        }
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
                        <input type="text" placeholder="Search here..." />
                    </div>
                </div>

                <div class="dash-content   mt-5">
                    <div class="card">
                        <span class="title mt-2">Add New Clan </span>
                        <form class="form">
                            <div class="group">
                                <input
                                    placeholder=""
                                    type="text"
                                    value={clanName}
                                    onChange={(e) => {
                                        setClanName(e.target.value);
                                    }}
                                />
                                <label for="name">Clan Name</label>
                            </div>
                            <label className="my-2 mb-4">Parent Clan</label>
                            <div className="group">
                                <label for="exampleInputEmail1">Parent Clan</label>
                                <select
                                    name="parentclan"
                                    placeholder=""
                                    id="parentclan"
                                    value={parentClan}
                                    onChange={(e) => {
                                        setParentClan(e.target.value);
                                        console.log(parentClan);
                                    }}
                                >
                                    <option value="Null">Null</option>
                                    {clan.map((e) => {
                                        if(e.id == id){
                                            return
                                        }
                                        return (
                                            <>
                                                <option value={e.id}>{e.clan_name}</option>
                                            </>
                                        );
                                    })}
                                </select>
                            </div>
                            <button type="submit" onClick={UpdateClan}>
                                Submit
                            </button>
                        </form>
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

}

export default EditClan