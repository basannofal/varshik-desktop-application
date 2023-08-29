import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

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
  const [filterData, setFilterData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [showGujName, setShowGujName] = useState(true);
  const [showEngName, setShowEngName] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().substr(0, 10))
  const [selectedYear,setSelectedYear]=useState('');
  



  useEffect(()=>{
    setSelectedYear(new Date(currentDate).getFullYear());
  },[currentDate]);

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
      setFilterData(res.data);
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

  const handleGujName = () => {
    setShowGujName(!showGujName);
  }
  const handleEngName = () => {
    setShowEngName(!showEngName);
  }

  useEffect(() => {

    const rows = member



      .filter((item) => {
        console.log(showDebit + " " + showCredit)
        if (showDebit && showCredit) {

          console.log("1 : " + item.id)
          return true;


        }


        if (showDebit && item.total_paid - item.total_debit <= 0) {
          console.log("2 : " + item.id + " total paid: " + item.total_paid)
          return true;
        }

        if (showCredit && (item.total_paid - item.total_debit) > 0) {
          console.log("3: " + item.id)
          return true;
        }
        console.log("4 : " + item.id)

        return false;
      });

    setFilterData(rows);

    filterData.slice(currentPage * itemPerPage, (currentPage + 1) * itemPerPage);
  }, [showDebit, showCredit]);

  useEffect(() => {

  }, [filterData]);
  // const filteredTransactions = member.filter((member) => {
  //   if (showDebit && showCredit) {
  //     return true;
  //   }

  //   if (showDebit && member.total_paid - member.total_debit <= 0) {
  //     return true;
  //   }

  //   if (showCredit && member.total_paid - member.total_debit > 0) {
  //     return true;
  //   }

  //   return false;
  // });

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
    console.log(res.data)
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







  const downloadPdf = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      html: '#my-table',
    })
    doc.save('clan.pdf')
  }


  return (
    <>
      <div >
        <Sidebar />
      </div>
      <section class="dashboard">
        <div class="dash-content  pt-3">
          <div class="flex justify-content-between bg-light my-0 py-2 px-3" id="hidden">
            {/*All Member Title*/}
            <div class="title m-0">
              <i class="uil uil-clock-three"></i>
              <span class="text">All Members</span>
            </div>
            {/*Clan Search Dropdown */}

            <div class="center m-0 ">
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
            <div class="title m-0">
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
            <div >

              {/* clan detail */}
              <div class="flex justify-content-start align-items-center py-2" Style="background-color:#ffe4c414">
                <div>

                  <span class="key label">Clan Id:</span>
                  <span>{selectedClanId}</span>
                  <span class="key label">Clan Name:</span>
                  <span>{selectedClanName}</span>

                </div>
                <div className="flex align-items-center">

                  {/* toggle Button For subclan */}
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
                </div>
              </div>


              <div className="flex px-2 justify-content-between py-1">
                {/* debit and credit check box */}
                <div className="flex px-2 justify-content-between py-1">
                  <div className="form-check ">
                    <input
                      class="form-check-input w-auto"
                      type="checkbox"
                      onClick={handleCreditClick}
                      checked={showCredit}
                    />
                    <label class="form-check-label">Credit</label>
                  </div>

                  <div className="form-check ml-4" >
                    <input
                      class="form-check-input w-auto"
                      type="checkbox"
                      onClick={handleDebitClick}
                      checked={showDebit}
                    />
                    <label class="form-check-label">Debit</label>
                  </div>


                </div>


                {/* gujarati / english name box */}
                <div className="flex px-2 justify-content-between py-1">
                  <div className="form-check ml-4">
                    <input
                      class="form-check-input w-auto"
                      type="checkbox"
                      onClick={handleGujName}
                      checked={showGujName}
                    />
                    <label class="form-check-label">Gujarati</label>
                  </div>

                  <div className="form-check ml-4" >
                    <input
                      class="form-check-input w-auto"
                      type="checkbox"
                      onClick={handleEngName}
                      checked={showEngName}
                    />
                    <label class="form-check-label">English</label>
                  </div>
                </div>

                {/* date input box */}
                <div>
                  <input
                    placeholder=""
                    type="date"
                    format="dd-MM-yyyy"
                    value={currentDate}
                    onChange={(e) => {
                      setCurrentDate(e.target.value);
                      
                    }} />  </div>

              </div>




            </div>



            {/* Show member Data */}

            <table id="my-table" class="table table-striped mt-2">
              <thead>
                <tr className="bg-light">
                  <th scope="col">ID</th>
                  <th
                    style={{ cursor: "pointer" }}
                    onClick={() => sorting("f_name")}
                  >
                    Full Name <i class="bi bi-funnel-fill"></i>
                  </th>
                  <th scope="col">Clan</th>
                  <th scope="col">Opening bal.</th>
                  <th scope="col">Credit</th>
                  <th scope="col">Varshik Debit</th>
                  <th scope="col">Gross</th>
                  <th scope="col">{selectedYear}</th>
                  {/* <th id="hidden" className="text-center" colSpan={2} scope="col">
                    Handle
                  </th> */}
                </tr>
              </thead>

              <tbody>
                {/* {kdebit.map((k) => {
                  <td>amount : {k.f_name}</td>;
                })} */}

                {filterData.length > 0
                  ? filterData.map((e, idx) => {
                    let flag = 0;



                    // var dates=e.join_date.substring(0,10);
                    // console.log(e.join_date+" date: "+dates)
                    // var date = new Date(e.join_date).toJSON().slice(0,10)
                    // var components = date.split("-");
                    // var d = `${components[2]}-${components[1]}-${components[0]}`;

                    var d = e.join_date;

                    // var debit = e.total_paid;
                    // var credit = e.total_debit;


                    var credit = e.total_paid;
                    var debit = e.total_debit;
                    let total_credit = credit;
                    let total_debit = debit;

                    if (e.pre_entry > 0) {
                      total_credit = credit + e.pre_entry;
                    } else {
                      total_debit = debit - e.pre_entry;
                    }
                    var ga = total_credit - total_debit;  //gross amount

                    console.log(`${e.g_f_name} ${e.g_m_name} ${e.g_l_name}`)

                    return (
                      <>
                        <tr>
                          <th scope="row">{e.id}</th>


                          <td>
                            {showEngName &&
                              <div
                                id="member-name"
                                onClick={() => {
                                  fetchMemberOnClick(e.id);
                                }}
                              >{`${e.f_name} ${e.m_name} ${e.l_name}`}</div>}


                            {showGujName &&
                              <small style={{ fontSize: "smaller" }}>{`${e.g_f_name} ${e.g_m_name} ${e.g_l_name}`}</small>
                            }
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
                          <td>

                            {e.pre_entry >= 0 ? (
                              <p className="text-success">{e.pre_entry}</p>
                            ) : (
                              <p className="text-danger">{e.pre_entry}</p>
                            )}

                          </td>
                          <td>{credit}</td>
                          <td>{debit}</td>

                          <td>
                            {ga >= 0 ? (
                              <p className="text-success">{ga}</p>
                            ) : (
                              <p className="text-danger">{ga}</p>
                            )}
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
                  downloadPdf();
                }}
                class="btn btn-primary"
                id="hidden"
              >
                <i class="bi bi-printer"></i> Print
              </button>
            </div>

            <div class="col-lg-2 pagination" id="hidden">
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
