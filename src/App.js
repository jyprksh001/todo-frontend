import React from "react";
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import { NotFound,Home,Signin } from "./components/pages/index";
import { connect } from "react-redux";

const  App = (props) => {
    const {isLoggedin}=props;
    console.log({isLoggedin})
    return (
      <BrowserRouter>
        <Routes>  
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={isLoggedin ? <Navigate to="/home" /> : <Signin />} />
          <Route path="/home" element={< Home/>} />
        </Routes>
      </BrowserRouter>
    );
}

const mapStateToProps = ({isLoggedin}) => ({isLoggedin});

export default connect(mapStateToProps)(App);
