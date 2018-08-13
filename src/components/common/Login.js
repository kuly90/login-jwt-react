import React, { Component } from 'react';
import AuthService from '../service/AuthService';
import PropTypes from 'prop-types';

class Login extends Component {
	constructor(){
			super();
			this.handleChange = this.handleChange.bind(this);
			this.handleFormSubmit = this.handleFormSubmit.bind(this);
			this.handleError = this.handleError.bind(this);
			this.Auth = new AuthService();
	}
	componentWillMount(){
			if(this.Auth.loggedIn()){
				this.props.history.replace('/menu');
			}
					
	}
	render() {
		return (
			<div className="container">
				<nav className="navbar navbar-expand-sm bg-primary navbar-dark">
					<div className="container">
					<div className="collapse navbar-collapse" id="mainNav">
					<div className="navbar-nav">
					<button className="btn btn-primary" onClick={this.handleError} >Home</button>
					<button className="btn btn-primary" onClick={this.handleError} >List User</button>
					<button className="btn btn-primary" onClick={this.handleError}>Add New</button>                 
					</div>
					</div>
				</div>
				<div className="container">
				</div>
				<div className="container">         
				</div>
				</nav>
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
	handleError(){
		alert("Please Login First !!!");
	}
}

Login.propTypes = {
	location: PropTypes.object.isRequired
};




export default Login;
