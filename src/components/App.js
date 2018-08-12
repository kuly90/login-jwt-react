/* @flow */

import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
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
        <br/><br/>
        <Router history={history}>
          <div>          
              <Route path="/menu" component={Header}/>
              <Route path="/menu/PageTable" component={CourseListContainer}/>
              <Route path="/menu/pageAdd" component={AddOrEditCourseContainer} />
              <Route path="/menu/pageEdit/:id" component={EditContainer} />
              <Route exact path="/login" component={Login}/>
              <Route exact path="/" component={Login}/>         
            <br/><br/><br/><br/><br/>
            <Footer/>
          </div>
        </Router>
      </div>
    );
  }
}
export default connect(null,{FetchDataList})(App);
