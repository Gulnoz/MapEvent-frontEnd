import React from 'react';
import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
export default class Login extends React.Component {

    responseGoogle = (response) => {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: response.profileObj.email,
                password: response.profileObj.googleId
            })
        }
        )

            .then(res => res.json())
            .then((user) => {
                //   return user ? this.props.logedIn() : null
                if (user.error) {
                    // console.log(user)
                    fetch('http://localhost:3000/users',
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                email: response.profileObj.email,
                                password: response.profileObj.googleId
                            })
                        })
                        .then(res => res.json())
                        .then((user) => this.props.setCurrentUser(user.data))


                }
                else {
                   // console.log(user.data)
                    this.props.setCurrentUser(user.data)
                }
                })
    
}
    // responseFacebook = (response) => {
    //     console.log(response);
    // }

render(){
    return(
            <>
               {/* <FacebookLogin
                appId="488278978687836" //APP ID NOT CREATED YET
                fields="name,email,picture"
                callback={this.responseFacebook}
              />
                 <br />
                 <br /> */}
            <GoogleLogin class='loginBtn--google'
                clientId = {process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
            buttonText="LOGIN"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
            />
            </>
    
    )}
}