import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layout/Sidebar';
import DatePicker from "react-date-picker";
const AddMember = () => {

  const [rollno, setRollno] = useState('');
  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');
  const [jdate, setJdate] = useState('');
  const [clanid, setClanid] = useState(Number);
  const [clan, setClan] = useState([]);
  const [preEntry, setPreEntry] = useState(0);

  const getData = async () => {
    try {
      const res = await axios.get(`/getclan`)
      setClan(res.data)
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData()
  }, []);


  const savedata = async (e) => {
    e.preventDefault();
    if(preEntry === ''){
      setPreEntry(0)
    }
    const team = {
      rollno: rollno,
      fname: fname,
      mname: mname,
      lname: lname,
      jdate: jdate,
      preEntry:preEntry,
      clanid: clanid,
    }
    console.log(team);
    try {
      await axios.post('/addmember', team).then((res) => {
        console.log(res);
        window.alert("Member Added Successfully");
      }).catch((e) => {
        console.log(e);
      })
    } catch (error) {
      console.log(error);
    }
  }

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
            <span class="title mt-2">Add New Member </span>
            <form class="form">
              <div class="group">
                <input placeholder="" type="text" value={rollno} onChange={(e) => { setRollno(e.target.value) }} />
                <label for="name">Roll No</label>
              </div>


              <div class="group">
                <input placeholder="" type="text" value={fname} onChange={(e) => { setFname(e.target.value) }} />
                <label for="name">First Name</label>
              </div>

              <div class="group">
                <input placeholder="" type="text" value={mname} onChange={(e) => { setMname(e.target.value) }} />
                <label for="name">Middle Name</label>
              </div>

              <div class="group">
                <input placeholder="" type="text" value={lname} onChange={(e) => { setLname(e.target.value) }} />
                <label for="name">Last Name</label>
              </div>

              <div class="group">
                <input placeholder="" type="date" format="dd-MM-yyyy" value={jdate} onChange={(e) => { setJdate(e.target.value) }} />
                <label for="name">Joining Date</label>
              </div>

           

              <div class="group">
                <input placeholder="" type="text" value={preEntry} onChange={(e) => { setPreEntry(e.target.value) }} />
                <label for="name">Previous Entry</label>
              </div>

              
              <label className='my-2 mb-4'>Select Clan</label>
              <div className="group">
                <label for="exampleInputEmail1">Select Clan</label>
                <select name="parentclan" placeholder='' id="parentclan" value={clanid} onChange={(e) => { setClanid(e.target.value); }} >
                  <option value="Null">Null</option>
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
            </form>
          </div>

        </div>
      </section>
    </>
  )
}

export default AddMember