import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProtectedLink from '../protectedlink'
import ProtectedRoute from '../protectedroute'
import LoginComponent from '../logincomponent/logincomponent';
import RegisterComponent from '../registercomponent/registercomponent';
import ProjectSubmissionComponent from '../projectsubmissioncomponent/projectsubmissionComponent';
import { logout } from '../../reducers/authorisationreducer/actions'
import TeamFormationComponent from '../teamformation/teamformation'
import PanelCreationComponent from '../createpanel/createpanel'
import ProjectList from '../projectslist/projectslist'
import HomeComponent from '../homecomponent/homecomponent'
import RulesComponent from '../rulescomponent/rulescomponent'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand>Hackthon</Navbar.Brand>
                    <Nav className="mr-auto">
                        <ProtectedLink to="/home" displayname="HOME" />
                        <ProtectedLink to="/rules" displayname="OVERVIEW" />
                        <ProtectedLink to="/register" displayname="REGISTRATION" hideonlogin={true} />
                        <ProtectedLink to="/login" displayname="LOGIN" hideonlogin={true} />
                        <ProtectedLink to="/project" displayname="PROJECT SUBMISSION" mustlogin={true} />
                        <ProtectedLink to="/team" displayname="TEAM-FORMATION" mustlogin={true} />
                        <ProtectedLink to="/panel" displayname="PANEL MEMBERS" mustlogin={true} admin={true} />
                        <ProtectedLink to="/projectlist" displayname="PROJECTS LIST" mustlogin={true} adminaandpanel={true} />
                        <ProtectedLink to="/login" onClick={this.props.logout} displayname="LOGOUT" mustlogin={true} />
                        <ProtectedLink to="/home" displayname={this.props.empid + "-" + this.props.empmail} mustlogin={true} />
                    </Nav >
                </Navbar >
                <div className="">
                    <Switch>
                        <Route path='/home' component={HomeComponent}></Route>
                        <Route exact path='/' component={HomeComponent}></Route>
                        <Route path='/rules' component={RulesComponent}></Route>
                        <Route path='/team' component={TeamFormationComponent}></Route>
                        <ProtectedRoute path="/register" hideonlogin={true} component={RegisterComponent} />
                        <ProtectedRoute path="/login" hideonlogin={true} component={LoginComponent} />
                        <ProtectedRoute path="/project" mustlogin={true} component={ProjectSubmissionComponent} />
                        <ProtectedRoute path="/projectlist" mustlogin={true} adminaandpanel={true} component={ProjectList} />
                        <ProtectedRoute path="/panel" mustlogin={true} admin={true} component={PanelCreationComponent} />
                    </Switch>
                </div>
            </div>
        )
    }
}
const mapStateToProps = function (state) {
    return {
        empid: state.login.empid,
        empmail: state.login.empemail,
        roles: state.login.roles,
        session: state.login.session
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ logout }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MainComponent)
