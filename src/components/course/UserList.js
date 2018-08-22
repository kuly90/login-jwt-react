import React from 'react';
import withAuth from '../service/withAuth';

class UserList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			userEdit: [],
			deleteUser: {
				username: '',
				password: ''
			},
			username: '',
			password: '',
			users: [],
			keySearch: ''
		}
	}
	componentDidMount() {
		this.getUsers();
	}

	// get list user from database
	getUsers = _ => {
		fetch('http://localhost:8080/users')
			.then(response => response.json())
			.then(response => this.setState({ users: response.data }))
			.catch(err => console.error(err))
	}

	// Add user into database
	addUser = _ => {
		const { username, password } = this.state;
		if (username === '' || password === '') {
			alert('please inser username and password !')
		} else {
			fetch(`http://localhost:8080/users/add?username=${username}&password=${password}`)
				.then(this.getUsers)
				.catch(err => console.error(err))
		}

	}

	//delete user from database
	deleteUser(deleteUser) {
		const id = deleteUser.id;
		fetch(`http://localhost:8080/users/deleteUser?id=${id}`)
			.then(this.getUsers)
			.catch(err => console.error(err)
			)
	}

	//call Modal Edit user
	replaceModalItem(item) {
		console.log(item);
		this.setState({
			userEdit: item
		})
	}

	// save user after edit
	saveUser() {
		const { userEdit } = this.state;
		console.log(userEdit);
		if (userEdit.username === '' || userEdit.password === '') {
			alert('username and password are required !');
		} else {
			fetch(`http://localhost:8080/users/editUser?username=${userEdit.username}&password=${userEdit.password}&id=${userEdit.id}`)
				.then(this.getUsers)
				.catch(err => console.error(err))
		}
	}

	//call Modal Edit user
	confirmDelete(item) {
		this.setState({
			deleteUser: item
		})
	}

	//Search User
	handlerSearch = _ =>{
		const { keySearch } = this.state;
		fetch(`http://localhost:8080/users/searchUser?id=${keySearch}&username=${keySearch}`)
		.then(response => response.json())
		.then(response => this.setState({ users: response.data }))
		.catch(err => console.error(err))
		
	}

	render() {
		const { users, userEdit, deleteUser } = this.state;
		return (
			<div className="App">
				<br />
				{/* Form search user */}
				<div className="form-inline">
					<div>
						<input type="text" placeholder="input id or username"  className="form-control" style={{width:'300px'}}
							onChange={(e)=> this.setState({keySearch: e.target.value})}
						/>&nbsp;
						<button className="btn btn-primary" onClick={this.handlerSearch}>
						<i class="fa fa-search"></i>
						</button>
					</div>
					<button className="btn btn-primary" data-toggle="modal" data-target="#myModalAdd" style={{marginLeft:'430px'}}>
						<i className="fa fa-plus" aria-hidden="true" /> New
					</button>
				</div>
				<br />
				
				{/* Table User List*/}
				<div >
					<table className="table table-active table-hover">
						<thead>
							<tr>
								<th>user Id</th>
								<th>user name</th>
								<th>password</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{
								users.map((item, index) =>
									<tr key={index}>
										<td>{item.id}</td>
										<td>{item.username}</td>
										<td>{item.password}</td>
										<td>
											<button className="btn btn-primary" data-toggle="modal" data-target="#myModal"
												onClick={() => this.replaceModalItem(item)}>
												<span className="fa fa-pencil fa-fw"></span>
											</button> &nbsp;
											<button className="btn btn-danger" data-toggle="modal" data-target="#myModalDelete" onClick={() => this.confirmDelete(item)}>
												<span className="fa fa-trash-o fa-fw"></span>
											</button>
										</td>
									</tr>
								)
							}
						</tbody>
					</table>
				</div>
				{/* Modal Add User */}
				<div className="modal fade" id="myModalAdd">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title">Add New User</h4>
								<button type="button" className="close" data-dismiss="modal">&times;</button>
							</div>
							<div className="modal-body">
								<div className="form-inline">
									<input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="user name"
										onChange={(e) => this.setState({ username: e.target.value })}
										required
									/>
									<input type="text" className="form-control" id="inlineFormInputGroup" placeholder="password"
										onChange={(e) => this.setState({ password: e.target.value })}
										required
									/>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addUser}>Add</button>
								<button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>

				{/* Modal edit User */}
				<div className="modal fade" id="myModal">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title">Edit User</h4>
								<button type="button" className="close" data-dismiss="modal">&times;</button>
							</div>
							<div className="modal-body">
								<div className="form-inline">
									<input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" value={userEdit.username}
										onChange={(e) => this.setState({ userEdit: { ...userEdit, username: e.target.value } })}
										required
									/>
									<input type="text" className="form-control" value={userEdit.password}
										onChange={(e) => this.setState({ userEdit: { ...userEdit, password: e.target.value } })}
										required
									/>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.saveUser()}>Save</button>
								<button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>

				{/* Confirm Delete User */}
				<div className="modal fade" id="myModalDelete">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h6 className="modal-title">
								<span className="fa fa-exclamation-triangle btn-danger"></span>&nbsp;
									Do you want to delete user has name is "{deleteUser.username}" ?
									</h6>
								<button type="button" className="close" data-dismiss="modal">&times;</button>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.deleteUser(deleteUser)}>Yes</button>
								<button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default withAuth(UserList);