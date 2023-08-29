import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import TransitionAlerts from "../../Component/TransitionAlerts";
import CustomPrompt from "../../Component/CustomPrompt";


const AllClan = () => {
  const [clan, setClan] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [order, setOrder] = useState("ASC");
  const [filteredMembers, setfilteredMembers] = useState([]);

  const navigate = useNavigate();

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...clan].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setClan(sorted);
      setOrder("DSC")
    }

    if (order === "DSC") {
      const sorted = [...clan].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setClan(sorted);
      setOrder("ASC")
    }
  }

  const getData = async () => {
    try {
      console.log(process.env.REACT_APP_URL);
      const res = await axios.get(`${process.env.REACT_APP_URL}/getclan`);
      setClan(res.data);
      setfilteredMembers(res.data)
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);



  // pagination


  const filterMembers = () => {
    return clan.filter((item) => {
      const searchTerm = searchFilter.toLowerCase();
      const lowercaseClanName = item.clan_name.toLowerCase();
      return lowercaseClanName.startsWith(searchTerm);
    });
  };


  useEffect(() => {
    setfilteredMembers(filterMembers())
    console.log(filterMembers());
  }, [searchFilter]);




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


  // prompt
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [obid, setobid] = React.useState('');


  const deleteClan = (id) => {
    setDialogOpen(true);
    setobid(id)
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAgreeDialog = async (value) => {
    if (value === '1234') {
      try {
        
        const res = await axios.delete(`${process.env.REACT_APP_URL}/deleteclan/${obid}`);
        displayAlert('Success', 'Clan Deleted Successfully !', 'OK');
        getData();
      } catch (error) {
        console.log(error.response.data.error);
        if (error.response.data.error == 1) {
          setDialogOpen(false)
          displayAlert('Error', 'Clan Can Not Delete Many Member Are Available In This Clan!', 'OK');
          return
        }
        setDialogOpen(false)
        displayAlert('Error', 'Clan Not Deleted !', 'OK');
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
              <NavLink to={`/addclan`} style={{ textDecoration: "none" }}>
                <button
                  className="btn btn-primary d-flex "
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <i
                    class="uil uil-plus mr-2"
                    style={{ backgroundColor: "#007bff" }}
                  ></i>
                  Add New Clan
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
              <span class="text">All Clan</span>
            </div>

            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th style={{ cursor: 'pointer' }} onClick={() => sorting("clan_name")} >Clan Name <i class="bi bi-funnel-fill"></i></th>
                  <th scope="col">Parent Clan</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0
                  ? rows



                    .map((e, idx) => {
                      let flag = 0;
                      return (
                        <>
                          <tr>
                            <th scope="row">{e.id}</th>
                            <td>{e.clan_name}</td>
                            <td>
                              {clan.map((x) => {
                                if (e.parent_clan === x.id) {
                                  flag = 1;
                                  return x.clan_name;
                                }
                              })}
                              {flag === 0 ? "null" : ""}
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  navigate(`/editclan/${e.id}`);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger  ml-3"
                                onClick={() => {
                                  deleteClan(e.id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  : ""}
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
        </div>
      </section>
    </>
  );
};

export default AllClan;
