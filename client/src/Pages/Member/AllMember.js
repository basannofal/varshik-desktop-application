import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Box, Pagination } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import TransitionAlerts from "../../Component/TransitionAlerts";
import CustomPrompt from "../../Component/CustomPrompt";


const AllMember = () => {
  const [member, setMember] = useState([]);
  const [clan, setClan] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [page, setPage] = useState(1);
  const [filteredMembers, setfilteredMembers] = useState([]);
  const [MemberCountOnClan, setMemberCountOnClan] = useState([]);
  const [flag, setflag] = useState(0);
  const itemsPerPage = 5;

  const [order, setOrder] = useState("ASC");

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...member].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setMember(sorted);
      setOrder("DSC");
    }

    if (order === "DSC") {
      const sorted = [...member].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setMember(sorted);
      setOrder("ASC");
    }
  };

  const getClan = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/getclan`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/getmember`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  const CountMemberAsClan = async () => {
    const clanData = await getClan();
    const memberData = await getData();
  
    const clan_member_count = {};
  
    // Count members for each clan
    for (const clanrow of clanData) {
      const clan_id = clanrow.id;
      clan_member_count[clan_id] = 0;
  
      for (const memberrow of memberData) {
        if (memberrow.clanid === clan_id) {
          clan_member_count[clan_id]++;
        }
      }
    }
  
    const MemberCountOnClanClone = [];
    // Print the clan member counts
    for (const clanrow of clanData) {
      const clan_id = clanrow.id;
      const clan_name = clanrow.clan_name;
      const member_count = clan_member_count[clan_id];
      const clanMemberCountObj = {
        clanname: clan_name,
        totalmember: member_count
      };
  
      MemberCountOnClanClone.push(clanMemberCountObj);
      console.log(`Clan '${clan_name}' has ${member_count} members.`);
    }
  
    setMemberCountOnClan(MemberCountOnClanClone);
  };
  
  useEffect(() => {
    Promise.all([getClan(), getData()])
      .then(([clanData, memberData]) => {
        setClan(clanData);
        setMember(memberData);
        setfilteredMembers(memberData);
        CountMemberAsClan();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

    useEffect(() => {
    Promise.all([getClan(), getData()])
      .then(([clanData, memberData]) => {
        setClan(clanData);
        setMember(memberData);
        setfilteredMembers(memberData);
        CountMemberAsClan();
        setflag(0)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [flag]);
  





  const fetchMemberOnClick = (data) => {
    console.log("Clicked On =", data);
    // navigate('/MemberDetail', { state: {id:1} });
  };



  // prompt
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [obid, setobid] = React.useState('');


  const deleteMember = (id) => {
    setDialogOpen(true);
    setobid(id)
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAgreeDialog = async (value) => {
    if (value === '1234') {
      try {
        await axios.delete(`${process.env.REACT_APP_URL}/deletemember/${obid}`);
        setflag(1)
      } catch (error) {
        displayAlert('Error', 'Memeber Not Deleted!', 'Please Try Again');
      }
    } else {
      displayAlert('Error', 'Memeber Not Deleted!', 'Please Try Again');
    }
    setDialogOpen(false);
  };



  // Filter
  const filterMembers = () => {
    return member.filter((item) => {
      var searchTerm = '';
      const fname = item.f_name.toLowerCase();
      const mname = item.m_name.toLowerCase();
      const lname = item.l_name.toLowerCase();

      if (searchFilter) {
        searchTerm = searchFilter;
      }
      const group = `${item.f_name} ${item.m_name} ${item.l_name}`;
      return (
        searchTerm.toLowerCase() === "" ||
        fname.includes(searchTerm) ||
        lname.includes(searchTerm) ||
        mname.includes(searchTerm)
        // item.join_date.toLowerCase().includes(searchTerm) ||
        // group.toLowerCase().includes(searchTerm) ||
        // Number(searchTerm) === item.id
      )
    });
  };


  useEffect(() => {

    setfilteredMembers(filterMembers())
    console.log(filterMembers());
  }, [searchFilter]);



  // pagination
  const [currentPage, setCurrentPage] = useState(0);


  const itemPerPage = 4;

  const numberOfPage = Math.ceil(filteredMembers.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

  const handlePageChangeforpagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const rows = filteredMembers.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  );


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
      <section className="dashboard">
        <div className="top">
          <i className="uil uil-bars sidebar-toggle"></i>

          <div className="search-box">
            <i className="uil uil-search"></i>
            <input
              type="search"
              placeholder="Search here..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}

            />
          </div>
        </div>

        <div className="dash-content pt-3">
          <div className="overview">
            <div
              className="title"
              style={{ display: "flex", justifyContent: "right" }}
            >
              <NavLink to={`/addmember`} style={{ textDecoration: "none" }}>
                <button
                  className="btn btn-primary d-flex "
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <i
                    className="uil uil-plus mr-2"
                    style={{ backgroundColor: "#007bff" }}
                  ></i>
                  Add New Member
                </button>
              </NavLink>
            </div>
          </div>

          <div className="activity">
            <div className="title mt-0">
              <i className="uil uil-clock-three"></i>
              <span className="text">All Member</span>
            </div>


            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th
                    style={{ cursor: "pointer" }}
                    onClick={() => sorting("f_name")}
                    scope="col"
                  >
                    Full Name <i className="bi bi-funnel-fill"></i>
                  </th>
                  <th scope="col">Clan</th>
                  <th scope="col">Joining Date</th>
                  <th scope="col">Credit</th>
                  <th scope="col">Debit</th>
                  <th scope="col">Gross</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0
                  ? rows

                    .map((e, idx) => {
                      let flag = 0;

                      const d = e.join_date;
                      let debit = e.total_paid;
                      let credit = e.total_debit;

                      if (e.pre_entry > 0) {
                        debit += e.pre_entry;
                      } else {
                        credit -= e.pre_entry;
                      }

                      const ga = debit - credit;
                      return (
                        <>
                          <tr key={idx}>
                            {/* <th scope="row">{e.index_num}</th> */}
                            <th scope="row">{e.index_num}</th>
                            <td>
                              <span
                                id="member-name"
                                onClick={() => {
                                  fetchMemberOnClick(e.id);
                                }}
                              >
                                {`${e.f_name} ${e.m_name} ${e.l_name}`}
                                <br />
                                <small style={{ fontSize: "smaller" }}>{`${e.g_f_name} ${e.g_m_name} ${e.g_l_name}`}</small>
                              </span>
                            </td>
                            <td>
                              {clan.map((x) => {
                                if (e.clanid === x.id) {
                                  flag = 1;
                                  return x.clan_name;
                                }
                                return null;
                              })}
                              {flag === 0 ? "null" : ""}
                            </td>
                            <td>{d}</td>
                            <td>{debit}</td>
                            <td>{credit}</td>
                            <td>
                              {ga >= 0 ? (
                                <p className="text-success">{ga}</p>
                              ) : (
                                <p className="text-danger">{ga}</p>
                              )}
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  deleteMember(e.id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                            <td>
                              <Link to="/editMember" state={{ id: e.id }}>
                                <button className="btn btn-success">Edit</button>
                              </Link>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  : <tr>
                    <td colSpan="8">No members found</td>
                  </tr>}

              </tbody>
            </table>

          </div>

          <div className="pagination" style={{ display: "flex", justifyContent: "right", marginRight: "2rem" }}>
            <button
              disabled={currentPage < 1}
              className="page-link"
              onClick={() => handlePageChangeforpagination(currentPage - 1)}
            >
              &lt;
            </button>
            {pageIndex
              .slice(
                Math.max(0, currentPage - 2),
                Math.min(numberOfPage, currentPage + 3)
              )
              .map((page) => {
                return (
                  <>
                    <button
                      key={page}
                      onClick={() => handlePageChangeforpagination(page - 1)}
                      className={page === currentPage + 1 ? "active page-link bg-primary text-white" : "page-link"}
                    >
                      {page}
                    </button>
                  </>
                )
              })
            }
            <button
              disabled={currentPage >= numberOfPage - 1}
              className="page-link"
              onClick={() => handlePageChangeforpagination(currentPage + 1)}
            >
              &gt;
            </button>




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

          <div className="mt-5">
            <h3 className="my-4">Clan Members</h3>
            {
              MemberCountOnClan.length == 0 ?
                <h5>Loading...</h5> :
                <div className="row m-0">
                  {
                    MemberCountOnClan.map((e) => {
                      return (
                        <>
                          <div className="col-lg-3">

                            <p>{e.clanname} = {e.totalmember} </p>
                          </div>
                        </>
                      )
                    })
                  }
                </div>

            }
          </div>
        </div>
      </section>
    </>
  );
};

export default AllMember;
