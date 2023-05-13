import { useEffect, useState } from "react";
import Sidebar from "../../Layout/Sidebar";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const [order, setOrder] = useState("ASC");

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...paymentHistory].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setPaymentHistory(sorted);
      setOrder("DSC")
    }

    if (order === "DSC") {
      const sorted = [...paymentHistory].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setPaymentHistory(sorted);
      setOrder("ASC")
    }
  }

  const getPaymentHistory = async () => {
    try {
      await axios
        .get("/getPaymentHistory")
        .then((res) => {
          //  console.log(res)
          setPaymentHistory(res.data);
          console.log(paymentHistory);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getPaymentHistory();
    return () => { };
  }, []);


  const itemPerPage = 6;

  const numberOfPage = Math.ceil(paymentHistory.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const rows = paymentHistory.slice(
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
              value={searchFilter}
              onChange={(e) => {
                setSearchFilter(e.target.value);
              }}
            />
          </div>
        </div>

        <div class="dash-content  pt-3">
          <div class="overview">
            <div
              class="title"
              style={{ display: "flex", justifyContent: "right" }}
            >
              <NavLink to={`/addPayment`} style={{ textDecoration: "none" }}>
                <button
                  className="btn btn-primary d-flex "
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <i
                    class="uil uil-plus mr-2"
                    style={{ backgroundColor: "#007bff" }}
                  ></i>
                  New Payment
                </button>
              </NavLink>
            </div>
          </div>

          <div class="activity ">
            <div class="title mt-0">
              <i class="uil uil-clock-three"></i>
              <span class="text">All Payment</span>
            </div>

            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Payment ID</th>
                  <th scope="col">Member ID</th>
                  <th style={{ cursor: 'pointer' }} onClick={() => sorting("f_name")} scope="col">Member Name <i class="bi bi-funnel-fill"></i></th>
                  <th scope="col">Amount</th>
                  <th scope="col">Book No</th>
                  <th scope="col">Vouchar No</th>
                  <th scope="col">Payment Date</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0
                  ? rows
                    .filter((k) => {


                      const group = `${k.f_name} ${k.m_name} ${k.l_name}`

                      return (searchFilter.toLowerCase() === ""
                        ? k
                        : k.f_name.toLowerCase().includes(searchFilter) ||
                        k.m_name.toLowerCase().includes(searchFilter) ||
                        k.l_name.toLowerCase().includes(searchFilter) ||
                        group.toLowerCase().includes(searchFilter) || Number(searchFilter) == k.id || Number(searchFilter) == k.member_id || Number(searchFilter) == k.pay_amount || Number(searchFilter) == k.book_no || Number(searchFilter) == k.voucher_no);
                    })

                    .map((paymentData) => {
                      return (
                        <>
                          <tr>
                            <td scope="col">{paymentData.id} </td>
                            <td scope="col">{paymentData.member_id}</td>
                            <td scope="col">
                              {paymentData.f_name +
                                " " +
                                paymentData.m_name +
                                " " +
                                paymentData.l_name}
                            </td>
                            <td scope="col">{paymentData.pay_amount}</td>
                            <td scope="col">{paymentData.book_no}</td>
                            <td scope="col">{paymentData.voucher_no}</td>
                            <td scope="col">{paymentData.payment_date}</td>
                            <td scope="col">
                              <Link
                                to="/editPayment"
                                state={{ paymentId: paymentData.id }}
                              >
                                <i class="uil uil-pen handle"></i>
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

export default PaymentHistory;
