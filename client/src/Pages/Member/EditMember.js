import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layout/Sidebar';
import TransitionAlerts from "../../Component/TransitionAlerts";

// import DatePicker from 'react-datepicker';

// import "react-datepicker/dist/react-datepicker.css";  

const EditMember = () => {

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [rollno, setRollno] = useState(0);
  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');
  const [gfname, setGfname] = useState('');
  const [gmname, setGmname] = useState('');
  const [glname, setGlname] = useState('');
  const [jdate, setJdate] = useState('');
  const [clanid, setClanid] = useState(0);
  const [clan, setClan] = useState([]);
  const [preEntry, setPreEntry] = useState(0);
  const [memberData, setMemberData] = useState([]);
  const [date, setDate] = useState('');
  const [isFakeName, setisFakeName] = useState(false);
  const [mobileNumber, setmobileNumber] = useState('');

  const location = useLocation();

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/getclan`)
      setClan(res.data)
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getDataPerMember = async () => {

    try {

      await axios.get(`${process.env.REACT_APP_URL}/getpermember/${location.state.id}`).then((res) => {

        setMemberData(res.data)

        setId(res.data[0].id)
        setRollno(res.data[0].roll_no)
        setFname(res.data[0].f_name)
        setMname(res.data[0].m_name)
        setLname(res.data[0].l_name)
        setGfname(res.data[0].g_f_name);
        setGmname(res.data[0].g_m_name);
        setGlname(res.data[0].g_l_name);
        setmobileNumber(res.data[0].m_number);
        setJdate(res.data[0].join_date_format)

        setClanid(res.data[0].clanid)

        setPreEntry(res.data[0].pre_entry)

        console.log(jdate)

      }).catch((e) => {
        console.log(e);

      })
    } catch (error) {
      console.log(error);
    }


  }
  useEffect(() => {
    console.log("data are" + location.state.id);
    getData();
    getDataPerMember();
    checkMemberData()
  }, []);



  const [memberExists, setMemberExists] = useState(false);

  const [checkMember, setCheckMember] = useState([]);

  const checkMemberData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/getmember`);
      setCheckMember(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };





  const updateData = async (e) => {
    e.preventDefault();
    if (preEntry === '') {
      setPreEntry(0)
    }


    // if (rollno <= 0 || rollno == '') {
    //   displayAlert('Error', 'Enter Correct Roll No!', 'OK');
    //   return;
    // }

    
    
    if(clanid == 0){
      displayAlert('Error', 'Select Clan!', 'OK');
      return;
    }


    // Check if member already exists with the same name
    const memberExists = checkMember.some(
      (member) =>
        // member.roll_no == rollno ||
        isFakeName ||
        (mname == '' || fname == '' || lname == '')
    );

    const team = {
      id: id,
      rollno: rollno,
      fname: fname,
      mname: mname,
      lname: lname,
      gfname: gfname,
      gmname: gmname,
      glname: glname,
      mobileNumber: mobileNumber,
      jdate: jdate,
      preEntry: preEntry,
      clanid: clanid,
    }
    console.log(team);
    setMemberExists(memberExists);
    if (memberExists) {
      displayAlert('Error', 'Member already exists. Please try again with a different name.', 'OK');
      return;
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_URL}/updateMember`, team).then((res) => {
          console.log(res);
          navigate('/allmember')
        }).catch((e) => {
          console.log(e);
          displayAlert('Error', 'Member Not Updated!', 'OK');
        })
      } catch (error) {
        console.log(error);
        displayAlert('Error', 'Member Not Updated!', 'OK');
      }
    }
  }


  useEffect(() => {

    const memberExists = checkMember.some(
      (member) =>
        member.id != id &&
        member.f_name.toLowerCase() === fname.trim().toLowerCase() &&
        member.m_name.toLowerCase() === mname.trim().toLowerCase() &&
        member.l_name.toLowerCase() === lname.trim().toLowerCase()
    );
    console.log(memberExists);
    setisFakeName(memberExists)
  }, [fname, lname, mname]);




  // gender 
  const handleGFChange = async (e) => {

    setGfname(e.target.value);
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
          <i class="uil uil-bars sidebar-toggle" ></i>

          <div class="search-box">
            <i class="uil uil-search"></i>
            <input type="text" placeholder="Search here..." />
          </div>

        </div>

        <div class="dash-content   mt-5" >
          <div class="card">
            <span class="title mt-2">Update Member </span>
            <form class="form">

              {/* <div class="group">
                <input placeholder="" type="text" value={rollno} readonly="readonly" onChange={(e) => { setRollno(e.target.value) }} />
                <label for="name" >Id </label>
              </div> */}
              <div class="group">
                {/* <input placeholder="" type="text" value={rollno} onChange={(e) => { setRollno(e.target.value) }} />
                <label for="name">Roll No</label> */}
              </div>



              <label className='py-2' >English Name</label>

              <div className='row'>
                <div className='col-lg-4'>
                  <div className="group">
                    <input placeholder="" type="text" value={fname} onChange={(e) => { setFname(e.target.value) }} />
                    <label htmlFor="name">English First Name</label>

                  </div>
                </div>
                <div className='col-lg-4'>
                  <div class="group">
                    <input placeholder="" type="text" value={mname} onChange={(e) => { setMname(e.target.value) }} />
                    <label for="name">English Middle Name</label>

                  </div>
                </div>

                <div className='col-lg-4'>
                  <div class="group">
                    <input placeholder="" type="text" value={lname} onChange={(e) => { setLname(e.target.value) }} />
                    <label for="name">English Last Name</label>

                  </div>
                </div>


              </div>

              <div className="row">
                <div className="col-lg-12">
                  {fname != '' && mname != '' && lname != '' ? (
                    isFakeName ? (
                      <p className="text-white bg-danger p-1 " style={{ borderRadius: 5 }}>
                        <b>{fname + ' ' + mname + ' ' + lname}</b> is already exist.
                      </p>
                    ) : (
                      <p className="text-white bg-success p-1" style={{ borderRadius: 5 }}>
                        <b>{fname + ' ' + mname + ' ' + lname}</b> not exist.
                      </p>
                    )
                  ) : null}
                </div>
              </div>

              <label className='py-2' >Gujarati Name</label>
              <div className='row'>
                <div className='col-lg-4'>
                  <div className="group">
                    <input placeholder="" type="text" value={gfname} onChange={handleGFChange} />
                    <label htmlFor="name">Gujarati First Name</label>

                  </div>
                </div>
                <div className='col-lg-4'>
                  <div className="group">
                    <input placeholder="" type="text" value={gmname} onChange={(e) => { setGmname(e.target.value) }} />
                    <label htmlFor="name">Gujarati Middle Name</label>

                  </div>
                </div>

                <div className='col-lg-4'>
                  <div className="group">
                    <input placeholder="" type="text" value={glname} onChange={(e) => { setGlname(e.target.value) }} />
                    <label htmlFor="name">Gujarati Last Name</label>

                  </div>
                </div>

              </div>



              <div class="group">
                <input placeholder="" type="number" max={10} value={mobileNumber} onChange={(e) => { setmobileNumber(e.target.value) }} />
                <label for="name">Contact Number</label>
              </div>

              <div class="group">
                {/* <DatePicker selected={date} onChange={(date) => setDate(date)}  dateFormat="dd/MM/yyyy" /> */}

                {/* <DatePicker value={jdate} onChange={(e) => { setJdate(e.target.value) }}  /> */}
                <input placeholder="" type="date" value={jdate} onChange={(e) => { setJdate(e.target.value) }} />
                <label for="name">Joining Date</label>
              </div>

              <div class="group">
                <input placeholder="" type="text" value={preEntry} onChange={(e) => { setPreEntry(e.target.value) }} />
                <label for="name">Opening Amount</label>
              </div>

              <div class="group">
                {/* <input placeholder="" type="date" format="dd-MM-yyyy" value={jdate} onChange={(e) => { setJdate(e.target.value) }} /> */}
                {/* <label >Joining Date : {jdate}</label> */}
              </div>

              {/* <label className='my-2 mb-4'>{clanid}</label> */}
              <label className='my-2 mb-4'>Select Clan</label>
              <div className="group">
                <label for="exampleInputEmail1">Select Clan</label>
                <select name="parentclan" placeholder='' id="parentclan" value={clanid} onChange={(e) => { setClanid(e.target.value); }} >
                  <option value="0">Null</option>
                  {
                    clan.map((e) => {
                      return (
                        <>
                          <option value={e.id}>{e.clan_name}</option>
                        </>
                      )
                    })
                  }
                </select>
              </div>
              <button type="update" onClick={updateData}>Submit</button>
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
      </section>
    </>
  )
}

export default EditMember