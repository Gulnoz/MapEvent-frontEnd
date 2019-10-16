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
    currentUser: null,
    favorits: []
  }

  filterFavoritEvents=()=>{
   // console.log(events)
   let newArr=[]
    if (this.state.currentUser)
   {
       this.state.currentUser.attributes.user_events.forEach((user_event)=> {
         this.state.events.forEach((event) => user_event.event_id === event.id ? newArr.push(event) : console.log(event)
    );
   }) 
   return newArr
  }
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
      .then(res=>this.setState({events: res}))
  }

 selectByCategory=(id)=>{
   //console.log('selectByCategoryFunc')
   fetch(`http://localhost:3000/events/categories/${id}`
   )
     .then(res => res.json())
     .then(res => this.setState({ events: res }))
 }
 setCurrentUser=(user)=>{
   this.setState({
     currentUser: user
   })
   this.setFavorits()
 }
 addFavoritEvent = (e, eventObj) =>{
   console.log('hit add favorite event')
  e.preventDefault();
  if(eventObj){
     this.setState({
        favorits: [...this.state.favorits, eventObj]
     })
    }
   if(this.state.currentUser){
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

    console.log(this.state.favorits)
    return (
      <div className='app-container'> 
        
           <div className='map-div'>
              <div><SelectCategory categories={this.state.categories} submitHendler={this.selectByCategory} /></div> 
          <MapContainer currentUser={this.state.currentUser} addFavoritEvent={this.addFavoritEvent} events={this.state.events}/>
         
          </div>
        
        <div id='user-container'> <UserContainer favorits={this.state.favorits}currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser}/> </div>
      
     </div>
    );

  }
  
}

export default App;
