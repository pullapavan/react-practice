import React from 'react'
import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
    let showlink = false
    let isloggedin, isAdmin, isPanel

    props.empid && (isloggedin = true)
    isloggedin && props.roles && props.roles.includes("ADMIN") && (isAdmin = true)
    isloggedin && props.roles && props.roles.includes("PANEL") && (isPanel = true)
    if (props.mustlogin) {
        isloggedin && (showlink = true)
    } else {
        showlink = true;
    }

    if (props.hideonlogin) {
        showlink = !isloggedin
    }

    if (props.admin) {
        showlink = isAdmin
    }

    if (props.panel) {
        showlink = isPanel
    }
    return (
        <Route
            render={
                () => {
                    return showlink ? <Component {...props} /> : <Redirect to="/home" />
                }
            }
        />
    )
}

const mapStateToProps = function (state) {
    return {
        empid: state.login.empid,
        empmail: state.login.empmail,
        roles: state.login.roles
    }
}
export default connect(mapStateToProps)(ProtectedRoute)