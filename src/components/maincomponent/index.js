import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Switch, Link, Route } from 'react-router-dom';
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
                        <ProtectedLink to="/panel" displayname="PANEL MEMBERS" mustlogin={true} admin={true} />
                        <ProtectedLink to="/projectlist" displayname="PROJECTS LIST" mustlogin={true} admin={true} panel={true} />
                        <ProtectedLink to="/login" onClick={this.props.logout} displayname="LOGOUT" mustlogin={true} />
                    </Nav >
                </Navbar >
                <div className="text-center">
                    <Switch>
                        <Route path='/home' render={() => <div>Home Component</div>}></Route>
                        <Route path='/rules' render={() => <div>Rules Component</div>}></Route>
                        <Route path='/team' component={TeamFormationComponent}></Route>
                        <ProtectedRoute path="/register" hideonlogin={true} component={RegisterComponent} />
                        <ProtectedRoute path="/login" hideonlogin={true} component={LoginComponent} />
                        <ProtectedRoute path="/project" mustlogin={true} component={ProjectSubmissionComponent} />
                        <ProtectedRoute path="/panel" mustlogin={true} admin={true} component={PanelCreationComponent} />
                        <ProtectedRoute path="/projectlist" mustlogin={true} admin={true} panel={true} />
                    </Switch>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ logout }, dispatch)
}
export default connect(null, mapDispatchToProps)(MainComponent)
