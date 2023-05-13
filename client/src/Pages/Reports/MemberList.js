import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";

const MemberList = () => {
  const [member, setMember] = useState([]);
  const [clan, setClan] = useState([]);
  // const [kdebit, setDebit] = useState([]);
  const [filterClan, setFilterClan] = useState("");
  const navigate = useNavigate();
  const [selectedClanId, setSelectedClanId] = useState("");
  const [selectedClanName, setSelectedClanName] = useState("");
  const [isClanChecked, setIsClanChecked] = useState(false);
  const [showDebit, setShowDebit] = useState(true);
  const [showCredit, setShowCredit] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

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
      // window.alert(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDebitClick = () => {
    setShowDebit(!showDebit);
  };

  const handleCreditClick = () => {
    setShowCredit(!showCredit);
  };

  const filteredTransactions = member.filter((member) => {
    if (showDebit && showCredit) {
      return true;
    }

    if (showDebit && member.total_paid - member.total_debit <= 0) {
      return true;
    }

    if (showCredit && member.total_paid - member.total_debit > 0) {
      return true;
    }

    return false;
  });

  // const handleDebit = async () => {
  //   try {
  //     const res = await axios.get(`/getmember`);
  //     setMember(res.data);
  //     console.log(res.data);
  //     // window.alert(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getData();
    getClan();
    // handleDebit();
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

  const isSubClanHandler = (checked) => {
    setIsClanChecked(checked);
  };

  const setSearch = (e) => {
    setFilterClan(e.target.value);
  };

  const searchRecords = () => {
    clan
      .filter((item) => {
        const searchTerm = filterClan.toLowerCase();
        const clanName = item.clan_name.toLowerCase();

        return searchTerm && clanName.startsWith(searchTerm);
      })
      .map((k) => {
        const clanName = k.clan_name;
        const clanId = k.id;

        onSelectClan(clanName, clanId);
      });
  };

  const onSelectClan = (clanName, clanId) => {
    setSelectedClanId(clanId);
    setSelectedClanName(clanName);
  };

  // const SelectClan = (clanName, clanId) => {
  //   setSelectedClanId(clanId);
  //   setSelectedClanName(clanName);
  // };

  const searchFilter = async () => {
    const clanData = {
      selectedClanId: selectedClanId,
      selectedClanName: selectedClanName,
      isClanChecked: isClanChecked,
    };

    const res = await axios.post(`/getMemberListByFilter`, clanData);
    // console.log( res.data)
    if (res.data) {
      setMember(res.data);
    } else {
      setMember([]);
    }
    // console.log({"search data are":selectedClanId,selectedClanName,isClanChecked })
  };

  const itemPerPage = 5;

  const numberOfPage = Math.ceil(member.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const rows = member

    .slice(currentPage * itemPerPage, (currentPage + 1) * itemPerPage)

    .filter((member) => {
      if (showDebit && showCredit) {
        return true;
      }

      if (showDebit && member.total_paid - member.total_debit <= 0) {
        return true;
      }

      if (showCredit && member.total_paid - member.total_debit > 0) {
        return true;
      }

      return false;
    });

  const husen = () => {
    window.print();
  };

  return (
    <>
      <Sidebar />
      <section class="dashboard">
        <div class="dash-content  pt-3">
          <div class="flex">
            {/*All Member Title*/}
            <div class="title mt-0 float-left margin-width-auto">
              <i class="uil uil-clock-three"></i>
              <span class="text">All Member</span>
            </div>
            {/*Clan Search Dropdown */}

            <div class="center margin-width-auto">
              <div class="input-group mb-1 ">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={filterClan}
                  onChange={setSearch}
                />
                <div class="input-group-prepend">
                  <i
                    class="uil uil-search input-group-text"
                    onClick={searchRecords}
                  ></i>
                  {/* <span class="input-group-text" id="inputGroup-sizing-default">Default</span> */}
                </div>
              </div>
              <div className="sfdropdown">
                {clan
                  .filter((item) => {
                    const searchTerm = filterClan.toLowerCase();
                    const clanName = item.clan_name.toLowerCase();

                    return (
                      searchTerm &&
                      clanName.startsWith(searchTerm) &&
                      clanName !== searchTerm
                    );
                  })

                  .map((item) => (
                    <div
                      onClick={() => {
                        onSelectClan(item.clan_name, item.id);
                        setFilterClan(item.clan_name);
                      }}
                      className="sfdropdown-row"
                      key={item.id}
                    >
                      {item.clan_name}
                    </div>
                  ))}
              </div>
            </div>

            {/*Add New Member button */}
            <div class="title float-right margin-width-auto">
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
          </div>

          <div class="activity ">
            <div Style="display:inline-block">
              <div Style="float:left">
                <div Style="display:inline-flex;">
                  <div>
                    <span class="key label">Clan Id:</span>
                    <span>{selectedClanId}</span>
                    <span class="key label">Clan Name:</span>
                    <span>{selectedClanName}</span>
                  </div>
                </div>
              </div>

              <div id="clanToggle" className="row">
                <Switch
                  onChange={isSubClanHandler}
                  checked={isClanChecked}
                ></Switch>
                <span Style="padding-left:10px;margin-bottom:1opx">
                  Sub Clan
                </span>

                <button
                  onClick={searchFilter}
                  className="btn btn-primary"
                  Style="margin-left:25px;"
                >
                  <i
                    class="uil uil-search mr-2"
                    style={{ backgroundColor: "#007bff" }}
                  ></i>
                  Search
                </button>

                <div className="row">
                  <div class="form-check pl-5">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      onClick={handleCreditClick}
                      checked={showCredit}
                    />
                    <label class="form-check-label">Credit</label>
                  </div>

                  <div class="form-check" style={{ paddingLeft: "4rem" }}>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      onClick={handleDebitClick}
                      checked={showDebit}
                    />
                    <label class="form-check-label">Debit</label>
                  </div>
                </div>
              </div>
            </div>

            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th
                    style={{ cursor: "pointer" }}
                    onClick={() => sorting("f_name")}
                  >
                    Full Name <i class="bi bi-funnel-fill"></i>
                  </th>
                  <th scope="col">Clan</th>
                  <th scope="col">Joining Date</th>
                  <th scope="col">Credit</th>
                  <th scope="col">Debit</th>
                  <th scope="col">Gross</th>
                  <th className="text-center" colSpan={2} scope="col">
                    Handle
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* {kdebit.map((k) => {
                  <td>amount : {k.f_name}</td>;
                })} */}

                {rows.length > 0
                  ? rows.map((e, idx) => {
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

          <div class="row">
            <div className="col-lg-10">
              <button
                onClick={() => {
                  husen();
                }}
                class="btn btn-primary noprint"
              >
                <i class="bi bi-printer"></i> Print
              </button>
            </div>

            <div class="col-lg-2 pagination">
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
                        className={
                          page === currentPage + 1
                            ? "active page-link bg-primary text-white"
                            : "page-link"
                        }
                      >
                        {page}
                      </button>
                    </>
                  );
                })}
              <button
                disabled={currentPage >= numberOfPage - 1}
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MemberList;
