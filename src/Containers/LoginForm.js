import React, { Component } from "react";
import { Form, Button} from "react-bootstrap";
import GoogleForm from './GoogleLogin'

export default class Login extends Component {
state = {
    email: "",
    password: "",
    errorMessege: null
}

// validateForm() {
//     return this.state.email.length > 0 && this.state.password.length > 0;
// }

handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    });
}

errorMessegeHendler(message){
    this.setState({
        errorMessege: message
    })
}
handleSubmit = event => {
    event.preventDefault();
    fetch('https://mapevent-api.herokuapp.com/login', 
        { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }) 
        }) 
        .then(res => res.json())
        .then((user) => {
            //   return user ? this.props.logedIn() : null
            console.log(user)
            
            if (user.error === 'Not exist') {
            
                fetch('https://mapevent-api.herokuapp.com/users',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: this.state.email,
                            password: this.state.password
                        })
                    })
                    .then(res => res.json())
                    .then((user) => this.props.setCurrentUser(user.user.data))
                    

            }
            else if (user.error === 'Wrong password'){
                this.errorMessegeHendler(user.error)
                console.log(user.error)
            }
            else if (user.user) {
                console.log(user)
                this.props.setCurrentUser(user.user.data)
            }
            else {
               console.log(user)
                
                
            }
        })
}


    render(){
    return(
    <Form onSubmit={this.handleSubmit} >  
        <GoogleForm setCurrentUser={this.props.setCurrentUser}/>
            <div style={{ color: 'white', padding: "10px", fontSize: "calc(10px + 2vmin)", fontWeight: "bold"}}>SignIn/SignUp form:</div>
        <Form.Group controlId="formBasicEmail">
            <Form.Label></Form.Label>
            <Form.Control type="email" name="email" value={this.state.email} placeholder="Enter email" onChange={this.handleChange} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
           
            <Form.Control type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} />
                
        </Form.Group>
        {this.state.errorMessege
           ? <div><Form.Label style={{color:'red'}}>{this.state.errorMessege}!!!</Form.Label></div>
           : null}
        <Button variant="primary" type="submit">
            Submit
        </Button>
            
    </Form>
    )
    }
}