import React from 'react';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            user: {
                username: 'user name',
                password: 'password'
            },
            users: [],
        }
    }
    componentDidMount() {
        this.getUsers();
    }

    getUsers = _ => {
        fetch('http://localhost:8080/users')
            .then(response => response.json())
            .then(response => this.setState({ users: response.data }))
            .catch(err => console.error(err))
    }

    addUser = _ => {
        const { user } = this.state;
        fetch(`http://localhost:8080/users/add?username=${user.username}&password=${user.password}`)
            .then(this.getUsers)
            .catch(err => console.error(err))
    }

    deleteUser (item) {
        const id = item.id;
        fetch(`http://localhost:8080/users/deleteUser?id=${id}`)  
            .then(this.getUsers)         
            .catch(err => console.error(err)
            )
    }

    editUser (item) {
        const id = item.id;
        console.log(id);       
         this.props.history.replace(`/EditUser/:${id}`, item);
        
    }

    render() {
        const { users, user } = this.state;
        return (
            <div className="App">
            <br/>
                 <div>
                    <div className="form-inline">
                        <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder={user.username}
                            onChange={e => this.setState({ user: { ...user, username: e.target.value } })}
                        />
                        <input type="text" className="form-control" id="inlineFormInputGroup" placeholder={user.password}
                            onChange={e => this.setState({ user: { ...user, password: e.target.value } })}
                        /> &nbsp;
                         <button onClick={this.addUser} className="btn btn-primary">
                         <i className="fa fa-plus" aria-hidden="true" /> New
                         </button>
                    </div>
                </div>
                <br/>
                <div >
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
                            {
                                users.map((item, index) =>
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.username}</td>
                                        <td>{item.password}</td>
                                        <td>
                                            <button className="btn btn-primary " onClick={() => this.editUser(item)}>
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
               
            </div>
        );
    }
}
export default UserList;