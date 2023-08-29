import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layout/Sidebar';
import TransitionAlerts from "../../Component/TransitionAlerts";


const AddMember = () => {

  const navigate = useNavigate();

  const [rollno, setRollno] = useState(0);
  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');
  const [gfname, setGfname] = useState('');
  const [gmname, setGmname] = useState('');
  const [glname, setGlname] = useState('');
  const [jdate, setJdate] = useState(new Date().toISOString().substr(0, 10));
  const [clanid, setClanid] = useState(0);
  const [clan, setClan] = useState([]);
  const [preEntry, setPreEntry] = useState(0);
  const [memberExists, setMemberExists] = useState(false);
  const [isFakeName, setisFakeName] = useState(false);
  const [mobileNumber, setmobileNumber] = useState('');

  // get single member 
  const [member, setMember] = useState([]);

  const getSingleData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/getsinglemember`);
      setMember(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/getclan`)
      setClan(res.data)
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  // get member 
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

  // get the clan
  const getClan = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/getclan`);
      setClan(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData()
    getClan()
    getSingleData()
    checkMemberData()
  }, []);



  const savedata = async (e) => {
    console.log(clanid);
    e.preventDefault();
    const team = {
      rollno: rollno,
      fname: fname,
      mname: mname,
      lname: lname,
      gfname: gfname,
      gmname: gmname,
      glname: glname,
      jdate: jdate,
      preEntry: preEntry,
      clanid: clanid,
      mobileNumber: mobileNumber
    }



    // if (rollno <= 0 || rollno == '') {
    //   displayAlert('Error', 'Enter Correct Roll No!', 'OK');
    //   return;
    // }



    // Check if member already exists with the same name
    const memberExists = checkMember.some(
      (member) =>
        // member.roll_no == rollno ||
        isFakeName ||
        (mname == '' || fname == '' || lname == '')
    );

    
    if(clanid == 0){
      displayAlert('Error', 'Select Clan!', 'OK');
      return;
    }


    console.log(memberExists);
    setMemberExists(memberExists);
    if (memberExists) {
      displayAlert('Error', ' Member already exists. Please try again with a different name..', 'OK');
      return;
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_URL}/addmember`, team)
          .then((res) => {
            console.log(res);
            navigate("/allmember", { replace: true });
          })
          .catch((e) => {
            displayAlert('Error', 'Member Not Added!', 'OK');
            console.log(e);
          });
      } catch (error) {
        displayAlert('Error', 'Member Not Added!', 'OK');
        console.log(error);
      }

    }
  }


  // check member is new or not

  useEffect(() => {
    const memberExists = checkMember.some(
      (member) =>
        member.f_name.toLowerCase() === fname.trim().toLowerCase() &&
        member.m_name.toLowerCase() === mname.trim().toLowerCase() &&
        member.l_name.toLowerCase() === lname.trim().toLowerCase()
    );
    setisFakeName(memberExists)
  }, [fname, lname, mname]);



  // gender radio button
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

        <div class="dash-content mt-5" >
          <div>
            {member.map((item) => {
              let flag = 0;
              return (
                <>
                  <div style={{ marginBottom: "20px" }}>
                    <span><b style={{ color: 'red' }}>Full Name : </b> {item.f_name} {item.m_name} {item.l_name}</span>
                    <span><b style={{ color: 'red', paddingLeft: "20px" }}>Joining Date : </b> {item.join_date}</span>
                    <span>
                      <b style={{ color: 'red', paddingLeft: "20px" }}>Clan : </b>
                      {clan.map((x) => {
                        if (item.clanid === x.id) {
                          flag = 1;
                          return x.clan_name;
                        }
                      })}
                      {flag === 0 ? "null" : ""}
                    </span>
                  </div>
                </>
              );
            })}
          </div>
          <div class="card">
            <span class="title mt-2">Add New Member </span>

            <form class="form">
              {/* <div class="group">
                <input placeholder="" type="text" value={rollno} onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setRollno(e.target.value)
                  }
                }} />
                <label for="name">Roll No</label>
                {rollno ? (
                  rollno > 0 ?
                    (checkMember.some((member) => member.roll_no == rollno) ? (
                      <p className="text-white bg-danger p-1" style={{ borderRadius: 5 }} >
                        <b>{rollno}</b> is already exist.
                      </p>
                    ) : (
                      <p className="text-white bg-success p-1" style={{ borderRadius: 5 }} >
                        <b>{rollno}</b> not exist.
                      </p>
                    )) :
                    <p className="text-white bg-danger p-1" style={{ borderRadius: 5 }} >
                      Enter Only Valid Roll No.
                    </p>
                ) : null}
              </div> */}



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
                <input placeholder="" type="date" format="dd-MM-yyyy" value={jdate} onChange={(e) => { setJdate(e.target.value) }} />
                <label for="name">Joining Date</label>
              </div>



              <div class="group">
                <input placeholder="" type="text" value={preEntry} onChange={(e) => { setPreEntry(e.target.value) }} />
                <label for="name">Opening Amount</label>
              </div>


              <label className='my-2 mb-4'>Select Clan</label>
              <div className="group">
                <label for="exampleInputEmail1">Select Clan</label>
                <select name="parentclan" placeholder='' id="parentclan" value={clanid} onChange={(e) => { setClanid(e.target.value); }} >
                  <option value={0}>Null</option>
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
              <button type="submit" onClick={savedata}>Submit</button>

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
      </section >
    </>
  )
}

export default AddMember

