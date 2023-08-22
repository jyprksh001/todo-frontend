import React from "react";
import { connect } from "react-redux";
import {Route,Navigate} from "react-router-dom";

const AuthRoute = (props) => {
    const { isLoggedin } = props; 
    if (!isLoggedin) return <Navigate to="/" />;
    else if (isLoggedin) return <Navigate to="/home" />;
    return <Route {...props} />;
};

const mapStateToProps = ({isLoggedin}) => ({isLoggedin});

export default connect(mapStateToProps)(AuthRoute);