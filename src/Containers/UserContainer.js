import React from 'react';
import LoginForm from './LoginForm'
import FavoritEventList from './FavoritEventLIst'
import CreateEventForm from './CreateEventForm'

export default class UserContainer extends React.Component {

  state={
    showCreateForm: false,
    showFaforite: false
  }
  createEventHendler=()=>{
   this.setState({
     showCreateForm: !this.state.showCreateForm,

 })
    this.props.editEventNull()
 //call function from parent to make null eventToEdit
  }
  swichWindow=()=>{
    this.setState({
      showFaforite: !this.state.showFaforite
    })
  }
    render() {
      const { ref} = this.props;
      console.log(this.props.createEventFormState.eventIt)
        return (

          <>
          {
            this.props.currentUser
                   ?
                  <button type='submit' onClick={this.swichWindow}>My Events</button>
                  : null}
            {
             this.props.currentUser
              ? 
                // console.log(this.props.currentUser.attributes)
              
               
              
                this.state.showCreateForm || this.props.createEventFormState.eventId
                ?
                  <CreateEventForm onChangeSelectHendler={this.props.onChangeSelectHendler} handleSubmit={this.props.handleSubmit} handleChange={this.props.handleChange}updateEventHendler={this.props.updateEventHendler} ref={ref} createEventFormState={this.props.createEventFormState} createEventHendler={this.createEventHendler} addEventHendler={this.props.addEventHendler}currentUser={this.props.currentUser} categories={this.props.categories}/>
                  : 
                  this.state.showFaforite
                  ?
                    <FavoritEventList caption="Faforite:" createEventHendler={this.createEventHendler} popUpFavoriteHendler={this.props.popUpFavoriteHendler} favorits={this.props.favorits} />
                  :
                  <FavoritEventList caption="My Events:" createEventHendler={this.createEventHendler}  popUpFavoriteHendler={this.props.popUpFavoriteHendler} favorits={this.props.userEvents} />
                  
              
            
              :<LoginForm setCurrentUser={this.props.setCurrentUser}/>
          }
          
          </>
          
        )}

    }