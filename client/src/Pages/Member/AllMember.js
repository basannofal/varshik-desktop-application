import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import { useNavigate } from "react-router-dom";


const AllMember = () => {

  const [member, setMember] = useState([]);
  const [clan, setClan] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const [order, setOrder] = useState("ASC");

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...member].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setMember(sorted);
      setOrder("DSC")
    }

    if (order === "DSC") {
      const sorted = [...member].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setMember(sorted);
      setOrder("ASC")
    }
  }

  const getClan = async () => {
    try {
      const res = await axios.get(`/getclan`);
      setClan(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(`/getmember`);
      setMember(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getData();
    getClan();
  }, []);


  const deleteMember = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(`/deletemember/${id}`);

      getData();
    } catch (error) {
      window.alert(error);
    }
  };

  const fetchMemberOnClick = (data) => {
    console.log("Clicked On = " + data);
    // navigate('/MemberDetail', { state: {id:1} });
  };

  const itemPerPage = 4;

  const numberOfPage = Math.ceil(member.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const rows = member.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  );

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

        <div class="dash-content  pt-3">
          <div class="overview">
            <div
              class="title"
              style={{ display: "flex", justifyContent: "right" }}
            >
              <NavLink to={`/addmember`} style={{ textDecoration: "none" }}>
                <button
                  className="btn btn-primary d-flex "
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <i
                    class="uil uil-plus mr-2"
                    style={{ backgroundColor: "#007bff" }}
                  ></i>
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
            <div class="title mt-0">
              <i class="uil uil-clock-three"></i>
              <span class="text">All Member</span>
            </div>

            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th style={{ cursor: 'pointer' }} onClick={() => sorting("f_name")} scope="col">Full Name <i class="bi bi-funnel-fill"></i></th>
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
                    .filter((k) => {
                      const group = `${k.f_name} ${k.m_name} ${k.l_name}`

                      return (searchFilter.toLowerCase() === "" ? k : k.f_name.toLowerCase().includes(searchFilter) || k.m_name.toLowerCase().includes(searchFilter) || k.l_name.toLowerCase().includes(searchFilter) || k.join_date.toLowerCase().includes(searchFilter) || group.toLowerCase().includes(searchFilter) || Number(searchFilter) == k.roll_no)
                    })

                    .map((e, idx) => {
                      let flag = 0;
                      console.log(e);
                      // var dates=e.join_date.substring(0,10);
                      // console.log(e.join_date+" date: "+dates)
                      // var date = new Date(e.join_date).toJSON().slice(0,10)
                      // var components = date.split("-");
                      // var d = `${components[2]}-${components[1]}-${components[0]}`;

                      var d = e.join_date;

                      var debit = e.total_paid;
                      var credit = e.total_debit;
                      if (e.pre_entry > 0) {
                        debit = debit + e.pre_entry;
                      } else {
                        credit = credit - e.pre_entry;
                      }
                      var ga = debit - credit;
                      return (
                        <>
                          <tr>
                            <th scope="row">{e.roll_no}</th>
                            <td>
                              <span
                                id="member-name"
                                onClick={() => {
                                  fetchMemberOnClick(e.roll_no);
                                }}
                              >{`${e.f_name} ${e.m_name} ${e.l_name}`}</span>
                            </td>
                            <td>
                              {clan.map((x) => {
                                if (e.clanid === x.id) {
                                  flag = 1;
                                  return x.clan_name;
                                }
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
                                <button className="btn btn-success">
                                  Edit
                                </button>
                              </Link>
                            </td>
                          </tr>
                        </>
                      );
                    })


                  : ""}
              </tbody>
            </table>
          </div>

          <div className="pagination" style={{ display: "flex", justifyContent: "right", marginRight: "2rem"}}>
            <button
              disabled={currentPage < 1}
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
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
                      onClick={() => handlePageChange(page - 1)}
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
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &gt;
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default AllMember;
