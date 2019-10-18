import React from 'react';
import './App.css';
import MapContainer from './MapContainer';
import { Select } from 'semantic-react';
import UserContainer from './Containers/UserContainer'
import SelectCategory from './SelectCategory'

class App extends React.Component{
  state={
    categories: [],
    events: [],
    filteredEvent: [],
    currentUser: null,
    favorits: [],
    popUpFavorite: null
  }

filterFavoritEvents=()=>{
   // console.log(events)
  let newArr=[]
  if (this.state.currentUser){
    this.state.currentUser.attributes.user_events.forEach((user_event)=> {
    this.state.events.forEach((event) => user_event.event_id === event.id ? newArr.push(event) : console.log(event));}) 
    return newArr
  }
}
popUpFavoriteHendler=(favoritObj)=>{
this.setState({
  filteredEvent: [favoritObj]
})
}
  setFavorits=()=>{
    this.setState({
      favorits: this.filterFavoritEvents()
    })
  }
  componentDidMount(){
    fetch('http://localhost:3000/categories')
    .then(res=>res.json())
    .then(res=>this.setState({categories: res}))
  
    fetch('http://localhost:3000/events')
    .then(res => res.json())
    .then(res => this.setState({ events: res, filteredEvent:res}))
  }

selectByCategory=(id)=>{
   //console.log('selectByCategoryFunc')
  if (id === null){
    this.setState({ filteredEvent: this.state.events })
  }
  else{
  fetch(`http://localhost:3000/events/categories/${id}`)
  .then(res => res.json())
  .then(res => this.setState({ filteredEvent: res }))
  }
}

setCurrentUser=(user)=>{
  this.setState({
    currentUser: user
  })
  this.setFavorits()
}

addFavoritEvent = (e, eventObj) =>{
   //console.log('hit add favorite event')
  e.preventDefault();
  let exist=this.state.favorits.find(favorit=>favorit.id===eventObj.id)
  if (exist){
 let newArr=this.state.favorits.filter(favorit=>favorit.id!==exist.id)
    this.setState({
      favorits: newArr,
      filteredEvent: this.state.events
    })

    fetch(`http://localhost:3000/user_events/${exist.id}`,
      {
        method: 'DELETE'
      }
    )
      .then(res => res.json())
      .then(console.log)
    
  }
  else{
    this.setState({
        favorits: [...this.state.favorits, eventObj]
    })
    
 
    fetch('http://localhost:3000/user_events',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id : this.state.currentUser.id,
          event_id: eventObj.id
          })
      })
    .then(res => res.json())
    .then()
  }
}
  render(){

    console.log(this.state.popUpFavorite)
    return (
      <div className='app-container'> 
        <div className='map-div'>
          <div>
            <SelectCategory categories={this.state.categories} submitHendler={this.selectByCategory} />
          </div> 
          <MapContainer currentUser={this.state.currentUser} addFavoritEvent={this.addFavoritEvent} events={this.state.filteredEvent}/>
        </div>
        <div id='user-container'>
          <UserContainer popUpFavoriteHendler={this.popUpFavoriteHendler}favorits={this.state.favorits}currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser}/>
        </div>
      </div>
    );
  }
}
export default App;
