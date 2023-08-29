import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layout/Sidebar';
import { useLocation } from 'react-router-dom';
import TransitionAlerts from "../../Component/TransitionAlerts";
import CustomPrompt from '../../Component/CustomPrompt';


const EditPayment = () => {

  console.log("reached in Patment Info")

  const navigate = useNavigate()
  const location = useLocation();
  const [paymentId, setPaymentId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [rollNo, setRollNo] = useState('0');
  const [name, setName] = useState('')
  const [paymentAmount, setPaymentAmount] = useState('');
  const [collectedBy, setCollectedBy] = useState('');
  const [bookNo, setBookNo] = useState('');
  const [voucherNo, setVoucherNo] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [memberData, setMemberData] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [fetchMember, setFetchMember] = useState(false);
  const [filterMember, setFilterMember] = useState('');


  const getPaymentInfo = async () => {
    try {

      console.log("reachhed")
      const res = await axios.get(`${process.env.REACT_APP_URL}/getPaymentInfo/${location.state.paymentId}`)

      console.log(res.data[0].f_name)

      setMemberId(res.data[0].member_id)
      setPaymentId(res.data[0].id)
      setRollNo(res.data[0].roll_no)
      setName(res.data[0].f_name + " " + res.data[0].m_name + " " + res.data[0].l_name)
      console.log(name)
      setPaymentAmount(res.data[0].pay_amount)
      setCollectedBy(res.data[0].collected_by)
      setBookNo(res.data[0].book_no)
      setVoucherNo(res.data[0].voucher_no)
      setPaymentDate(res.data[0].payment_date_format)


      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPaymentInfo();
  }, []);



  // update Payment
  const updatePayment = async (e) => {
    e.preventDefault();
    const team = {

      paymentAmount: paymentAmount,
      collectedBy: collectedBy,
      bookNo: bookNo,
      voucherNo: voucherNo,
      paymentDate: paymentDate,
      paymentId: paymentId,
    }


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

      await axios.patch(`${process.env.REACT_APP_URL}/updatepayment/${paymentId}`, team).then((res) => {
        console.log(res);
        navigate("/paymentHistory")
      }).catch((e) => {
        displayAlert('Error', 'Payment Not Updated!', 'Please Try Again');
        console.log(e);
      })
    } catch (error) {
      displayAlert('Error', 'Payment Not Updated!', 'Please Try Again');
      console.log(error);
    }
  }





  // custom prompt
  const [dialogOpen, setDialogOpen] = React.useState(false);


  const deletePayment = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAgreeDialog = async (value) => {
    if (value === '1234') {
      try {
        await axios.delete(`${process.env.REACT_APP_URL}/deletePayment/${paymentId}`);
        navigate("/paymentHistory")
      } catch (error) {
        displayAlert('Error', 'Payment Not Deleted!', 'Please Try Again');
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
          <i class="uil uil-bars sidebar-toggle" style={{ opacity: 0 }} ></i>


       
        </div>

        <div class="dash-content   mt-5" >
          <div class="card">
            <span class="title mt-2">Edit Payment Transaction</span>
            <form class="form">
              <div Style="display:block">
                <div Style="float:left">
                  <label class="label"><span class="key" >Transaction Id:</span> {paymentId}</label>
                  <label class="label"><span class="key" >Member Id:</span> {memberId}</label>
                  <label class="label"><span class="key" >Member Name :</span> {name}</label>
                </div>
                <div Style="float:right; padding-right:40px;">
                  <button type="button" Style="background-color:#dc3545" onClick={deletePayment}>Delete Entry</button>

                </div>
              </div>
              {/* <div class="group ">
                <input className='mb-2'  minLength={0} placeholder="" type="number" value={memberId} onChange={(e) => { checkMember(e.target.value) }} required />
                <label for="name">Member ID</label>
              </div>

              
              <small >{memberData.length === 0 || fetchMember === false ? <p className='text-white bg-danger p-1'>Not Assigned Roll Number</p> : <p style={{ backgroundColor: "#49649b" }} className="p-1 text-white"> {memberData[0].f_name} {memberData[0].m_name} {memberData[0].l_name} </p>}</small>

              <div class="group">
                <input className='mb-2' type="text" value={name} onChange={(e) => { checkMember(e.target.value) }} required />
                <label for="name">Full Name</label>
              </div> */}


              <div class="group mt-3">
                <input placeholder="" type="text" value={paymentAmount} onChange={(e) => { setPaymentAmount(e.target.value) }} required />
                <label for="name">Payment Amount</label>
              </div>

              <div class="group">
                <input placeholder="" type="text" value={collectedBy} onChange={(e) => { setCollectedBy(e.target.value) }} required />
                <label for="name">Collected By</label>
              </div>

              <div class="group">
                <input placeholder="" type="text" value={bookNo} onChange={(e) => { setBookNo(e.target.value) }} required />
                <label for="name">Book No</label>
              </div>

              <div class="group">
                <input placeholder="" type="text" value={voucherNo} onChange={(e) => { setVoucherNo(e.target.value) }} required />
                <label for="name">Voucher No</label>
              </div>

              <div class="group mt-3">
                <input placeholder="" type="date" value={paymentDate} onChange={(e) => { setPaymentDate(e.target.value) }} required />
                <label for="name">Payment Date : <span class="key">MM/DD/YYYY</span> </label>
              </div>
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

              <button type="submit" onClick={updatePayment}>Update</button>
            </form>
          </div>

        </div>
      </section>
    </>
  )
}

export default EditPayment