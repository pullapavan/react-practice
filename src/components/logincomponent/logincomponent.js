import React from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertComponent from '../commoncomponents/alert'
import { login } from '../../reducers/authorisationreducer/actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import AXIOS from '../../configurations/axiosinterceptor'
import { validateEmployeeId, validateEmployeeEmailId, validatePassword, isEmpty } from '../../validations/fieldvalidations'



class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            empid: null,
            password: null,
            error: false,
            errormessage: null,
        };
    }

    componentDidMount() {
        if (this.props.session) {
            this.props.history.push("/home")
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, error: false, errormessage: null })
    }

    setGenericError = (msg) => {
        this.setState({
            error: true, errormessage: msg || "please try after some time"
        })
    }

    handleSubmit = (event) => {
        if (this.validateForm()) {
            AXIOS.post('user/login', { id: this.state.empid, password: this.state.password }).
                then(response => {
                    console.log(response)
                    if (response && response.data) {
                        this.props.login({ session: true, empid: response.data.id, empemail: response.data.email, roles: response.data.roles })
                        this.props.history.push("/team")
                    } else {
                        this.setGenericError();
                        return
                    }
                }).catch(error => {
                    console.log(error.response)
                    this.setGenericError((error.response && error.response.data && error.response.data.error.message));
                    return
                })            
        }
    }

    validateForm = () => {
        if (!validateEmployeeId(this.state.empid)) {
            this.setGenericError("Enter a valid empid");
            return false;
        }
        if (!validatePassword(this.state.password)) {
            this.setGenericError("Enter a valid Password");
            return false;
        }
        return true;
    }

    render() {
        const mystyle = {
            card: { width: '40rem', textAlign: 'center', margin: 'auto', top: '7rem' },
            p10: { padding: '10px' }
        };
        return (
            <div>
                <Card style={mystyle.card}>
                    <Card.Body>
                        <AlertComponent showFlag={this.state.error} variant='danger' message={this.state.errormessage} />
                        <Card.Title>Login</Card.Title>
                        <Card.Text>
                            <React.Fragment>
                                <Form>
                                    <Form.Group controlId="empid">
                                        <Form.Control name="empid" onChange={this.handleChange} type="text" placeholder="Enter Employee ID" />
                                    </Form.Group>
                                    <Form.Group controlId="passowrd">
                                        <Form.Control onChange={this.handleChange} name="password" type="password" placeholder="Enter Password(min 4,max 9)" />
                                    </Form.Group>
                                    <Button onClick={this.handleSubmit} variant="primary" type="button">
                                        Login  </Button>
                                </Form>
                            </React.Fragment>
                        </Card.Text>
                        <Card.Link href="/register">Create New Account?</Card.Link>
                    </Card.Body>
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
        session: state.login.session
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent))