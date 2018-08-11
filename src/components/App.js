/* @flow */

import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
//component
import Login from './common/Login';
import CourseListContainer from './course/CourseListContainer';
import AddOrEditCourseContainer from './course/AddOrEditCourseContainer';
import EditContainer from './course/EditContainer';
import { FetchDataList } from '../action';
import Header from './landing/Header';
import Footer from './landing/Footer';

const history = createBrowserHistory();

class App extends Component {
  componentDidMount() {
    this.props.FetchDataList()
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Header/>
            <Switch>
              <Route path="/PageTable" component={CourseListContainer}/>
              <Route exact path="/pageAdd" component={AddOrEditCourseContainer} />
              <Route path="/pageEdit/:id" component={EditContainer} />
              <Route path="/login" component={Login}/>
              <Route path="/" component={Login}/>
            </Switch>
            <br/><br/><br/>
            <Footer/>
          </div>
        </Router>
      </div>
    );
  }
}
export default connect(null,{FetchDataList})(App);
