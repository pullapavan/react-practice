import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';
import API from '../../configurations/axiosinterceptor'

class CommonTableStructure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dummymetadata: props.metadata,
            data: {
                columns: [],
                rows: []
            },
            title: props.title
        };
    }
    componentDidMount() {
        API.get("posts").then(response => {
            console.log(response.data)
            this.setState(
                {
                    data:
                    {
                        rows: response.data,
                        columns: this.props.metadata
                    }
                }
            )
        }).catch(errorobject => {
            console.log(errorobject.data)
        })
    }

    render() {
        return (
            <React.Fragment>
                {/* <MDBDataTable
                    striped
                    bordered
                    small
                    data={this.state.data}
                    responsive
                /> */}
                <MDBTable responsive>
                    <MDBTableHead columns={this.state.data.columns} />
                    <MDBTableBody rows={this.state.data.rows} />
                </MDBTable>
            </React.Fragment>
        )
    }
}
export default CommonTableStructure