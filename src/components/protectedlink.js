import React from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

const ProtectedLink = ({ ...props }) => {
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
        showlink ? <Nav.Link ><Link onClick={props.onClick} to={props.to}><span style={{ color: "white" }}>{props.displayname}</span></Link></Nav.Link> : null
    )
}
const mapStateToProps = function (state) {
    return {
        empid: state.login.empid,
        empmail: state.login.empmail,
        roles: state.login.roles
    }
}
export default connect(mapStateToProps)(ProtectedLink)