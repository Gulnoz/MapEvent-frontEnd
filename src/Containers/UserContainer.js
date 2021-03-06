import React from 'react';
import LoginForm from './LoginForm'
import FavoritEventList from './FavoritEventLIst'
import CreateEventForm from './CreateEventForm'

export default class UserContainer extends React.Component {

  state={
    showCreateForm: false,
    showFaforite: false,
    btnMyEventTxt: 'My Events',
    btnMyFavoritTxt: 'Favorite'
  }
  createEventHendler=()=>{
   this.setState({
     showCreateForm: true,
   })
    this.props.editEventNull()
  }
  swichWindow=()=>{
    this.setState({
      showFaforite: !this.state.showFaforite
    })
  }
  closeWindow=()=>{
    this.setState({
      showCreateForm: false
    })
  }
    render() {
      
      const {ref} = this.props;
      
        return (
          <>
          {
              this.props.currentUser && !this.state.showCreateForm ? 
              <div> <button type='submit' onClick={this.swichWindow}>{this.state.showFaforite ? 'My Events' : 'Favorite' }</button>
                {!this.state.showCreateForm
                ?
                <button type='submit' onClick={this.createEventHendler}>Create Event</button> 
                    : null} </div>
                  : null}
            {
             this.props.currentUser
              ? 
                this.state.showCreateForm || this.props.createEventFormState.eventId
                ?
                  <CreateEventForm 
                    onChangeSelectHendler={this.props.onChangeSelectHendler} 
                    handleSubmit={this.props.handleSubmit} 
                    handleChange={this.props.handleChange}
                    updateEventHendler={this.props.updateEventHendler} 
                    ref={ref} 
                    createEventFormState={this.props.createEventFormState}
                    createEventHendler={this.createEventHendler}
                    closeWindow={this.closeWindow} 
                    addEventHendler={this.props.addEventHendler}
                    currentUser={this.props.currentUser}
                    categories={this.props.categories}/>
                  : 
                  this.state.showFaforite
                  ?
                    <FavoritEventList 
                      caption="Faforite:" 
                      createEventHendler={this.createEventHendler} 
                      popUpFavoriteHendler={this.props.popUpFavoriteHendler} 
                      favorits={this.props.favorits} />
                  :
                  <FavoritEventList 
                    caption="My Events:" 
                    createEventHendler={this.createEventHendler} 
                    popUpFavoriteHendler={this.props.popUpFavoriteHendler} 
                    favorits={this.props.userEvents} />
                  : (localStorage.getItem('currentUserToken')
                ? null : <LoginForm setCurrentUser={this.props.setCurrentUser}/>)
          }
          </>
          )}
}
