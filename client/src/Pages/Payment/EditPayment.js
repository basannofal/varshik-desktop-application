import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layout/Sidebar';
import { useLocation } from 'react-router-dom';


const EditPayment = () => {

  console.log("reached in Patment Info")

  const location=useLocation();
  const [paymentId,setPaymentId]=useState('');
  const [memberId, setMemberId] = useState('');
  const [rollNo, setRollNo] = useState('0');
  const [name, setName]=useState('')
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

  // const setSerch = (event) => {
  //   setFilterMember(event.target.value);
  // };


  const getPaymentInfo = async () => {
    try {

      console.log("reachhed")
      const res = await axios.get(`/getPaymentInfo/${location.state.paymentId}`)
      
      console.log(res.data[0].f_name)
      
      setMemberId(res.data[0].member_id)
      setPaymentId(res.data[0].id)
      setRollNo(res.data[0].roll_no)
      setName(res.data[0].f_name+" "+res.data[0].m_name+" "+res.data[0].l_name)
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


  const updatePayment= async (e) => {
    e.preventDefault();

    const team = {
     
      paymentAmount: paymentAmount,
      collectedBy: collectedBy,
      bookNo: bookNo,
      voucherNo: voucherNo,
      paymentDate: paymentDate,
      paymentId: paymentId,
    }
    if (team.paymentDate === '' || team.rollNo <= 0 || team.bookNo === '' || team.voucherNo === '' || isNaN(team.paymentAmount) || team.paymentAmount.trim() === '') {
      window.alert("Please Check Roll No OR Payment Amount OR Payment Date")
      return
    }

    console.log(team);
    try {
     
      await axios.post(`/updatePayment/${paymentId}`, team).then((res) => {
        console.log(res);
        window.alert("Payment Updated Successfully");
      }).catch((e) => {
        window.alert("Payment not has been Updated");
        console.log(e);
      })
      console.log("hello");
    } catch (error) {
      console.log(error);
    }
  }

const deletePayment=async()=>{
    await axios.delete(`/deletePayment/${paymentId}`).then((res)=>{
        window.alert("Payment Entry  Succesfully Deleted");
    }).catch((e)=>{
      window.alert("Payment Can't Be Deleted")
    })

}

  // const checkMember = async (grno) => {
  //   setRollNo(grno)
  //   try {
  //     setMemberId(0);
  //     await axios.get(`/getpermember/${grno}`).then((res) => {
  //       if (res.data[0] != undefined) {
  //         setMemberId(res.data[0].id)
  //         setFetchMember(true)
  //       } else {
  //         setFetchMember(false)
  //       }
  //       setMemberData(res.data)
  //       console.log(res.data);
  //     }).catch((e) => {
  //       console.log(e);
  //       setFetchMember(false)
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const onSearch = (searchTerm, roll_no) => {
  //   setFilterMember(searchTerm);
  //   // our api to fetch the search result
  //   checkMember(roll_no)
  //   console.log("search ", searchTerm, roll_no);
  // };

  return (
    <>
      <Sidebar />
      <section class="dashboard">
        <div class="top">
         <i class="uil uil-bars sidebar-toggle" style={{ opacity: 0 }} ></i>


          {/* FilterMember Start */}

          {/* <div>
            
            <div class="input-group mb-1">
              <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={filterMember} onChange={setSerch} />
              <div class="input-group-prepend">
                <i class="uil uil-search input-group-text"></i>
               
              </div>
            </div>
            <div className="sfdropdown">
              {paymentInfo
                .filter((item) => {
                  const searchTerm = filterMember.toLowerCase();
                  const f_name = item.f_name.toLowerCase();
                  const m_name = item.m_name.toLowerCase();
                  const l_name = item.l_name.toLowerCase();
                  const fullName = `${item.f_name} ${item.m_name} ${item.l_name}`
                  return (
                    searchTerm &&
                    fullName.indexOf(searchTerm) !== -1 &&
                    fullName !== searchTerm
                  );
                })
                .slice(0, 10)
                .map((item) => (
                  <div
                    onClick={() => onSearch(`${item.f_name} ${item.m_name} ${item.l_name}`, item.id)}
                    className="sfdropdown-row"
                    key={item.f_name}
                  >
                    {`${item.f_name} ${item.m_name} ${item.l_name}`}
                  </div>
                ))}
            </div>
          </div> */}
          {/* filter member end */}

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
                  <button  type="button" Style="background-color:#dc3545" onClick={deletePayment}>Delete Entry</button>
                  
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
                <input placeholder="" type="text"  value={bookNo} onChange={(e) => { setBookNo(e.target.value) }} required />
                <label for="name">Book No</label>
              </div>

              <div class="group">
                <input placeholder="" type="text"  value={voucherNo} onChange={(e) => { setVoucherNo(e.target.value) }} required />
                <label for="name">Voucher No</label>
              </div>

              <div class="group mt-3">
                <input placeholder="" type="date" value={paymentDate} onChange={(e) => { setPaymentDate(e.target.value) }} required />
                <label for="name">Payment Date : <span class="key">MM/DD/YYYY</span> </label>
              </div>



              <button type="submit" onClick={updatePayment}>Update</button>
            </form>
          </div>

        </div>
      </section>
    </>
  )
}

export default EditPayment