import React from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

const LoginAccessLink = ({ ...props }) => {
    let showlink = false;
    if (!props.loginrequired) {
        showlink = true;
    } else {
        props.empid && (showlink = true)
    }
    if (props.hideonlogin) {
        props.empid && (showlink = false)
    }
    return (
        showlink ? <Nav.Link ><Link onClick={props.onClick} to={props.to}><span style={{ color: "white" }}>{props.displayname}</span></Link></Nav.Link> : null
    )
}
const mapStateToProps = function (state) {
    return {
        empid: state.login.empid,
    }
}
export default connect(mapStateToProps)(LoginAccessLink)