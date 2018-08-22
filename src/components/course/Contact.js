import React from "react";

class Contact extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            msg: '',
            msgerror: ''
        }
        this.handlerChange= this.handlerChange.bind(this);
        this.handlerSendEmail= this.handlerSendEmail.bind(this)
    }
    
    handlerChange = e =>{
        this.setState({[e.target.name]: e.target.value})
    }

   handlerSendEmail = _ =>{
    const { email, name, subject, message } = this.state;
       if(email === '' || name === '' || subject ==='' ||message===''){
           this.setState({
            msgerror: '(*) is required !!!',
            msg: ''
           })
       }else{
        this.setState({
            msg: 'Send message success. Thanks for contact with Us!',
            msgerror:'',
            name: '',
            email: '',
            subject: '',
            message: ''
        })       
         console.log(email,name,subject,message);
         fetch(`http://localhost:8080/send-email?name=${name}&email=${email}&subject=${subject}&message=${message}`,)
         .catch(err => console.error(err))
       }
      
    }

    render(){
        return(
            <div>
                <div className="container">
                    <h2>Contact Us</h2>
                    <p style={{color:'green'}}>{this.state.msg}</p>
                    <p style={{color:'red'}}>{this.state.msgerror}</p>
                    <div style={{ width:'500px'}}>
                        <div className="form-group">
                            <label>Email <span style={{color:'red'}}>*</span></label>
                            <input type="email" className="form-control" value={this.state.email}
                                    name="email" required onChange={this.handlerChange}
                            />
                        
                        <div className="form-group">
                            <label>Name <span style={{color:'red'}}>*</span></label>
                            <input type="text" className="form-control" value={this.state.name}
                                   name="name" required onChange={this.handlerChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Subject <span style={{color:'red'}}>*</span></label>
                            <input type="text" className="form-control" value={this.state.subject}
                                   name="subject" required onChange={this.handlerChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Message <span style={{color:'red'}}>*</span></label>
                            <textarea className="form-control" rows="5" value={this.state.message}
                                     name="message" required onChange={this.handlerChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.handlerSendEmail}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
           
        );
    }
}
export default Contact;