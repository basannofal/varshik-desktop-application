import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import TransitionAlerts from "../../Component/TransitionAlerts";


const AddPayment = () => {
  const [memberId, setMemberId] = useState("");
  const [rollNo, setRollNo] = useState("0");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [collectedBy, setCollectedBy] = useState("");
  const [bookNo, setBookNo] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().substr(0, 10));
  const [memberData, setMemberData] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [fetchMember, setFetchMember] = useState(false);
  const [filterMember, setFilterMember] = useState("");
  const [dMemberID, setdMemberID] = useState(0);

  const setSearch = (event) => {
    setFilterMember(event.target.value);
  };

  const navigate = useNavigate();


  const [payment, setpayment] = useState([]);

  const getSinglePaymentData = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_URL}/getsinglepaymentdata`)
        .then((res) => {
          console.log(res.data);
          setpayment(res.data[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };




  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/getmember`);
      setMemberList(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getSinglePaymentData()
  }, []);




  //savedata
  const savedata = async (e) => {
    e.preventDefault();

    const team = {
      memberId: memberId,
      rollNo: rollNo,
      paymentAmount: paymentAmount,
      collectedBy: collectedBy,
      bookNo: bookNo,
      voucherNo: voucherNo,
      paymentDate: paymentDate,
    };

    if (memberId <= 0) {
      displayAlert('Error', 'Please Enter Correct Roll No!', 'Please Try Again');
      return;
    }


    if (paymentAmount <= 0) {
      displayAlert('Error', 'Please Enter Atleast 1 Rupees!', 'Please Try Again');
      return;
    }

    if (bookNo == '') {
      displayAlert('Error', 'Please Enter Book No!', 'Please Try Again');
      return;
    }


    if (voucherNo == '') {
      displayAlert('Error', 'Please Enter Voucher No!', 'Please Try Again');
      return;
    }

    if (paymentDate == '') {
      displayAlert('Error', 'Please Select Date!', 'Please Try Again');
      return;
    }


    console.log(team);
    try {
      if (!fetchMember) {
        displayAlert('Error', 'Enter Correct Roll No!', 'Please Try Again');
        return;
      }
      await axios.post(`${process.env.REACT_APP_URL}/addpayment/${memberId}/${rollNo}`, team)
        .then((res) => {
          console.log(res);
          navigate('/paymentHistory')
        })
        .catch((e) => {
          displayAlert('Error', 'Payment Not Added!', 'Please Try Again');
          console.log(e);
        });
      console.log("hello");
    } catch (error) {
      displayAlert('Error', 'Payment Not Added!', 'Please Try Again');
      console.log(error);
    }
  };

  const checkMember = async (id) => {
    setRollNo(id);
    try {
      await axios.get(`${process.env.REACT_APP_URL}/getpermemberbyrollno/${id}`)
        .then((res) => {
          if (res.data[0] != undefined) {
            setFetchMember(true);
            setMemberId(res.data[0].id);
          } else {
            setFetchMember(false);
          }
          setMemberData(res.data);
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
          setFetchMember(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (searchTerm, id) => {
    setFilterMember(searchTerm);
    // our api to fetch the search result
    checkMember(id);
    setFilterMember('')

    console.log("search ", searchTerm, id);
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
          <i class="uil uil-bars sidebar-toggle" style={{ opacity: 0 }}></i>

          <div>
            {/* <div className="search-inner ">
              <input type="text" placeholder="Search here..." value={filterMember} onChange={setSerch} />
            </div> */}
            <div class="input-group mb-1">
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={filterMember}
                onChange={setSearch}
              />
              <div class="input-group-prepend">
                <i class="uil uil-search input-group-text"></i>
                {/* <span class="input-group-text" id="inputGroup-sizing-default">Default</span> */}
              </div>
            </div>
            <div className="sfdropdown">
              {memberList
                .filter((item) => {
                  const searchTerm = filterMember.toLowerCase();
                  const f_name = item.f_name.toLowerCase();
                  const m_name = item.m_name.toLowerCase();
                  const l_name = item.l_name.toLowerCase();
                  const fullName = `${f_name} ${m_name} ${l_name}`;
                  return (
                    searchTerm &&
                    fullName.toLowerCase().includes(searchTerm)
                  );

                  {/* return (
                    (f_name.startsWith(searchTerm) ||
                      m_name.startsWith(searchTerm) ||
                      l_name.startsWith(searchTerm)) &&
                    `${f_name} ${m_name} ${l_name}` !== searchTerm
                  ); */}
                  {/* return (
                    searchTerm &&
                    fullName.startsWith(searchTerm) &&
                    fullName !== searchTerm
                  ); */}
                })

                .map((item) => {
                  const fullName = `${item.f_name} ${item.m_name} ${item.l_name}`;
                  if (fullName.toLowerCase() === filterMember.toLowerCase()) {
                    return null; // Skip rendering this item in the dropdown
                  }
                  return (
                    <div
                      onClick={() =>
                        onSearch(fullName, item.id)
                      }
                      className="sfdropdown-row"
                      key={item.id}
                    >
                      {fullName}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div class="dash-content mt-5">
          <div>
            <div style={{ marginBottom: "20px" }}>
              <span><b style={{ color: 'red' }}>Member  No : </b> {payment.member_id}</span>
              <span><b style={{ color: 'red', paddingLeft: "20px" }}>Full Name : </b> {payment.member_name}</span>
              <span><b style={{ color: 'red', paddingLeft: "20px" }}>Clan Name : </b> {payment.clan_name}</span>

              <span><b style={{ color: 'red', paddingLeft: "20px" }}>Amount : </b> {payment.pay_amount}</span>

            </div>
          </div>
          <div class="card">
            <span class="title mt-2">Add Payment</span>
            <form class="form">
              <div class="group ">
                <input
                  className="mb-2"
                  minLength={0}
                  placeholder=""
                  type="text"
                  value={rollNo}
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      checkMember(e.target.value);
                    }
                  }}
                  required
                />
                <label for="name">Member ID</label>
              </div>
              <small>
                {memberData.length === 0 || fetchMember === false ? (
                  <p className="text-white bg-danger p-1">
                    Not Assigned Roll Number
                  </p>
                ) : (
                  <p
                    style={{ backgroundColor: "#49649b" }}
                    className="p-1 text-white"
                  >
                    {" "}
                    {memberData[0].f_name} {memberData[0].m_name}{" "}
                    {memberData[0].l_name}{" "}
                  </p>
                )}
              </small>

              <div class="group mt-3">
                <input
                  placeholder=""
                  type="text"
                  value={paymentAmount}
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      setPaymentAmount(e.target.value);
                    }
                  }}
                  required
                />
                <label for="name">Payment Amount</label>
              </div>

              <div class="group">
                <input
                  placeholder=""
                  type="text"
                  value={collectedBy}
                  onChange={(e) => {
                    setCollectedBy(e.target.value);
                  }}
                  required
                />
                <label for="name">Collected By</label>
              </div>

              <div class="group">
                <input
                  placeholder=""
                  type="text"
                  value={bookNo}
                  onChange={(e) => {
                    setBookNo(e.target.value);
                  }}
                  required
                />
                <label for="name">Book No</label>
              </div>

              <div class="group">
                <input
                  placeholder=""
                  type="text"
                  value={voucherNo}
                  onChange={(e) => {
                    setVoucherNo(e.target.value);
                  }}
                  required
                />
                <label for="name">Voucher No</label>
              </div>

              <div class="group mt-3">
                <input
                  placeholder=""
                  type="date"
                  format="dd-MM-yyyy"
                  value={paymentDate}
                  onChange={(e) => {
                    setPaymentDate(e.target.value);
                  }}
                  required
                />
                <label for="name">Payment Date</label>
              </div>

              <button type="submit" onClick={savedata}>
                Submit
              </button>

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
  );
};

export default AddPayment;
// CREATE TRIGGER `add_payment` AFTER INSERT ON `member`  FOR EACH ROW INSERT INTO payment (`member_id`, `roll_no`, `pay_amount`, `collected_by`, `book_no`, `voucher_no`, `payment_date`) VALUES (NEW.id, NEW.roll_no, 0, 'trigger', 0,0, NEW.join_date)