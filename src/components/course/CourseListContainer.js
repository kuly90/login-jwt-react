import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import CourseList from './CourseList';
import { deleteitem, EditItemData } from '../../action';
import { loadGo } from '../../reducer/EditReducer';
import withAuth from '../service/withAuth';
import AuthService from '../service/AuthService';
import _ from 'lodash';

const Auth = new AuthService();


class CourseListContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: undefined,
      row: {},
      count: 0,
      SelectItem: [],
    }
    this.goToPageAdd = this.goToPageAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.handleEditCourse = this.handleEditCourse.bind(this);
  }

  //Add
  goToPageAdd(){
    this.props.history.push('/pageAdd');
  }

  handleDelete() {
    const SelectItem = this.state.SelectItem;
    if (SelectItem) {
      this.setState({
        SelectItem: [],
        id: null
      })
      this.props.deleteitem(this.state.SelectItem)
    }
	}

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({
        id: row.id,
        row: row,
        count: this.state.count + 1,
        SelectItem: this.state.SelectItem.concat(row.id)
      }, function() {
        console.log('count :', this.state.count, 'SelectItem :', this.state.SelectItem);
      })
    } else {
      var index = _.findIndex(this.state.SelectItem, function (o) {
        return o === row.id
      });
      this.setState({
        count: this.state.count - 1,
        SelectItem: this.state.SelectItem.splice(index, 1) && this.state.SelectItem
      }, function () {
        console.log('count 2:', this.state.count, 'SelectItem 2:', this.state.SelectItem);
        if (this.state.count === 0) {
          this.setState({
            SelectItem: []
          })
        }
      })
    }
	}

  handleEditCourse() {
    const id = this.state.id;
		if (id) {
			this.setState({ id: undefined });
			this.props.history.push(`/pageEdit/${id}`, {row: this.state.row});
      this.props.loadGo(this.state.item)
      console.log(this.props.loadGo(this.state.row));
		}
  }
  
  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
  }

  render() {
    const { ListData } = this.props;
    console.log(this.props);
    
    if (!ListData) {
			return (
				<div>Loading...</div>
			);
		}

    return (
      <div className="container-fluid">
      
				<div className="row mt-3">
					<div className="col">
						<h1>ListData</h1>
            <h4>Hello {this.props.user.username}</h4>
					</div>
				</div>

				<div className="row mt-3">
					<div className="col">
						<div className="btn-group" role="group">
							<button type="button" className="btn btn-primary" onClick={this.goToPageAdd}>
								<i className="fa fa-plus" aria-hidden="true" /> New
              </button>

							<button type="button" className="btn btn-warning ml-2" onClick={this.handleEditCourse}>
								<i className="fa fa-pencil" aria-hidden="true" /> Edit
              </button>

							<button type="button" className="btn btn-danger ml-2" onClick={()=>this.handleDelete(this.state.id)}>
								<i className="fa fa-trash-o" aria-hidden="true"/> Delete
              </button>
              <button type="button" className="btn btn-success ml-2" onClick={this.handleLogout.bind(this)}>
								<i className="fa fa-sign-out" aria-hidden="true"/> Logout
              </button>
						</div>
					</div>
				</div>

        <div className="row">
					<div className="col">
						<CourseList ListData={ListData} handleRowSelect={this.handleRowSelect} />
					</div>
				</div>
			</div>
    );
  }
}
const afterSubmit = (result, dispatch) => {
  return (
    dispatch(reset('EditAsset'))
  )
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
CourseListContainer = reduxForm({
  form: 'initializeFromState',
  onSubmitSuccess: afterSubmit,
})(CourseListContainer)

// You have to connect() to any reducers that you wish to connect to yourself
CourseListContainer = connect(
  state => ({
    ListData: state.DatacoursesReducer.data, // pull initial values from account reducer
    initialValues:  state.DatacoursesReducer.data
  }),
  { deleteitem, EditItemData, loadGo }               // bind account loading action creator
)(CourseListContainer)

export default withAuth(CourseListContainer);
