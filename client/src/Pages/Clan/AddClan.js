import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import TransitionAlerts from "../../Component/TransitionAlerts";

const AddClan = () => {
  const navigate = useNavigate();
  const [clanName, setClanName] = useState("");
  const [parentClan, setParentClan] = useState(null);
  const [clan, setClan] = useState([]);
  const [clanFilterValue,setClanFilterValue]=useState('');
  const [clanList,setClanList]=useState([]);
  

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/getclan`);
      setClan(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getClanList();
  }, []);

  const getClanList=async()=>{

    try{
    const res=await axios.get(`${process.env.REACT_APP_URL}/getclan`);
     setClanList(res.data);
    }catch(e){
      console.log(e);
    }
    
  }

  // save data
  const savedata = async (e) => {
    e.preventDefault();
    console.log(parentClan);
    const team = {
      clanName: clanName,
      parentClan: parentClan,
    };
    console.log(team);
    try {
      await axios.post(`${process.env.REACT_APP_URL}/addclan`, team)
        .then((res) => {
          console.log(res);
          displayAlert('Success', 'Clan added successfully!', 'OK');
          navigate("/allclan", { replace: true });
        })
        .catch((e) => {
          displayAlert('Error', 'Clan Not Added!', 'Please Try Again');
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
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
            <input type="text" placeholder="Search here..." />
          </div>
        </div>

        <div class="dash-content   mt-5">
          <div class="card">
            <span class="title mt-2">Add New Clan </span>
            <form class="form">
              <div class="group">
                <input
                  placeholder=""
                  type="text"
                  value={clanName}
                  onChange={(e) => {
                    setClanName(e.target.value);
                    setClanFilterValue(e.target.value);
                  }}
                />

                <div>
                  {clanList.filter((item)=>{
                    const filteredText=clanFilterValue.toLowerCase();
                    const clanItem=item.clan_name.toLowerCase();
                    return clanFilterValue && clanItem.startsWith(filteredText);
                  }).map((item)=>{

                    return(
                      <div>{item.clan_name}</div>
                    )
                    
                  })
                  
                  }

                </div>

                <label for="name">Clan Name</label>
              </div>
              <label className="my-2 mb-4">Parent Clan</label>
              <div className="group">
                <label for="exampleInputEmail1">Parent Clan</label>
                <select
                  name="parentclan"
                  placeholder=""
                  id="parentclan"
                  value={parentClan}
                  onChange={(e) => {
                    setParentClan(e.target.value);
                    console.log(parentClan);
                  }}
                >
                  <option value="Null">Null</option>
                  {clan.map((e) => {
                    return (
                      <>
                        <option value={e.id}>{e.clan_name}</option>
                      </>
                    );
                  })}
                </select>
              </div>
              <button type="submit" onClick={savedata}>
                Submit
              </button>
            </form>
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

export default AddClan;

// <div class="group">
//                 <textarea placeholder="" id="comment" name="comment" rows="5" ></textarea>
//                 <label for="comment">Comment</label>
//               </div>
