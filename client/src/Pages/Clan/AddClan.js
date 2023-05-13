import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";

const AddClan = () => {
  const navigate = useNavigate();
  const [clanName, setClanName] = useState("");
  const [parentClan, setParentClan] = useState(null);
  const [clan, setClan] = useState([]);

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

  const savedata = async (e) => {
    e.preventDefault();
    console.log(parentClan);
    const team = {
      clanName: clanName,
      parentClan: parentClan,
    };
    console.log(team);
    try {
      await axios
        .post("/addclan", team)
        .then((res) => {
          console.log(res);
          window.alert("Clan Added Successfully");
          // navigate("/allclan", { replace: true });
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
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
                  }}
                />
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
