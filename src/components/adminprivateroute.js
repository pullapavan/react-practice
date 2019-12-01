import React from 'react'
import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";


const AdminPrivateRoute = ({ component: Component, role, privilege, ...rest }) => {
    let isAuthorised = null;
    let isRoleAuthorised = null
    let isPrivilegeAurhorised = null
    return (
        <Route
            {...rest}
            render={() => {

                if (!rest.name || !rest.roles || !rest.privileges) {
                    isAuthorised = false
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

                return isAuthorised || (isRoleAuthorised && isPrivilegeAurhorised)
                    ? <Component {...rest} />
                    : <Redirect to="/forbidden" />
            }
            }
        />
    );
};
const mapStateToProps = function (state) {
    return {
        name: state.auth.name,
        roles: state.auth.roles,
        privileges: state.auth.privileges
    }
}

export default connect(mapStateToProps)(AdminPrivateRoute);

