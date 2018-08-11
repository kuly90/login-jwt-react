/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
//component Tabble
import CourseForm from './CourseForm';
import { InsertItems } from '../../action';
import { loadGo } from '../../reducer/EditReducer';
import withAuth from '../service/withAuth';


class AddOrEditCourseContainer extends Component {
  constructor() {
		super();
    this.handleSave = this.handleSave.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}
  handleCancel(event) {
		event.preventDefault();
		this.props.history.replace('/PageTable');
	}

  generateKey = (numberOfCharacters) => {
    return require('random-string')({ length: numberOfCharacters });
  }

  handleSave(values){
    const newKey = this.generateKey(2);
    const newAdd = {
      id: newKey,
      title: values.title,
			authorId: values.authorId,
			length: values.length,
			category: values.category
    }
    this.props.InsertItems(newAdd)
    this.props.history.push('/PageTable');
  }

  render() {
    return (
      <div className="container">
      <h1>ADD FORM</h1>
				<CourseForm
          handleCancel={this.handleCancel}
          handleSave={this.handleSave}
				/>
			</div>
    );
  }
}
export default withAuth(connect(null,{InsertItems, loadGo})(AddOrEditCourseContainer));
