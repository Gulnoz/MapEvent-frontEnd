import React from 'react';
import LoginForm from './LoginForm'
import FavoritEventList from './FavoritEventLIst'

export default class UserContainer extends React.Component {



    render() {
     
        return (
          <>{
             this.props.currentUser
              ? 
              // console.log(this.props.currentUser.attributes)
              <FavoritEventList favorits={this.props.favorits} userEvents={this.props.currentUser.attributes.user_events}/>
            :<LoginForm setCurrentUser={this.props.setCurrentUser}/>
          }
          </>
          
        )}

    }