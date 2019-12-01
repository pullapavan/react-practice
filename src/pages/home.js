import React from 'react'
import { connect } from 'react-redux'
import { refresh } from '../reducers/authorisationreducer/actions'
import { Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux';
function Home(props) {
    return (
        <div>
            {props.name} Home Component <Button type="button" className="primary">primary</Button>
        </div>
    )
}

const mapStateToProps = function (state) {
    return {
        name: state.auth.name,
        roles: state.auth.roles,
        privileges: state.auth.privileges
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({refresh}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)