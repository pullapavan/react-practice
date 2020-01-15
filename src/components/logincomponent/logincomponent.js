import React from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertComponent from '../commoncomponents/alert'
import { login } from '../../reducers/authorisationreducer/actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withRouter } from "react-router";



class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            empId: '',
            password: '',
            errors: {
                empId: null,
                password: null,
            }
        };
    }

    componentDidMount() {
        if (this.props.empid) {
            this.props.history.push("/project")
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'empId':
                if (!value || value.length > 3) {
                    errors.empId = "please enter valid Employee ID(max 3 digits)"
                } else {
                    errors.empId = null;
                }
                break;
            case 'password':
                if (!value || value.length > 8 || value.length < 4) {
                    errors.password = "please enter valid password(min 4 and max 8 chars)"
                } else {
                    errors.password = null;
                }
                break;
            default: break;
        }
        console.log(errors)
        this.setState({ errors, [name]: value })
    }

    handleSubmit = (event) => {
        if (this.validateForm(this.state.errors)) {
            this.props.login({
                empid: '422'
            })
            this.props.history.push("/project")
        } else {
            alert('Invalid Form')
        }
    }

    validateForm = (errors) => {
        console.log(this.state)
        if (this.state.empId.length === 0 || this.state.password.length === 0) {
            return false;
        }
        if (!this.state.errors.empId && !this.state.errors.password) {
            return true;
        }
        return false;
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
                        <Card.Title>Login</Card.Title>
                        <Card.Text>
                            <React.Fragment>
                                <Form>
                                    <Form.Group controlId="empId">
                                        <Form.Control name="empId" onChange={this.handleChange} type="text" placeholder="Enter Employee ID" />
                                        <AlertComponent showFlag={this.state.errors.empId ? true : false} variant='danger' message={this.state.errors.empId} />
                                    </Form.Group>
                                    <Form.Group controlId="passowrd">
                                        <Form.Control onChange={this.handleChange} name="password" type="password" placeholder="Password" />
                                        <AlertComponent showFlag={this.state.errors.password ? true : false} variant='danger' message={this.state.errors.password} />
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
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent))