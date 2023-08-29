import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Sidebar from '../../Layout/Sidebar'
import { useNavigate } from 'react-router-dom';
import Switch from "react-switch";

const MemberList = () => {
  const [member, setMember] = useState([]);
  const [clan, setClan] = useState([]);
  const [filterClan, setFilterClan] = useState('');
  const navigate = useNavigate();
  const [selectedClanId, setSelectedClanId] = useState('');
  const [selectedClanName, setSelectedClanName] = useState('');
  const[isClanChecked,setIsClanChecked]=useState(false);
  

  const getClan = async () => {
    try {
      const res = await axios.get(`/getclan`)
      setClan(res.data)
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getData = async () => {
    try {
      const res = await axios.get(`/getmember`)
      setMember(res.data)
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getData()
    getClan()
  }, []);

  const deleteMember = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(`/deletemember/${id}`)


      getData()
    } catch (error) {
      window.alert(error)
    }
  }

  const fetchMemberOnClick = (data) => {
    console.log("Clicked On = " + data)
    // navigate('/MemberDetail', { state: {id:1} });

  }

  const isSubClanHandler=(checked)=>{
    setIsClanChecked(checked);
  }

  const setSearch = (e) => {
    setFilterClan(e.target.value);
  }

  const onSelectClan = (clanName, clanId) => {
    setSelectedClanId(clanId);
    setSelectedClanName(clanName);
  }

  const searchFilter=async()=>{


    const clanData = {
    selectedClanId: selectedClanId,
    selectedClanName: selectedClanName,
    isClanChecked: isClanChecked,
  };

    const res = await axios.post(`/getMemberListByFilter`, clanData);
    // console.log( res.data)
    setMember(res.data)
    // console.log({"search data are":selectedClanId,selectedClanName,isClanChecked })

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

        <div class="dash-content  pt-3" >
          <div class="overview" >


            <div class="title" style={{ display: "flex", justifyContent: "right" }}>
              <NavLink to={`/addmember`} style={{ textDecoration: "none" }}>
                <button className='btn btn-primary d-flex ' style={{ justifyContent: "center", alignItems: "center" }}>
                  <i class="uil uil-plus mr-2" style={{ backgroundColor: "#007bff" }}></i>
                  Add New Member
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

            <div>




              <div Style="display:block">
                <div Style="float:left">
                  <div class="title mt-0">
                    <i class="uil uil-clock-three"></i>
                    <span class="text">All Member</span>
                  </div>

              




                  <label class="label"><span class="key" >Clan Id:</span> {selectedClanId}</label>
                  <label class="label"><span class="key" >Clan Name:</span> {selectedClanName}</label>
                 
                     </div>
                   
                     <div  id="clanToggle">
                      <Switch  onChange={isSubClanHandler} checked={isClanChecked}></Switch>
                      <span Style="padding-left:10px;margin-bottom:1opx">Sub Clan</span>

                      <button onClick={searchFilter} className='btn btn-primary' Style="margin-left:25px;" >
                  <i class="uil uil-search mr-2" style={{ backgroundColor: "#007bff" }}></i>
                  Search
                </button>
                      </div>

                    
              </div>



              <div class="top">
                <i class="uil uil-bars sidebar-toggle" style={{ opacity: 0 }} ></i>

                <div>
                  {/* <div className="search-inner ">
              <input type="text" placeholder="Search here..." value={filterMember} onChange={setSerch} />
            </div> */}
                  <div class="input-group mb-1">
                    <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={filterClan} onChange={setSearch} />
                    <div class="input-group-prepend">
                      <i class="uil uil-search input-group-text"></i>
                      {/* <span class="input-group-text" id="inputGroup-sizing-default">Default</span> */}
                    </div>
                  </div>
                  <div className="sfdropdown">

                    {clan
                      .filter((item) => {

                        const searchTerm = filterClan.toLowerCase();
                        const clanName = item.clan_name.toLowerCase();

                        return searchTerm && clanName.startsWith(searchTerm) && clanName !== searchTerm;

                      })


                      .map((item) => (
                        <div
                          onClick={() => onSelectClan(item.clan_name, item.id)}
                          className="sfdropdown-row"
                          key={item.id}
                        >
                          {item.clan_name}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>


            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Clan</th>
                  <th scope="col">Joining Date</th>
                  <th scope="col">Credit</th>
                  <th scope="col">Debit</th>
                  <th scope="col">Gross</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {
                  member.map((e, idx) => {
                    let flag = 0;

                    // var dates=e.join_date.substring(0,10);
                    // console.log(e.join_date+" date: "+dates)
                    // var date = new Date(e.join_date).toJSON().slice(0,10)
                    // var components = date.split("-");
                    // var d = `${components[2]}-${components[1]}-${components[0]}`;

                    var d = e.join_date;

                    var debit = e.total_paid;
                    var credit = e.total_debit;
                    if (e.pre_entry > 0) {
                      debit = debit + e.pre_entry
                    }
                    else {
                      credit = credit - e.pre_entry
                    }
                    var ga = debit - credit
                    return (
                      <>

                        <tr >
                          <th scope="row">{e.roll_no}</th>
                          <td ><span id="member-name" onClick={() => { fetchMemberOnClick(e.roll_no) }}>{`${e.f_name} ${e.m_name} ${e.l_name}`}</span></td>
                          <td>
                            {
                              clan.map((x) => {
                                if (e.clanid === x.id) {
                                  flag = 1;
                                  return (x.clan_name)
                                }
                              })

                            }
                            {
                              flag === 0 ? "null" : ""
                            }
                          </td>
                          <td>{d}</td>
                          <td>{debit}</td>
                          <td>{credit}</td>
                          <td>{ga >= 0 ? <p className='text-success'>{ga}</p> : <p className='text-danger'>{ga}</p>}</td>
                          <td><button className='btn btn-danger' onClick={() => { deleteMember(e.id) }}>Delete</button></td>
                          <td><Link to="/editMember" state={{ id: e.id }}><button className='btn btn-success'>Edit</button></Link></td>
                        </tr>
                      </>
                    )
                  })
                }
              </tbody>
            </table>

          </div>
        </div>
      </section>

    </>
  )
}

export default MemberList