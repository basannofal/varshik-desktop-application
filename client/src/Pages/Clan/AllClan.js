import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";

const AllClan = () => {
  const [clan, setClan] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [order, setOrder] = useState("ASC");

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
      const res = await axios.get(`/getclan`);
      setClan(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteClan = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(`/deleteclan/${id}`);

      getData();
    } catch (error) {
      window.alert(error);
    }
  };

  const itemPerPage = 4;

  const numberOfPage = Math.ceil(clan.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const rows = clan.slice(
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

                    .filter((item) => {
                      const searchTerm = searchFilter.toLowerCase();
                      return (
                        item.clan_name.startsWith(searchTerm)
                      )
                    })

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
                                className="btn btn-danger"
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

export default AllClan;
