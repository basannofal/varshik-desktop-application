import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";

const AddPayment = () => {
  const [memberId, setMemberId] = useState("");
  const [rollNo, setRollNo] = useState("0");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [collectedBy, setCollectedBy] = useState("");
  const [bookNo, setBookNo] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [memberData, setMemberData] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [fetchMember, setFetchMember] = useState(false);
  const [filterMember, setFilterMember] = useState("");

  const setSearch = (event) => {
    setFilterMember(event.target.value);
  };

  const getData = async () => {
    try {
      const res = await axios.get(`/getmember`);
      setMemberList(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
    if (
      team.paymentDate === "" ||
      team.rollNo <= 0 ||
      team.bookNo === "" ||
      team.voucherNo === "" ||
      isNaN(team.paymentAmount) ||
      team.paymentAmount.trim() === ""
    ) {
      window.alert("Please Check Roll No OR Payment Amount OR Payment Date");
      return;
    }

    console.log(team);
    try {
      if (!fetchMember) {
        window.alert("Roll Number Is Incorrect");
        return;
      }
      await axios
        .post(`/addpayment/${memberId}/${rollNo}`, team)
        .then((res) => {
          console.log(res);
          window.alert("Payment Successfully");
        })
        .catch((e) => {
          window.alert("Incorrect Roll No ");
          console.log(e);
        });
      console.log("hello");
    } catch (error) {
      console.log(error);
    }
  };

  const checkMember = async (grno) => {
    setRollNo(grno);
    try {
      setMemberId(0);
      await axios
        .get(`/getpermember/${grno}`)
        .then((res) => {
          if (res.data[0] != undefined) {
            setMemberId(res.data[0].id);
            setFetchMember(true);
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

  const onSearch = (searchTerm, roll_no) => {
    setFilterMember(searchTerm);
    // our api to fetch the search result
    checkMember(roll_no);
    console.log("search ", searchTerm, roll_no);
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
                  // const fullName = `${item.f_name} ${item.m_name} ${item.l_name}`
                  const fullName = `${f_name}+${m_name}+${l_name}`;
                  return (
                    searchTerm &&
                    fullName.startsWith(searchTerm) &&
                    fullName !== searchTerm
                  );
                  // return (
                  //   searchTerm!='' &&
                  //   fullName.indexOf(searchTerm) !== -1 &&
                  //   fullName !== searchTerm
                  // );
                })

                .map((item) => (
                  <div
                    onClick={() =>
                      onSearch(
                        `${item.f_name} ${item.m_name} ${item.l_name}`,
                        item.id
                      )
                    }
                    className="sfdropdown-row"
                    key={item.f_name}
                  >
                    {`${item.f_name} ${item.m_name} ${item.l_name}`}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div class="dash-content mt-5">
          <div class="card">
            <span class="title mt-2">Add Payment</span>
            <form class="form">
              <div class="group ">
                <input
                  className="mb-2"
                  minLength={0}
                  placeholder=""
                  type="number"
                  value={memberId}
                  onChange={(e) => {
                    checkMember(e.target.value);
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
                    setPaymentAmount(e.target.value);
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
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddPayment;
