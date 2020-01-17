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
import { validateEmployeeId, validateEmployeeEmailId, validatePassword, isEmpty } from '../../validations/fieldvalidations'
import CommonModal from '../commoncomponents/modal'
import { Modal } from 'react-bootstrap'

class ProjectsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            completelist: [],
            error: false,
            errormessage: null,
            data: null,
            show: false,
            title: null,
            comments: null,
            showcommentbox: false,
            projectid: null
        }
    }
    componentDidMount() {
        if (!this.props.session) {
            this.props.history.push("/home")
        }
        AXIOS.get("idea/all").then((response) => {
            if (response && response.data) {
                let { completelist } = this.state
                response.data.forEach((object, index) => {
                    completelist.push(object)
                })
                this.setState({ completelist })
            }
        }).catch((error) => {
            this.setState({ error: true, errormessage: "Error in loading data, try again later" })
        })
    }

    viewComments = (projectid, projectname) => {
        this.setState({ data: null, error: false, title: null, showcommentbox: false, comments: null })
        AXIOS.get("comment/all/by/idea/" + projectid).then((response) => {
            if (response && response.data) {
                let comments = response.data.map((object, index) => {
                    return <tr key={index}>
                        <td>{object.createdBy}</td>
                        <td>{object.comments}</td>
                    </tr>
                })
                const ele = <Table>
                    <thead>
                        <tr><td>Commented By</td><td>Comments</td></tr>
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

    saveComment = () => {
        if (isEmpty(this.state.comment)) {
            this.setState({ error: true, errormessage: "Please enter valid comments" })
            return;
        }
        AXIOS.post("comment", {
            ideaId: this.state.projectid,
            comment: this.state.comment,
            submittedBy: this.props.empid
        }).then((response) => {
            if (response && response.data && response.data.ideaId == this.state.projectid) {
                this.handleClose()
                this.setState({ error: true, errormessage: "Comment saved Successfully" })
            }
        }).catch((error) => {
            this.handleClose()
            this.setState({ error: true, errormessage: "Failed to save the comment" })
        })
    }

    handleClose = () => {
        this.setState({ data: null, show: false, showcommentbox: false, comments: null, title: null, projectid: null })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, error: false, errormessage: null })
    }
    openCommentsBox = (projectid, projectname) => {
        this.setState({ data: null, show: false, error: false, projectid: projectid, title: projectname, showcommentbox: true, comments: null })
    }

    render() {
        return (
            <div>
                <span><h4>Complete Projects List</h4></span>
                <AlertComponent showFlag={this.state.error} variant='danger' message={this.state.errormessage} />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Project Title</th>
                            <th>Project Type</th>
                            <th>Project Target</th>
                            <th>Project Description</th>
                            <th>Project Team</th>
                            <th>Panel Comments</th>
                        </tr>
                    </thead>
                    {this.state.completelist.map((object, index) => {
                        return <tbody key={index}>
                            <tr>
                                <td>{object.title}</td>
                                <td>{object.type}</td>
                                <td>{object.target}</td>
                                <td>{object.description}</td>
                                <td>{object.teamName}</td>
                                <td>
                                    <Button type="button" onClick={() => this.viewComments(object.id, object.title)} size="sm" variant="outline-info">View Comments</Button>&nbsp;
                                    <Button type="button" onClick={() => this.openCommentsBox(object.id, object.title)} size="sm" variant="outline-info">Add Comments</Button>
                                </td>
                            </tr>
                        </tbody>
                    })}
                </Table>
                <CommonModal data={this.state.data} show={this.state.show} title={this.state.title} onHide={this.handleClose} />

                <Modal show={this.state.showcommentbox} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add comments -{this.state.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <textarea className="form-control" name="comment" onChange={this.handleChange} rows="4" cols="50">
                            {this.state.comments}
                        </textarea>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.saveComment}>
                            Save Comment
                        </Button>
                    </Modal.Footer>
                </Modal>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectsList))