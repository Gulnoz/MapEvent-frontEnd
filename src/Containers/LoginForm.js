import React, { Component } from "react";
import { Form, Button} from "react-bootstrap";
import GoogleForm from './GoogleLogin'

export default class Login extends Component {
state = {
    email: "",
    password: "",
    errorMessege: null
}

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
    fetch('https://mapevent-api.herokuapp.com/login', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }) 
        }) 
        .then(res => res.json())
        .then((user) => {
            if (user.error === 'Not exist') {
                fetch('https://mapevent-api.herokuapp.com/users', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: this.state.email,
                            password: this.state.password
                        })
                    })
                    .then(res => res.json())
                    .then((user) => {
                        this.props.setCurrentUser(user.user.data);
                        localStorage.setItem('currentUserToken', user.jwt);
                    })
            }
            else if (user.error === 'Wrong password'){
                this.errorMessegeHendler(user.error)
            }
            else if (user.user) {
                this.props.setCurrentUser(user.user.data)
                localStorage.setItem('currentUserToken', user.jwt);
            }
            else {
 
            }
        })
}

    render(){
        return(
            <Form onSubmit={this.handleSubmit}>  
                <GoogleForm setCurrentUser={this.props.setCurrentUser}/>
                <div style={{ color: 'white', padding: "10px", fontSize: "calc(10px + 2vmin)", fontWeight: "bold"}}>SignIn/SignUp form:</div>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" name="email" value={this.state.email} placeholder="Enter email" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} />
                </Form.Group>
                {this.state.errorMessege ? <div><Form.Label style={{color:'red'}}>{this.state.errorMessege}!!!</Form.Label></div> : null}
                <Button variant="primary" type="submit">
                   Submit
                </Button>
            </Form>
    )}
}
