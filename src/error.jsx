import  React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="text-center">
                        <h3>404 Page Not Found</h3>
                        <Link to="/addtask">Go to Add task page</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default NotFound;