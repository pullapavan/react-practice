import React from 'react'
import Form from 'react-bootstrap/Form'
import { Row, Col, Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import AlertComponent from '../commoncomponents/alert'
import { withRouter } from "react-router";
import { login } from '../../reducers/authorisationreducer/actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

class ProjectSubmissionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projecttitle: null,
            projecttype: null,
            projecttarget: null,
            projectdescription: null
        }
    }
    componentDidMount() {        
        this.getAllTeams()
    }
    getAllTeams = () => {

    }
    typeChange = (event) => {
        this.setState({ projecttypeF: event.target.value });
    }
    render() {
        const mystyle = {
            card: { width: '40rem', textAlign: 'center', margin: 'auto', top: '4rem' },
            p10: { padding: '10px' },
            floatleft: { float: 'left' }
        };
        return (
            <div>
                <Card style={mystyle.card}>
                    <Card.Body>
                        <AlertComponent showFlag={this.state.error} variant='danger' message={this.state.errormessage} />
                        <Card.Title>Idea Submission Details</Card.Title>
                        <Card.Text>
                            <React.Fragment>
                                <Form>
                                    <Form.Group as={Col} controlId="projecttitle">
                                        <Form.Label style={mystyle.floatleft}>Project Title</Form.Label>
                                        <Form.Control name="projecttitle" type="text" placeholder="Enter Project Title" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="projecttype">
                                        <Form.Label style={mystyle.floatleft}>Project Type</Form.Label>
                                        <select className="form-control" id="projecttype" onChange={this.typeChange} value={this.state.projecttype}>
                                            <option value="select">Select</option>
                                            <option value="Java">Java</option>
                                            <option value="C++">C++</option>
                                            <option value="OTHERS">OTHERS</option>
                                        </select>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="projecttarget">
                                        <Form.Label style={mystyle.floatleft}>Project Target</Form.Label>
                                        <Form.Control name="projecttarget" type="text" placeholder="Enter Project Targetdate" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="project description">
                                        <Form.Label style={mystyle.floatleft}>project Description</Form.Label>
                                        <Form.Control name="projectdescription" as="textarea" F placeholder="Description" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="projectteam">
                                        <Form.Label style={mystyle.floatleft}>Select Your Team</Form.Label>
                                        <select className="form-control" id="projectteam" onChange={this.teamChange} value={this.state.projectteam}>
                                            <option value="select">TEAMA</option>
                                            <option value="Java">TEAMB</option>
                                            <option value="C++">TEAMC</option>
                                        </select>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Submit Project </Button>
                                </Form>
                            </React.Fragment>
                        </Card.Text>
                    </Card.Body>
                    <Card.Link href="/team">Create team</Card.Link>
                </Card>
            </div>
        )

    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ login }, dispatch)
}
const mapStateToProps = function (state) {
    return {
        empid: state.login.empid,
        empmail: state.login.empmail,
        roles: state.login.roles
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectSubmissionComponent))