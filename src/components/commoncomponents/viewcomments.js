import React from 'react'
import AXIOS from '../../configurations/axiosinterceptor'
import Table from 'react-bootstrap/Table'
import CommonModal from '../commoncomponents/modal'

class ViewComments extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: null, error: false, errormessage: null, show: true }
    }

    viewComments = (projectid, projectname) => {
        this.setState({ data: null, error: false, title: null })
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
    render() {
        return (
            <>
                <Button type="button"
                    onClick={() => this.viewComments(this.props.projectid, this.props.projecttitle)}
                    size="sm"
                    variant="outline-info">View Comments</Button>

                <CommonModal data={this.state.data} show={this.state.show} title={this.state.title} onHide={this.handleClose} />
            </>
        )
    }
}
export default ViewComments