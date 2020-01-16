import React from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertComponent from '../commoncomponents/alert'
import { login } from '../../reducers/authorisationreducer/actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withRouter } from "react-router";

class TeamFormationComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teamName: '',
            search: '',
            servererror: false,
            servererrormessage: "",
            errors: {
                teamName: null,
                search: null,
            }
        };
    }
    componentDidMount() {
        if (!this.props.empid) {
            this.props.history.push("/home")
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        this.setState({ errors, [name]: value })
    }

    searchId = () => {
        if (this.state.empId) {

        }

    }

    render() {
        return (
            <div>
                <div>
                    <span>Include Team Members</span>
                </div>
                <Form>
                    <Form.Group controlId="teamName">
                        <Form.Control name="teamName" onChange={this.handleChange} type="text" maxLength="20" placeholder="Enter your Team name" />
                        <AlertComponent showFlag={this.state.errors.teamName ? true : false} variant='danger' message={this.state.errors.teamName} />
                    </Form.Group>
                    <Form.Group controlId="empId">
                        <Form.Control onChange={this.handleChange} name="empId" type="text" placeholder="search EMPID" />
                        <AlertComponent showFlag={this.state.errors.empId ? true : false} variant='danger' message={this.state.errors.empId} />
                    </Form.Group>
                    <Button onClick={this.searchId} variant="primary" type="button">
                        Search  </Button>
                </Form>
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
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamFormationComponent))