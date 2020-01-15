import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Switch, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginAccessLink from '../loginaccesslink'
import LoginAccessRoute from '../loginaccessroute'
import LoginComponent from '../logincomponent/logincomponent';
import RegisterComponent from '../registercomponent/registercomponent';
import ProjectSubmissionComponent from '../projectsubmissioncomponent/projectsubmissionComponent';
import { logout } from '../../reducers/authorisationreducer/actions'

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
                        <LoginAccessLink to="/home" displayname="HOME" loginrequired={false} />
                        <LoginAccessLink to="/rules" displayname="RULES" loginrequired={false} />
                        <LoginAccessLink to="/register" displayname="REGISTRATION" hideonlogin={true} loginrequired={false} />
                        <LoginAccessLink to="/login" displayname="LOGIN" hideonlogin={true} loginrequired={false} />
                        <LoginAccessLink to="/project" displayname="PROJECT SUBMISSION" loginrequired={true} />
                        <LoginAccessLink to="/home" onClick={this.props.logout} displayname="LOGOUT" loginrequired={true} />
                    </Nav >
                </Navbar >
                <div className="text-center">
                    <Switch>
                        <LoginAccessRoute path="/login" hideonlogin={true} loginrequired={false} component={LoginComponent} />
                        <LoginAccessRoute path="/project" loginrequired={true} component={ProjectSubmissionComponent} />
                        <LoginAccessRoute path="/register" hideonlogin={true} loginrequired={false} component={RegisterComponent} />
                        <Route path='/home' render={() => <div>Home Component</div>}></Route>
                        <Route
                            path='/rules'
                            render={() => <div>Rules Component</div>}>
                        </Route>
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
