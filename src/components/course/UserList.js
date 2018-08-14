import React from 'react';

class UserList extends React.Component{
state = {
    users:[], 
    user: {
        username: 'user name',
        password: 'password'
    
    }
}
componentDidMount(){
    this.getUsers();
}

getUsers = _ => {
    fetch('http://localhost:8080/users')
    .then(response =>response.json())
    .then(response => this.setState({users: response.data}))
    .catch(err => console.error(err))    
}

addUser = _=> {
    const { user } = this.state;
    fetch(`http://localhost:8080/users/add?username=${user.username}&password=${user.password}`)
    .then(this.getUsers)
    .catch(err => console.error(err))
    
}

 deleteUser = _=> {
    const id = this.refs.txt.value;
    alert(id);
    fetch(`http://localhost:8080/users/deleteUser?id=${id}`)
    .then(this.getUsers)
    .catch(err => console.error(err)
    )
}

editUser = _ => {
    alert('edit')
}


renderUser = ({id, username, password}) => 
    
    <div key={id}>
      <table className="table table-hover">
        <thead>
        <tr>
            <th>user Id</th>
            <th>user name</th>
            <th>password</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td  ref="txt">{id}</td>
                <td>{username}</td>
                <td>{password}</td>
                <td>
                    <button className="btn btn-primary " onClick={this.editUser}> 
                       <span className="fa fa-pencil fa-fw"></span>
                    </button>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={this.deleteUser}>    
                        <span className="fa fa-trash-o fa-fw"></span>
                    </button>
                </td>
                
            </tr>       
        </tbody>
     </table>      
    </div>

    render(){
        const { users, user } = this.state;
        return(
            <div className="App">
                {users.map(this.renderUser)}
                
                <div>
                    <form className="form-inline" onSubmit={this.addUser}>
                        <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder={user.username}
                            onChange={e => this.setState({ user: {...user,username: e.target.value}})}
                        />
                        <input type="text" className="form-control" id="inlineFormInputGroup" placeholder={user.password}
                            onChange={e => this.setState({ user: {...user,password: e.target.value}})}
                        /> &nbsp;                   
                         <button type="submit" className="btn btn-primary">Add New</button>
                    </form>
                    
                </div>
            </div>
        );
    }
}
export default UserList;