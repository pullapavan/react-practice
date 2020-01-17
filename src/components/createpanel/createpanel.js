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
import Modal from 'react-bootstrap/Modal'
import { validateEmployeeId, validateEmployeeEmailId, validatePassword, isEmpty } from '../../validations/fieldvalidations'

class PanelCreationComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            empid: null,
            panelmembers: [],
            error: false,
            errormessage: null,
            show: false
        }
    }
    componentDidMount() {
        if (!this.props.session) {
            this.props.history.push("/home")
        }
        AXIOS.get("user/all/by/PANEL").then((response) => {
            if (response && response.data) {
                let { panelmembers } = this.state
                response.data.forEach((object, index) => {
                    panelmembers.push(object)
                })
                this.setState({ panelmembers })
            }
        }).catch((error) => {
            this.errorAck("Error in loading data, try again later")
        })
    }
    errorAck = (msg) => {
        this.setState({ error: true, errormessage: msg || "please try later" })
    }
    alreadyExist = () => {
        this.state.panelmembers.forEach((obj) => {
            if (obj && obj.id == this.state.empid) {
                return true;
            }
        })
        return false;
    }
    addToPanel = () => {
        if (!validateEmployeeId(this.state.empid)) {
            this.setState({ error: true, errormessage: "Enter a valid Registered EMP ID" })
            return;
        }
        if (this.alreadyExist(this.state.empid)) {
            this.setState({ error: true, errormessage: this.state.empid + " is already a panel member" })
            return;
        }
        AXIOS.put("user/roles", { id: this.state.empid, roles: ['PANEL'] }).then((response) => {
            if (response && response.data && response.data.id == this.state.empid) {
                let { panelmembers } = this.state
                panelmembers = [...panelmembers, response.data]
                this.setState({ panelmembers, error: true, errormessage: this.state.empid + "Added Successfully" })
            }
        }).catch((error) => {
            this.errorAck(error.response && error.response.data && error.response.data.error && error.response.data.error.message)
        })
    }
    openModal = () => {
        this.setState({ show: true })
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, error: false, errormessage: null })
    }
    handleClose = () => {
        this.setState({ show: false })
    }
    render() {
        const mystyle = {
            card: { width: '15rem', textAlign: 'center', margin: 'auto', top: '2rem' },
            p10: { padding: '10px' }
        };
        return (
            <div className="container">
                <span><h4>Existing Panel Members</h4></span>
                <div style={mystyle.p10}>
                    <Button variant="primary" onClick={this.openModal} type="button">Add new Member</Button>
                </div>
                <AlertComponent showFlag={this.state.error} variant='danger' message={this.state.errormessage} />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>EMP ID</th>
                            <th>EMP EMAIL</th>
                        </tr>
                    </thead>
                    {this.state.panelmembers.map((object, index) => {
                        return <tbody key={index}>
                            <tr>
                                <td>{object.id}</td>
                                <td>{object.email}</td>
                            </tr>
                        </tbody>
                    })}
                </Table>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Employee to Panel</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AlertComponent showFlag={this.state.error} variant='danger' message={this.state.errormessage} />
                        <input type="text" className="form-control" placeholder="Enter EmpId" name="empid" onChange={this.handleChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.addToPanel}>
                            Save Changes
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PanelCreationComponent))