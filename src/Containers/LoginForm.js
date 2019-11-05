import React, { Component } from "react";
import { Form, Button} from "react-bootstrap";
import GoogleForm from './GoogleLogin'

export default class Login extends Component {
state = {
    email: "",
    password: ""
}

// validateForm() {
//     return this.state.email.length > 0 && this.state.password.length > 0;
// }

handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    });
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
            else {
                console.log(user)

                this.props.setCurrentUser(user.user.data)
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
            <Form.Label></Form.Label>
            <Form.Control type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
    )
    }
}