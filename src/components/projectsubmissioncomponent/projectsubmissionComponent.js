import React from 'react'
import Form from 'react-bootstrap/Form'
import { Row, Col, Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import AlertComponent from '../commoncomponents/alert'
import { withRouter } from "react-router";
import { login, setTeams } from '../../reducers/authorisationreducer/actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import Table from 'react-bootstrap/Table'
import AXIOS from '../../configurations/axiosinterceptor'
import CommonModal from '../commoncomponents/modal'
import { validateEmployeeId, validateEmployeeEmailId, validatePassword, isEmpty } from '../../validations/fieldvalidations'

class ProjectSubmissionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState()
    }
    initialState = () => {
        return {
            projecttitle: null,
            projecttype: "Java",
            projecttarget: null,
            projectdescription: null,
            projectteam: null,
            existingteams: [],
            submittedprojects: [],
            error: false,
            errormessage: null
        }
    }
    componentDidMount() {
        if (!this.props.session) {
            this.props.history.push("/home")
        }
        this.getAllTeams()
        this.getAllSubmittedProjects()
    }
    getAllTeams = () => {
        AXIOS.get('team/all/by/' + this.props.empid).then((response) => {
            if (response && response.data) {
                console.log(response)
                let { existingteams } = this.state
                response.data.forEach((object, index) => {
                    existingteams.push(object)
                })
                this.setState({ existingteams, projectteam: existingteams[0].id })
            }
        }).catch(error => {
            console.log(error.response)
            // this.errorAck(error.response && error.response.data && error.response.data.error && error.response.data.error.message)
        })
    }
    getAllSubmittedProjects = () => {
        AXIOS.get('idea/by/' + this.props.empid).then((response) => {
            if (response && response.data) {
                console.log(response)
                let { submittedprojects } = this.state
                response.data.forEach((object) => {
                    submittedprojects.push(object)
                })
                this.setState({ submittedprojects })
            }
        }).catch(error => {
            console.log(error.response)
            // this.errorAck(error.response && error.response.data && error.response.data.error && error.response.data.error.message)
        })
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, error: false })
    }
    errorAck = (msg) => {
        this.setState({ error: true, errormessage: msg || "some thing went wrong" })
    }
    submitProject = () => {
        if (isEmpty(this.state.projecttitle)) {
            this.errorAck("Enter valid project title")
            return;
        }
        if (isEmpty(this.state.projecttype)) {
            this.errorAck("Enter valid project type")
            return;
        }
        if (isEmpty(this.state.projecttarget)) {
            this.errorAck("Enter valid project target")
            return;
        }
        if (isEmpty(this.state.projectdescription)) {
            this.errorAck("Enter valid project description")
            return;
        }
        if (isEmpty(this.state.projectteam)) {
            this.errorAck("Enter valid project team")
            return;
        }
        this.saveProjectToDatabase()
    }
    saveProjectToDatabase = () => {
        //TODO make a server call
        AXIOS.post('idea', {
            title: this.state.projecttitle,
            type: this.state.projecttype,
            description: this.state.projectdescription,
            teamId: this.state.projectteam,
            submittedBy: this.props.empid
        }).then((response) => {
            console.log(response)
            if (response && response.data && response.data.submittedBy == this.props.empid) {
                let { submittedprojects } = this.state
                submittedprojects.push(response.data)
                this.setState({
                    submittedprojects, projecttitle: null,
                    projecttype: "Java",
                    projecttarget: null,
                    projectdescription: null
                })
                this.errorAck("Project created Successfully")
            }
        }).catch(error => {
            this.errorAck(error.response && error.response.data && error.response.data.error && error.response.data.error.message)
        })
    }
    typeChange = (event) => {
        let { name } = event.target
        this.setState({ [name]: event.target.value });
    }
    render() {
        const mystyle = {
            card: { width: '40rem', textAlign: 'center', margin: 'auto', top: '4rem' },
            p10: { padding: '10px' },
            floatleft: { float: 'left' }
        };
        return (
            <div className="container">
                <div>
                    <div style={mystyle.card}>
                        <AlertComponent showFlag={this.state.error} variant='danger' message={this.state.errormessage} />
                        <Card.Title>Project Submission Details</Card.Title>
                        <React.Fragment>
                            <Form>
                                <Form.Group as={Col} controlId="projecttitle">
                                    <Form.Label style={mystyle.floatleft}>Project Title</Form.Label>
                                    <Form.Control value={this.state.projecttitle} onChange={this.handleChange} name="projecttitle" type="text" placeholder="Enter Project Title" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="projecttype">
                                    <Form.Label style={mystyle.floatleft}>Project Type</Form.Label>
                                    <select className="form-control" name="projecttype" id="projecttype" onChange={this.typeChange} value={this.state.projecttype}>
                                        <option value="select">Select</option>
                                        <option value="Java">Java</option>
                                        <option value="C++">C++</option>
                                        <option value="OTHERS">OTHERS</option>
                                    </select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="projecttarget">
                                    <Form.Label style={mystyle.floatleft}>Project Target</Form.Label>
                                    <Form.Control value={this.state.projecttarget} onChange={this.handleChange} name="projecttarget" type="text" placeholder="Enter Project Targetdate" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="project description">
                                    <Form.Label style={mystyle.floatleft}>project Description</Form.Label>
                                    <Form.Control value={this.state.projectdescription}  onChange={this.handleChange} name="projectdescription" as="textarea" placeholder="Description" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="projectteam">
                                    <Form.Label style={mystyle.floatleft}>Select Your Team</Form.Label>
                                    <select className="form-control" name="projectteam" id="projectteam" onChange={this.typeChange} value={this.state.projectteam}>
                                        {this.state.existingteams.map((object, index) => {
                                            return <option key={index} value={object.id}>{object.name}</option>
                                        })}
                                    </select>
                                </Form.Group>
                                <Button variant="primary" onClick={this.submitProject} type="button">Submit Project </Button>
                                <Card.Link style={{ float: 'right' }} href="/team">Create a new team</Card.Link>
                            </Form>
                        </React.Fragment>
                    </div>
                </div>
                <hr></hr>
                <div style={mystyle.p10}>
                    <h5>Projects Submitted by you</h5>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Project Title</th>
                            <th>Submitted By</th>
                            <th>Project Type</th>
                            <th>Project Target</th>
                            <th>Project Description</th>
                            <th>Project Team</th>
                            <th>Panel Comments</th>
                        </tr>
                    </thead>
                    {this.state.submittedprojects.map(function (object, index) {
                        return <tbody key={index}>
                            <tr>
                                <td>{object.title}</td>
                                <td>HDW-{object.submittedBy}</td>
                                <td>{object.type}</td>
                                <td>{object.target}</td>
                                <td>{object.description}</td>
                                <td>{object.teamName}</td>
                                <td>NA</td>
                            </tr>
                        </tbody>
                    })}
                </Table>
            </div>
        )

    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setTeams }, dispatch)
}
const mapStateToProps = function (state) {
    return {
        empid: state.login.empid,
        empmail: state.login.empmail,
        roles: state.login.roles,
        session: state.login.session
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectSubmissionComponent))