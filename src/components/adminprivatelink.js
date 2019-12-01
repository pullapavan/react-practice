import React from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";



const AdminPrivateLink = ({ to, role, privilege, displayname, ...rest }) => {
    let isRoleAuthorised = null
    let isPrivilegeAurhorised = null    
    if (!rest.name || !rest.roles || !rest.privileges) {
        return null
    }

    if (!role || role.legth === 0) {
        isRoleAuthorised = true;
    } else {
        role.forEach(item => {
            if (rest.roles.includes(item)) {
                isRoleAuthorised = true;
            }
        });
    }

    if (!privilege || privilege.legth === 0) {
        isPrivilegeAurhorised = true;
    } else {
        privilege.forEach(item => {
            if (rest.privileges.includes(item)) {
                isPrivilegeAurhorised = true;
            }
        });
    }
    return (
        (isRoleAuthorised && isPrivilegeAurhorised) ? <li><Link to={to}> {displayname}</Link></li> : null
    )
};
const mapStateToProps = function (state) {
    console.log(state.auth.name)
    return {
        name: state.auth.name,
        roles: state.auth.roles,
        privileges: state.auth.privileges
    }
}
export default connect(mapStateToProps)(AdminPrivateLink)