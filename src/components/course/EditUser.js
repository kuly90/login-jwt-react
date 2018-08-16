import React from "react";

class EditUser extends React.Component{
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      
      user: {
          id: this.state,
          username: 'user name',
          password: 'password'
      },
      users: [],
  }
}

handleSave(){
  const { user } = this.state;
  fetch(`http://localhost:8080/users/editUser?username=${user.username}&password=${user.password}&id=${user.id}`)
      .then(this.getUsers)
      .catch(err => console.error(err))
}

handleCancel() {
  this.props.history.replace('/menu/userList');
}

  render(){
    const { user } = this.state;
    console.log( this.props.item)
    return(    
      <div>
        <div>
            <div className="form-inline">
                <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" value={user.id}
                    onChange={e => this.setState({ user: { ...user, username: e.target.value } })}
                />
                <input type="text" className="form-control" id="inlineFormInputGroup" 
                    onChange={e => this.setState({ user: { ...user, password: e.target.value } })}
                /> &nbsp;
                  <button onClick={this.handleSave} className="btn btn-primary">
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
export default EditUser;