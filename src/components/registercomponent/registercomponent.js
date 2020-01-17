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
import { validateEmployeeId, validateEmployeeEmailId, validatePassword } from '../../validations/fieldvalidations'



class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            empid: null,
            password: null,
            empemail: null,
            error: false,
            errormessage: null,
        };
    }

    componentDidMount() {
        if (this.props.empid) {
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
            AXIOS.post('user/register', { id: this.state.empid, password: this.state.password, email: this.state.empemail }).
                then(response => {
                    console.log(response)
                    if (response && response.data && this.state.empid == response.data.id) {
                        this.props.login({ session: true, empid: response.data.id, empemail: response.data.email, roles: response.data.roles })
                        this.props.history.push("/project")
                    } else {
                        this.setGenericError();
                        return
                    }
                }).catch(error => {
                    this.setGenericError((error.data && error.data.message));
                    return
                })
        }
    }

    validateForm = () => {
        if (!validateEmployeeId(this.state.empid)) {
            this.setGenericError("Enter a valid empid 3 digits");
            return false;
        }
        if (!validateEmployeeEmailId(this.state.empemail)) {
            this.setGenericError("Enter a valid emp email ****@hdworks.in");
            return false;
        }
        if (!validatePassword(this.state.password)) {
            this.setGenericError("Enter a valid Password 4-9 chars");
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
                        <Card.Title>Registration</Card.Title>
                        <Card.Text>
                            <React.Fragment>
                                <Form>
                                    <Form.Group controlId="empid">
                                        <Form.Control name="empid" onChange={this.handleChange} type="text" placeholder="Enter Employee ID" />
                                    </Form.Group>
                                    <Form.Group controlId="empemail">
                                        <Form.Control onChange={this.handleChange} name="empemail" type="text" placeholder="Enter EmailId" />
                                    </Form.Group>
                                    <Form.Group controlId="passowrd">
                                        <Form.Control onChange={this.handleChange} name="password" type="password" placeholder="Enter Password" />
                                    </Form.Group>
                                    <Button onClick={this.handleSubmit} variant="primary" type="button">
                                        Register  </Button>
                                </Form>
                            </React.Fragment>
                        </Card.Text>
                        <Card.Link href="/login">Already have an account</Card.Link>
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
        empmail: state.login.empmail,
        roles: state.login.roles
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent))