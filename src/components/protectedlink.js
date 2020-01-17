import React from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

const ProtectedLink = ({ ...props }) => {
    let showlink = false
    let isloggedin, isAdmin, isPanel

    props.session && (isloggedin = true)
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

    if (props.adminaandpanel) {
        if (!isAdmin && !isPanel) {
            showlink = false
        } else {
            showlink = true
        }
    }
    return (
        showlink ? <Nav.Item><Link onClick={props.onClick} to={props.to}><span style={{ color: "white", margin: '1rem' }}>{props.displayname}</span></Link></Nav.Item> : null
    )
}
const mapStateToProps = function (state) {
    return {
        empid: state.login.empid,
        empmail: state.login.empmail,
        roles: state.login.roles,
        session: state.login.session
    }
}
export default connect(mapStateToProps)(ProtectedLink)