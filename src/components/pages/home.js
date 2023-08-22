import React from "react";
import { connect } from "react-redux";
import Task from "./../UI/organisms/Task";
const Home = ({isLoggedin}) => {
    return (
      <div>
        {isLoggedin?<Task/>:"Please log in"}
      </div>
    )
}

const mapStateToProps = ({isLoggedin}) => ({isLoggedin});

export default connect(mapStateToProps)(Home);

