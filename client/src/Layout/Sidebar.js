import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  useEffect(() => {

  }, []);
  return (
    <>

      <nav>
        <div class="logo-name">
          <div class="logo-image">
          </div>

          <span class="logo_name">Valudas</span>
        </div>

        <div class="menu-items">
          <ul class="nav-links">
            <li>
              <a href="#">
                <NavLink to={'/allclan'}>
                  <i class="uil uil-estate"></i>
                  <span class="link-name">Clan</span>
                </NavLink>
              </a>
            </li>
            <li><a href="#">
              <NavLink to={`/allmember`}>
                <i class="uil uil-files-landscapes"></i>
                <span class="link-name">Member</span>
              </NavLink>
            </a></li>


            <li><a href="#">
              <NavLink to={`/allyearlyincome`}>
                <i class="uil uil-chart"></i>
                <span class="link-name">Yearly Income</span>
              </NavLink>
            </a></li>



            {/* <li><a href="#">
            <NavLink to={`/addpayment`} >
              <i class="uil uil-thumbs-up"></i>
              <span class="link-name">Payment</span>
            </NavLink>
            </a></li> */}

            <li><a href="#">
              <NavLink to={'/allexpenses'}>
                <i class="uil uil-comments"></i>
                <span class="link-name">Expenses</span>
              </NavLink>
            </a></li>

            <li><a href="#">
              <NavLink to={'/allincome'}>
                <i class="bi bi-currency-rupee"></i>
                <span class="link-name">Income</span>
              </NavLink>
            </a></li>

            <li><a href="#">
              <NavLink to={'/paymentHistory'}>
              <i class="bi bi-credit-card-2-back"></i>
                <span class="link-name">Payment History</span>
              </NavLink>
            </a></li>

            <li><a href="#">
              <NavLink to={'/memberList'}>
                <i class="uil uil-history"></i>
                <span class="link-name">List By Clan</span>
              </NavLink>
            </a></li>

            {/* <li><a href="#">
              <i class="uil uil-comments"></i>
              <span class="link-name">Comment</span>
            </a></li>
            <li><a href="#">
              <i class="uil uil-share"></i>
              <span class="link-name">Share</span>
            </a></li> */}

          </ul>
          {/* 
          <ul class="logout-mode">
            <li><a href="#">
              <i class="uil uil-signout"></i>
              <span class="link-name">Logout</span>
            </a></li>

            <li class="mode">
              <a href="#">
                <i class="uil uil-moon"></i>
                <span class="link-name">Dark Mode</span>
              </a>

              <div class="mode-toggle">
                <span class="switch"></span>
              </div>
            </li>
          </ul> */}
        </div>
      </nav>


    </>
  )
}

export default Sidebar