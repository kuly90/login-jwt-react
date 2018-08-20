import React from 'react';
import withAuth from '../service/withAuth';

class UserList extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            userEdit: [],
            user: {
                username: '',
                password: ''
            },
            users: [],

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
        const { user } = this.state;
        if(user.username == '' || user.password == ''){
            alert('please inser username and password !')
        }else{
            fetch(`http://localhost:8080/users/add?username=${user.username}&password=${user.password}`)
            .then(this.getUsers)
            .catch(err => console.error(err))
        }       
        
    }

    //delete user from database
    deleteUser (item) {
        const id = item.id;
        fetch(`http://localhost:8080/users/deleteUser?id=${id}`)  
            .then(this.getUsers)         
            .catch(err => console.error(err)
            )
    }

    //call Modal Edit user
    replaceModalItem (item) {
       console.log(item);       
       this.setState({
        userEdit: item
       }) 
                 
    }

    // save user after edit
    saveUser() {
        const { userEdit } = this.state; 
        console.log(userEdit);          
        if(userEdit.username == '' || userEdit.password == ''){
            alert('username and password are required !');
          }else{
            fetch(`http://localhost:8080/users/editUser?username=${userEdit.username}&password=${userEdit.password}&id=${userEdit.id}`)
              .then(this.getUsers)           
              .catch(err => console.error(err))              
          }
          
    }

    render() {
        const { users, user, userEdit } = this.state;       
        return (
            <div className="App">
            <br/>
            {/* Add user form */}
                 <div>
                    <div className="form-inline">
                        <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="user name"
                            onChange={e => this.setState({ user: { ...user, username: e.target.value } })}
                            required
                        />
                        <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="password"
                            onChange={e => this.setState({ user: { ...user, password: e.target.value } })}
                            required
                        /> &nbsp;
                         <button onClick={this.addUser} className="btn btn-primary">
                         <i className="fa fa-plus" aria-hidden="true" /> New
                         </button>
                    </div>
                </div>
                <br/>
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
                                            <button className="btn btn-danger" onClick={()=> this.deleteUser(item)}>
                                                <span className="fa fa-trash-o fa-fw"></span>
                                            </button>
                                        </td>                                       
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
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
                                    <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" defaultValue={userEdit.username}
                                        onChange={e => this.setState({ userEdit: { ...userEdit, username: e.target.value } })}
                                        required
                                    />
                                    <input type="text" className="form-control" id="inlineFormInputGroup" defaultValue={userEdit.password}
                                        onChange={e => this.setState({ userEdit: { ...userEdit, password: e.target.value } })}
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
            </div>
        );
    }
}
export default withAuth(UserList);