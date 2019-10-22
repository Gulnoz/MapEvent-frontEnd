import React from 'react';
import LoginForm from './LoginForm'
import FavoritEventList from './FavoritEventLIst'
import CreateEventForm from './CreateEventForm'

export default class UserContainer extends React.Component {



    render() {
     
        return (
          <>{
             this.props.currentUser
              ? 
              
              // console.log(this.props.currentUser.attributes)
              // <FavoritEventList popUpFavoriteHendler={this.props.popUpFavoriteHendler}favorits={this.props.favorits} userEvents={this.props.currentUser.attributes.user_events}/>
              <CreateEventForm currentUser={this.props.currentUser} categories={this.props.categories}/>
              :<LoginForm setCurrentUser={this.props.setCurrentUser}/>
          }
          </>
          
        )}

    }