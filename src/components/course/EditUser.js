import React from "react";
import withAuth from '../service/withAuth';

class EditUser extends React.Component{
 
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this); 
    this.state = {     
      // item: {
      // },
      user: {
          username: 'username',
          password: 'password'
      },
      users: [],
  }
}

handleSave(user){
  if(user.username == '' || user.password == ''){
    alert('username and password are required !');
  }else{
    fetch(`http://localhost:8080/users/editUser?username=${user.username}&password=${user.password}&id=${user.id}`)
      .catch(err => console.error(err))
       this.props.history.replace('/menu/userList');
  }  
}

handleCancel() {
  this.props.history.replace('/menu/userList');
}

  render(){
    const { user } = this.state;   
    return(    
      <div>
        <br/>
        <div>
            <div className="form-inline">
                <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" value={user.username}
                    onChange={e => this.setState({ user: { ...user, username: e.target.value } })}
                />
                <input type="text" className="form-control" id="inlineFormInputGroup" value={user.password}
                    onChange={e => this.setState({ user: { ...user, password: e.target.value } })}
                /> &nbsp;
                  <button onClick={() => this.handleSave(user)} className="btn btn-primary">
                  <i aria-hidden="true" /> Save
                  </button>&nbsp;
                  <button onClick={this.handleCancel} className="btn btn-danger">
                  <i aria-hidden="true" /> Cancel
                  </button>
            </div>
        </div>
      </div>
    );
  }
}

export default withAuth(EditUser);