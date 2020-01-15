import React from 'react'
import Alert from 'react-bootstrap/Alert'

function AlertComponent(props) {
    const { showFlag, variant, message } = props;
    if (showFlag) {
        return <Alert variant={variant}>
            {message}
        </Alert>
    }
    return null;
}

export default AlertComponent