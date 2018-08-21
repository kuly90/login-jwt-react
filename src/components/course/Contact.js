import React from "react";
import axios from "axios";

class Contact extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: ''
        }
        this.handlerChange= this.handlerChange.bind(this);
        this.handlerSendEmail= this.handlerSendEmail.bind(this)
    }
    
    handlerChange = e =>{
        this.setState({[e.target.name]: e.target.value})
    }

   handlerSendEmail = _ =>{
        const { email, name, subject, message } = this.state;
        const mailTo = 'tonly01011990@gmail.com'
        console.log(email,name,subject,message);
        fetch(`http://localhost:8080/send-email?email=${email}&mailTo=${mailTo}&subject=${subject}&message=${message}`,)
        .catch(err => console.error(err))
    }

    render(){
        return(
            <div>
                <div className="container">
                    <h2>Contact Us</h2>
                    <div style={{ width:'500px'}}>
                        <form className="form-group">
                            <label>Email:</label>
                            <input type="email" className="form-control" placeholder="Enter email" 
                                    name="email" required onChange={this.handlerChange}
                            />
                        
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" className="form-control" placeholder="Enter Your Name" 
                                   name="name" required onChange={this.handlerChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Subject:</label>
                            <input type="text" className="form-control" placeholder="Enter Subject" 
                                   name="subject" required onChange={this.handlerChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Message:</label>
                            <textarea className="form-control" rows="5" placeholder="Enter Message"
                                     name="message" required onChange={this.handlerChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.handlerSendEmail}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
           
        );
    }
}
export default Contact;