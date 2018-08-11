import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from '../service/AuthService';

const Auth = new AuthService();

 class Header extends Component {

  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
  }

  render() {

    return (
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
        
         <div className="container">
          <div className="collapse navbar-collapse" id="mainNav">
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link" activeClassName="active" to="/PageTable" >PageTable</NavLink>
              <NavLink className="nav-item nav-link" activeClassName="active" to="/pageAdd" >PageAdd</NavLink>        
            </div>
          </div>
        </div>
        <div className="container">
          <div className="collapse navbar-collapse" id="mainNav">
            <div className="navbar-nav">
            
            </div>
          </div>
        </div>
        <div className="container">
          <div className="collapse navbar-collapse" id="mainNav">
            <div className="navbar-nav">
            <button type="button" className="btn btn-danger" onClick={this.handleLogout.bind(this)}>Logout</button>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
export default Header;
