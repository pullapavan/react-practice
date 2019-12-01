import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom'
import AdminPrivateRoute from '../src/components/adminprivateroute'
import AdminPrivateLink from '../src/components/adminprivatelink'
import Home from '../src/pages/home'
import { connect } from 'react-redux'
import { refresh } from '../src/reducers/authorisationreducer/actions'
import { bindActionCreators } from 'redux';
import CommonTableStructure from './pages/reusabletable/table'
import MDCommonTableStructure from './pages/reusabletable/mdbtable'
import { dummymetadata } from './pages/reusabletable/tablemetadata'
import { mdtabledummymetadata } from './pages/reusabletable/tablemetadata'
import { Container } from '@material-ui/core'
import '../src/assests/css/main.css';
import IdleTimer from 'react-idle-timer'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
  }
  render() {

    return (
      <Container maxWidth="xl">
        <IdleTimer
          element={document}
          timeout={100000} 
          onIdle={this.props.refresh}
          />
        <div className="row">
          <div className="col-xs-6">
            <ul>
              <AdminPrivateLink to='/home' role={['HOME']} privilege={['home_tab']} displayname={'Home'}></AdminPrivateLink>
              <AdminPrivateLink to='/cart' role={['CART']} privilege={['cart_tab']} displayname={'Cart'}></AdminPrivateLink>
              <AdminPrivateLink to='/noauth' displayname={'NO AUTH'}></AdminPrivateLink>
              <li>
                <Link to='/home'>forbidden</Link>
              </li>
              <li>
                <Link to='/' onClick={this.props.refresh}>Refresh State</Link>
              </li>
              <li>
                <Link to='/table'>Json placeholder</Link>
              </li>
              <li>
                <Link to='/mdtable'>mdtable Json placeholder</Link>
              </li>
            </ul>
          </div>
          <div className="col-xs-6">
            <div className="center">
              <Switch>
                <AdminPrivateRoute path='/home' component={Home} role={['HOME']} privilege={['home_tab']}></AdminPrivateRoute>
                <AdminPrivateRoute path='/cart' component={Home} role={['CART']} privilege={['cart_tab']}></AdminPrivateRoute>
                <Route path='/forbidden' render={() => <div>Forbidden from Accessing</div>}></Route>
                <Route path='/noauth' render={() => <div>NoAuth Required</div>}></Route>
                <Route
                  path='/table'
                  render={() => <CommonTableStructure title="DUMMY TABLE" metadata={dummymetadata} />}>
                </Route>
                <Route
                  path='/mdtable'
                  render={() => <MDCommonTableStructure title="DUMMY TABLE" metadata={mdtabledummymetadata} />}>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ refresh }, dispatch)
}
export default connect(null, mapDispatchToProps)(App)
