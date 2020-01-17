import React from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertComponent from '../commoncomponents/alert'
import { login } from '../../reducers/authorisationreducer/actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import Table from 'react-bootstrap/Table'
import { Link } from "react-router-dom";
import AXIOS from '../../configurations/axiosinterceptor'
import { validateEmployeeId, validateEmployeeEmailId, validatePassword, isEmpty, isEmployeExists } from '../../validations/fieldvalidations'

class TeamFormationComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teamname: '',
            searchid: '',
            error: false,
            errormessage: "",
            existingteams: [],
            dynamicteammumbers: []
        };
    }
    componentDidMount() {
        if (!this.props.session) {
            this.props.history.push("/home")
        }
        this.getExistingTeams()
    }
    getExistingTeams = () => {

        AXIOS.get('team/all/by/' + this.props.empid).then((response) => {
            if (response && response.data) {
                console.log(response)
                let { existingteams } = this.state
                response.data.forEach((object) => {
                    existingteams.push(object)
                })
                this.setState({ existingteams })
            }
        }).catch(error => {
            console.log(error.response)
            // this.errorAck(error.response.data && error.response.data.error && error.response.data.error.message)
        })

        this.setState({
            teams: [
                {
                    name: "TEAM_123",
                    createdby: "422",
                    members: ["423", "424", "425"]
                }
            ]
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, error: false, errormessage: null })
    }

    saveTeam = () => {
        if (isEmpty(this.state.teamname)) {
            this.errorAck('Enter valid team name')
            return;
        }
        if (!this.state.dynamicteammumbers || this.state.dynamicteammumbers.length === 0) {
            this.errorAck('select atleast one team member')
            return;
        }
        this.saveToDatabase()
    }

    setGenericError = (msg) => {
        this.setState({
            error: true, errormessage: msg || "please try after some time"
        })
    }

    saveToDatabase = () => {

        AXIOS.post('team', {
            name: this.state.teamname,
            createdBy: this.props.empid,
            members: this.state.dynamicteammumbers
        }).
            then(response => {
                console.log(response)
                if (response && response.data && this.state.teamname == response.data.name) {
                    let { existingteams } = this.state
                    existingteams = [...existingteams, response.data]
                    this.setState({ dynamicteammumbers: [], existingteams, error: true, errormessage: "team created Successfully" })
                } else {
                    this.setGenericError("please try after some time");
                    return
                }
            }).catch(error => {
                console.log(error.response)
                this.setGenericError((error.response.data && error.response.data.error.message));
                return
            })
    }



    errorAck = (msg) => {
        this.setState({ error: true, errormessage: msg || "Enter valid registered empID" })
    }

    searchId = () => {
        if (this.state.empid == this.props.empid) {
            return;
        }

        if (!validateEmployeeId(this.state.empid)) {
            this.errorAck()
            return;
        }

        AXIOS.get('user/by/id?id=' + this.state.empid).then((response) => {
            if (response && response.data && response.data.id == this.state.empid) {
                let { dynamicteammumbers } = this.state
                dynamicteammumbers.push(this.state.empid)
                this.setState({ dynamicteammumbers })
                return true;
            }
        }).catch(error => {
            this.errorAck(error.response.data && error.response.data.error && error.response.data.error.message)
            return;
        })
    }
    remove = (index) => {
        let { dynamicteammumbers } = this.state
        dynamicteammumbers.splice(index, 1);
        this.setState({ dynamicteammumbers, empid: null })
    }
    render() {
        const mystyle = {
            card: { width: '15rem', textAlign: 'center', margin: 'auto', top: '2rem' },
            p10: { padding: '10px' }
        };
        return (
            <>
                <span><Link to="/project">Go to Project submit page</Link></span>
                <div style={mystyle.card} className="container">
                    <AlertComponent showFlag={this.state.error} variant='danger' message={this.state.errormessage} />
                    <div style={mystyle.p10}>
                        <span><h4>Create Teams</h4></span>
                    </div>
                    <div style={mystyle.card} >
                        <Form>
                            <Form.Group controlId="teamname">
                                <Form.Control name="teamname" onChange={this.handleChange} type="text" maxLength="20" placeholder="Enter your Team name" />
                            </Form.Group>
                            <Form.Group controlId="empid">
                                <Form.Control onChange={this.handleChange} name="empid" type="text" placeholder="search EMPID" />
                            </Form.Group>
                            <Button onClick={this.searchId} variant="warning" type="button">
                                Add to Team  </Button>
                            <div style={mystyle.p10}>
                                {
                                    this.state.dynamicteammumbers.length > 0 &&
                                    <Table>
                                        <tbody>
                                            {this.state.dynamicteammumbers.map((object, index) => {
                                                return <tr key={index}>
                                                    <td>{object}</td>
                                                    <td>
                                                        <Button onClick={(index) => this.remove(index)} variant="danger" type="button">
                                                            Remove</Button>
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </Table>
                                }
                            </div>
                            <div style={mystyle.p10}>
                                <Button onClick={this.saveTeam} variant="primary" type="button">
                                    Save Team  </Button>
                            </div>
                        </Form>
                    </div>
                    <hr></hr>
                    <div style={mystyle.p10}>
                        <h5>Teams created by you</h5>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Team Name</th>
                                <th>Team Members</th>
                            </tr>
                        </thead>
                        {this.state.existingteams.map(function (object, index) {
                            return <tbody key={index}>
                                <tr>
                                    <td>{object.name}</td>
                                    <td>{object.members.join()}</td>
                                </tr>
                            </tbody>
                        })}
                    </Table>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}
const mapStateToProps = function (state) {
    return {
        empid: state.login.empid,
        empmail: state.login.empmail,
        roles: state.login.roles,
        session: state.login.session,
        teams: state.login.teams || []
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamFormationComponent))