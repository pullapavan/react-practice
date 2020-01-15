import React from 'react'
import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";

const LoginAccessRoute = ({ component: Component, ...props }) => {
    let showRoute = false;
    let redirect = <Redirect to="/login" />
    if (!props.loginrequired) {
        showRoute = true;
    } else {
        props.empid && (showRoute = true)
    }
    if (props.hideonlogin) {
        redirect = <Redirect to="/project" />
    }
    return (
        <Route
            render={
                () => {
                    return showRoute ? <Component {...props} /> : <Redirect to="/login" />
                }
            }
        />
    )
}

const mapStateToProps = function (state) {
    return {
        empid: state.login.empid,
    }
}
export default connect(mapStateToProps)(LoginAccessRoute)