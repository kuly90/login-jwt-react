import React, { Component } from 'react';
import AuthService from '../service/AuthService';
import withAuth from '../service/withAuth';

const Auth = new AuthService();

 class Header extends Component {

  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
  }

  handlePageHome(){
    this.props.history.replace('/menu');
  }

  handlePageTable(){
    this.props.history.replace('/menu/PageTable');
  }
  
  handlePageAdd(){
    this.props.history.replace('/menu/PageAdd');
  }

  render() {

    return (
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
        
         <div className="container">
          <div className="collapse navbar-collapse" id="mainNav">
            <div className="navbar-nav">
            <button className="btn btn-primary" onClick={this.handlePageHome.bind(this)}>Home</button>
            <button className="btn btn-primary" onClick={this.handlePageTable.bind(this)}>List User</button>
            <button className="btn btn-primary" onClick={this.handlePageAdd.bind(this)}>Add New</button>                 
            </div>
          </div>
        </div>
        <div className="container">
        </div>
        <div className="container">         
        </div>
        <div className="container">
          <div className="collapse navbar-collapse" id="mainNav">
            <div className="navbar-nav">
            <button className="btn btn-primary" onClick={this.handleLogout.bind(this)}>Logout</button>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
export default withAuth(Header);
