import React from "react"
import { Route,Routes } from "react-router-dom"
import MemberList from "../Pages/Reports/MemberList"
const Report=()=>{

    return(
        <>
        <Routes>
            <Route path='/memberList' element={<MemberList/>}/>
        </Routes>
        </>
    )
}

export default Report