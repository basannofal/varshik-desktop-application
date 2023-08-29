import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Sidebar from '../../Layout/Sidebar'
import TransitionAlerts from "../../Component/TransitionAlerts";
import CustomPrompt from "../../Component/CustomPrompt";



const AllYearlyIncome = () => {

    const [allyear, setAllyear] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/getyear`)
            setAllyear(res.data)
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getData()
    }, []);

    // const deleteYear = async (id) => {
    //     try {


    //         console.log(id);
    //         const res = await axios.delete(`${process.env.REACT_APP_URL}/deleteyear/${id}`)


    //         getData()
    //     } catch (error) {

    //         console.log(error);
    //     }
    // }



    // prompt
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [obid, setobid] = React.useState('');


    const deleteYear = (id) => {
        setDialogOpen(true);
        setobid(id)
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleAgreeDialog = async (value) => {
        if (value === '1234') {
            try {

                const res = await axios.delete(`${process.env.REACT_APP_URL}/deleteyear/${obid}`)
                getData()
                displayAlert('Success', 'Year Income Deleted Successfully !', 'OK');
            } catch (error) {
                setDialogOpen(false)
                displayAlert('Error', 'Year Income Not Deleted !', 'OK');
            }
        } else {
            displayAlert('Error', 'Incorrect Captcha!', 'Please Try Again');
        }
        setDialogOpen(false);
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

    const convertToLocaleDate = (utcDate) => {
        const date = new Date(utcDate);
        const timezoneOffset = date.getTimezoneOffset();
        date.setMinutes(date.getMinutes() - timezoneOffset);
        console.log(date)
        return date;
      };
    return (
        <>
            <Sidebar />
            <section class="dashboard">
                <div class="top">
                    <i class="uil uil-bars sidebar-toggle" ></i>

                    <div class="search-box">
                        <i class="uil uil-search"></i>
                        <input type="text" placeholder="Search here..." />
                    </div>

                </div>

                <div class="dash-content  pt-3" >
                    <div class="overview" >
                        <div class="title" style={{ display: "flex", justifyContent: "right" }}>
                            <NavLink to={`/addyear`} style={{ textDecoration: "none" }}>
                                <button className='btn btn-primary d-flex ' style={{ justifyContent: "center", alignItems: "center" }}>
                                    <i class="uil uil-plus mr-2" style={{ backgroundColor: "#007bff" }}></i>
                                    Add New Year
                                </button>
                            </NavLink>
                        </div>

                        {/* <div class="boxes">
            <div class="box box1">
              <i class="uil uil-thumbs-up"></i>
              <span class="text">Total Likes</span>
              <span class="number">50,120</span>
            </div>
            <div class="box box2">
              <i class="uil uil-comments"></i>
              <span class="text">Comments</span>
              <span class="number">20,120</span>
            </div>
            <div class="box box3">
              <i class="uil uil-share"></i>
              <span class="text">Total Share</span>
              <span class="number">10,120</span>
            </div>
          </div> */}
                    </div>

                    <div class="activity ">
                        <div class="title mt-0">
                            <i class="uil uil-clock-three"></i>
                            <span class="text">All Yearly Income</span>
                        </div>



                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allyear.map((e, idx) => {

                                       
                                        var d = new Date(e.year_date);
                                    //    var d=convertToLocaleDate(date);
                                        var yyyy = d.getFullYear() // Year
                                        console.log(yyyy, d.getUTCFullYear())
                                        var mm = (d.getMonth() );
                                        console.log(mm , d.getUTCMonth())
                                        var dd = d.getDate();
                                        console.log(dd ,d.getUTCDate())
                                        return (
                                            <>
                                                <tr>
                                                    <th scope="row">{e.id}</th>
                                                    <td>{e.amount}</td>
                                                    <td>{`${dd}-${mm}-${yyyy}`}</td>
                                                    {/* <td>{d}</td> */}
                                                    <td>
                                                        <button className='btn btn-primary' onClick={() => { navigate(`/edityearincome/${e.id}`) }}>Edit</button>
                                                        <button className='btn btn-danger ml-3' onClick={() => { deleteYear(e.id) }}>Delete</button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                        <CustomPrompt
                            message="If you want to delete, enter 1234"
                            open={dialogOpen}
                            onClose={handleCloseDialog}
                            onAgree={handleAgreeDialog}
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
    )
}

export default AllYearlyIncome