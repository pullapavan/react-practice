import React from 'react'
import Form from 'react-bootstrap/Form'
import { Col, Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import AlertComponent from '../commoncomponents/alert'
import { withRouter } from "react-router";
import { setTeams } from '../../reducers/authorisationreducer/actions'
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
            projecttype: "Improvement in our business or process",
            projecttarget: null,
            projectdescription: null,
            projectteam: null,
            existingteams: [],
            submittedprojects: [],
            error: false,
            errormessage: null,
            files: [],
            formdata: null
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
            console.log(response)
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

    viewComments = (projectid, projectname) => {
        this.setState({ data: null, error: false, title: null, showcommentbox: false, comments: null })
        AXIOS.get("comment/all/by/idea/" + projectid).then((response) => {
            if (response && response.data) {
                let comments = response.data.map((object, index) => {
                    return <tr key={index}>
                        <td>EMP ID-{object.submittedBy}</td>
                        <td><pre>{object.comment}</pre></td>
                        <td>{object.submittedOn}</td>
                    </tr>
                })
                const ele = <Table responsive>
                    <thead>
                        <tr><td>Commented By</td><td>Comments</td><td>Date</td></tr>
                    </thead>
                    <tbody>
                        {comments}
                    </tbody>
                </Table>
                this.setState({ data: ele, show: true, title: "project -" + projectname })
            }
        }).catch((error) => {
            this.setState({ error: true, errormessage: "Error in loading data, try again later" })
        })

    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, error: false })
    }
    handleFileChange = (event) => {
        this.setState({ formdata: null })
        const formData = new FormData();
        for (let i = 0; i < event.target.files.length; i++) {
            formData.append('attachments', event.target.files[i])
        }
        this.setState({ formdata: formData })
    }
    handleClose = () => {
        this.setState({ data: null, show: false, title: null, projectid: null })
    }
    errorAck = (msg) => {
        this.setState({ error: true, errormessage: msg || "some thing went wrong" })
    }
    submitProject = () => {
        this.setState({ error: false })
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
        var bodyFormData = this.state.formdata || new FormData();
        bodyFormData.set('title', this.state.projecttitle);
        bodyFormData.set('type', this.state.projecttype);
        bodyFormData.set('description', this.state.projectdescription);
        bodyFormData.set('teamId', this.state.projectteam);
        bodyFormData.set('submittedBy', this.props.empid);
        bodyFormData.set('target', this.state.projecttarget);

        AXIOS({
            method: 'post',
            url: 'idea',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then((response) => {
            console.log(response)
            if (response && response.data && response.data.submittedBy == this.props.empid) {
                this.getAllSubmittedProjects()
                this.setState({                   
                    projecttitle: null,
                    projecttype: "Improvement in our business or process",
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
    downloadAttachMent = (ideaid, attachmentid, name) => {
        AXIOS.get('idea/' + ideaid + '/attachments/' + attachmentid).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
        })


    }
    render() {
        const mystyle = {
            card: { width: '40rem', textAlign: 'center', margin: 'auto', top: '4rem' },
            p10: { padding: '10px' },
            floatleft: { float: 'left' }
        };
        return (
            <div className="container">
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
                            <th>Attachments</th>
                            <th>Panel Comments</th>
                        </tr>
                    </thead>
                    {this.state.submittedprojects.map((object, index) => {
                        return <tbody key={index}>
                            <tr>
                                <td>{object.title}</td>
                                <td>HDW-{object.submittedBy}</td>
                                <td>{object.type}</td>
                                <td>{object.target}</td>
                                <td><pre>{object.description}</pre></td>
                                <td>{object.teamName}</td>
                                <td>
                                    {
                                        this.state.submittedprojects[index].uploadedAttachments &&
                                        this.state.submittedprojects[index].uploadedAttachments.map((attachment, index) => {
                                            return <div onClick={() => this.downloadAttachMent(object.id, attachment.id, attachment.name)}><a href="#">{attachment.name}</a></div>
                                        })
                                    }
                                </td>
                                <td>
                                    <Button type="button" onClick={() => this.viewComments(object.id, object.title)} size="sm" variant="outline-info">View Comments</Button>&nbsp;
                                </td>
                            </tr>
                        </tbody>
                    })}
                </Table>
                <div>
                    <div style={mystyle.card}>
                        <AlertComponent showFlag={this.state.error} variant='danger' message={this.state.errormessage} />
                        <Card.Title>New Project Submission Details</Card.Title>
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
                                        <option value="Improvement in our business or process">Improvement in our business or process</option>
                                        <option value="Company growth">Company growth</option>
                                        <option value="Product enhancement">Product enhancement</option>
                                        <option value="Customer satisfaction">Customer satisfaction</option>
                                        <option value="Branding">Branding</option>
                                        <option value="Security">Security</option>
                                        <option value="Cost effectiveness">Cost effectiveness</option>
                                        <option value="New products">New products</option>
                                        <option value="OTHERS">OTHERS</option>
                                    </select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="projecttarget">
                                    <Form.Label style={mystyle.floatleft}>Project Target</Form.Label>
                                    <Form.Control value={this.state.projecttarget} onChange={this.handleChange} name="projecttarget" type="text" placeholder="Enter Project Targetdate" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="project description">
                                    <Form.Label style={mystyle.floatleft}>project Description</Form.Label>
                                    <Form.Control value={this.state.projectdescription} onChange={this.handleChange} name="projectdescription" as="textarea" placeholder="Description" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="projectteam">
                                    <Form.Label style={mystyle.floatleft}>Select Your Team</Form.Label>
                                    <select className="form-control" name="projectteam" id="projectteam" onChange={this.typeChange} value={this.state.projectteam}>
                                        {this.state.existingteams.map((object, index) => {
                                            return <option key={index} value={object.id}>{object.name}</option>
                                        })}
                                    </select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="projectfile">
                                    <Form.Label style={mystyle.floatleft}>Upload Files</Form.Label>
                                    <input className="form-control" id="projectfile" type="file" onChange={this.handleFileChange} multiple />
                                </Form.Group>
                                <Button variant="primary" onClick={this.submitProject} type="button">Submit Project </Button>
                                <Card.Link style={{ float: 'right' }} href="/team">Create a new team</Card.Link>
                            </Form>
                        </React.Fragment>
                    </div>
                </div>
                <hr></hr>
                <CommonModal data={this.state.data} show={this.state.show} title={this.state.title} onHide={this.handleClose} />
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