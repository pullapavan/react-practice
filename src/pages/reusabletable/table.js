import React from 'react'
import API from '../../configurations/axiosinterceptor'
import DataTable from 'react-data-table-component'
import ArrowDownward from '@material-ui/icons/ArrowDownward';


class CommonTableStructure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dummymetadata: props.metadata,
            data: [],
            title: props.title
        };
    }
    componentDidMount() {
        API.get("users").then(response => {
            console.log(response.data)
            this.setState({ data: response.data })
        }).catch(errorobject => {
            console.log(errorobject.data)
        })
    }

    render() {
        const sortIcon = <ArrowDownward />
        return (
            <React.Fragment>
                <DataTable
                    title={this.state.title}
                    columns={this.state.dummymetadata}
                    data={this.state.data}
                    sortIcon={sortIcon}
                    striped responsive pagination paginationPerPage={5}
                />
            </React.Fragment>
        )
    }
}
export default CommonTableStructure