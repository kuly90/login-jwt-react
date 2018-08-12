import React, { Component } from 'react';
import AuthService from '../service/AuthService';
import PropTypes from 'prop-types';

class Login extends Component {
	constructor(){
			super();
			this.handleChange = this.handleChange.bind(this);
			this.handleFormSubmit = this.handleFormSubmit.bind(this);
			this.Auth = new AuthService();
	}
	componentWillMount(){
			if(this.Auth.loggedIn()){
				this.props.history.replace('/login');
				this.Auth.logout();
			}
					
	}
	render() {
		return (
			<div className="container">
				<h2>LOGIN</h2>
				<form onSubmit={this.handleFormSubmit}>
					<div className="form-group">
						<label>User Name:</label>
						<input type="text" className="form-control" id="username" 
						placeholder="Enter username" name="username" required onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<label>Password:</label>
						<input type="password" className="form-control" id="pwd" 
						placeholder="Enter password" name="password" required onChange={this.handleChange}/>
					</div>
					<div className="form-group form-check">

					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>

		);
	}
	handleFormSubmit(e) {
		e.preventDefault();
		this.Auth.login(this.state.username, this.state.password)
			.then(res => {
				this.props.history.replace('/menu')
			})
		
			.catch(err => {
				alert(err);
			})
	}

	handleChange(e) {
		this.setState(
			{
				[e.target.name]: e.target.value
			}
		)
	}
}

Login.propTypes = {
	location: PropTypes.object.isRequired
};




export default Login;
