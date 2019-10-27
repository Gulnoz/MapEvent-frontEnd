import React from 'react';
import './App.css';
import MapContainer from './MapContainer';
import UserContainer from './Containers/UserContainer'
import SelectCategory from './SelectCategory'
class App extends React.Component{
  state={
    categories: [],
    events: [],
    filteredEvent: [],
    currentUser: null,
    favorits: [],
    popUpFavorite: null,
    userEvents: [],
    createEventFormState: {
     eventId: null,
      name: "",
    image: "",
    description: "",
    address: "",

    date: "",
    start: "",
    end: "",

    value: null,
    locationLat: null,
    locationLong: null
  },

  }
  
  onChangeSelectHendler = (event) => {
   console.log("Select value")
    console.log(event.target.value)
    this.setState({ 
      createEventFormState: { ...this.state.createEventFormState,
        value: event.target.value} });
  }

  handleChange = event => {
    this.setState({
      createEventFormState: { ...this.state.createEventFormState, [event.target.name]: event.target.value}
    });
  }


  handleSubmit = event => {
    event.preventDefault();
    if (this.state.createEventFormState.address!==''){
     
       this.getLatLong(this.state.createEventFormState.address)

    }
   

  }
  getLatLong = (address) => {
    //let location=null
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          createEventFormState: {
            ...this.state.createEventFormState,
            locationLat: data.results[0].geometry.location.lat,
          locationLong: data.results[0].geometry.location.lng,
          }
          
        });

      //  console.log(this.props.currentUser)
        let currentEvent=this.state.createEventFormState
        console.log(currentEvent)
        if (currentEvent.eventId) {
          fetch(`https://mapevent-api.herokuapp.com/events/${currentEvent.eventId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: currentEvent.name,
              image: currentEvent.image,
              description: currentEvent.description,
              category_id: currentEvent.value,
              address: currentEvent.address,
              location_lat: currentEvent.locationLat,
              location_long: currentEvent.locationLong,
              date: currentEvent.date,
              start_time: currentEvent.start,
              end_time: currentEvent.end
            })
          })
            .then(res => res.json())
            .then(res => {
              this.updateEventHendler(res);
              this.editEventNull()
            })
        }
        else {
          fetch('https://mapevent-api.herokuapp.com/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: currentEvent.name,
              image: currentEvent.image,
              description: currentEvent.description,
              category_id: currentEvent.value,
              user_id: this.state.currentUser.id,
              address: currentEvent.address,
              location_lat: currentEvent.locationLat,
              location_long: currentEvent.locationLong,
              date: currentEvent.date,
              start_time: currentEvent.start,
              end_time: currentEvent.end
            })
          })
            .then(res => res.json())
            .then(eventObj => {
              console.log(eventObj)
              this.addEventHendler(eventObj);
              this.editEventNull()
            })
        }
      })
  }
filterFavoritEvents=()=>{
   // console.log()
  let newArr=[]
  if (this.state.currentUser){
    console.log(this.state.setCurrentUser)
    this.state.currentUser.attributes.favorite_events.forEach((favorite)=> {
      this.state.events.forEach((event) => favorite.event_id === event.id ? newArr.push(event) : console.log(event));}) 
    return newArr

  }
  
}
popUpFavoriteHendler=(favoritObj)=>{
this.setState({
  filteredEvent: [favoritObj]
})
}
  setFavorits=()=>{
   
   if(this.state.currentUser){
     this.setState({
       favorits: this.filterFavoritEvents(),
       userEvents: this.state.currentUser.attributes.events
     })
   }
   
  }
  setUserEvents=()=>{
    if (this.state.currentUser) {
      this.setState({
        userEvents: this.state.currentUser.attributes.events
      })
    }
  }
  componentDidMount(){
    fetch('https://mapevent-api.herokuapp.com/categories')
    .then(res=>res.json())
    .then(res=>this.setState({categories: res}))
  
    fetch('https://mapevent-api.herokuapp.com/events')
    .then(res => res.json())
    .then(res => this.setState({ events: res, filteredEvent:res}))
  }
addEventHendler=(eventObj)=>{
  this.setState({
    events: [...this.state.events, eventObj],
    filteredEvent: [...this.state.filteredEvent, eventObj],
    //favorits: [...this.state.favorits, eventObj],
    userEvents: [...this.state.userEvents, eventObj]
  })
}
  updateEventHendler=(updatedEvent)=>{
    
    let newEventsArr=this.state.events.filter(event => event.id !== updatedEvent.id)
    let newUserEventsArr = this.state.userEvents.filter((userEvent) => {
      return userEvent.id!==updatedEvent.id
    }) 
    this.setState({
      event: [...newEventsArr, updatedEvent],
      filteredEvent: [...newEventsArr, updatedEvent],
      eventToEdit: null,
      userEvents: [...newUserEventsArr, updatedEvent]
    })
  }
editEvent=(event)=>{
  console.log(event)
  this.setState({
    createEventFormState: {
      ...this.state.createEventFormState,
      eventId: event.id,
      name: event.name,
        image: event.image,
        description: event.description,
        address: event.address,

        date: event.date,
        start: event.start_time,
        end: event.end_time,

        value: event.category_id,
    }
  })
  // this.updateFormHendler()
}
editEventNull=()=>{
  this.setState({
    createEventFormState: {
      eventId: null,
      name: "",
      image: "",
      description: "",
      address: "",

      date: "",
      start: "",
      end: "",

      value: null,
      locationLat: null,
      locationLong: null
    }
  })
}
selectByCategory=(id)=>{
   console.log(id)
  if (id === null || id === 'All'){
    this.setState({ filteredEvent: this.state.events })
  }
  else{
    fetch(`https://mapevent-api.herokuapp.com/events/categories/${id}`)
  .then(res => res.json())
  .then(res => this.setState({ filteredEvent: res }))
  }
}

setCurrentUser=(user)=>{
 console.log(user)
  this.setState({
    currentUser: user
   
  })
  this.setFavorits()
}
  isUserEvent = (event) => {
   return this.state.userEvents.find(el=> el.id===event.id)
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

    fetch(`https://mapevent-api.herokuapp.com/favorite_events/${exist.id}`,
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
    
 
    fetch('https://mapevent-api.herokuapp.com/favorite_events',
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
          <div>
            <SelectCategory categories={this.state.categories} submitHendler={this.selectByCategory} />
          </div> 

          <MapContainer createEventFormState={this.state.createEventFormState}editEvent={this.editEvent}isUserEvent={this.isUserEvent}currentUser={this.state.currentUser} addFavoritEvent={this.addFavoritEvent} events={this.state.filteredEvent}/>
          
        </div>
        <div id='user-container'>
          <UserContainer onChangeSelectHendler={this.onChangeSelectHendler} handleSubmit={this.handleSubmit} handleChange={this.handleChange} editEventNull={this.editEventNull} updateEventHendler={this.updateEventHendler} ref={this.createEventFormElement} createEventFormState={this.state.createEventFormState} addEventHendler={this.addEventHendler} popUpFavoriteHendler={this.popUpFavoriteHendler} favorits={this.state.favorits} userEvents={this.state.userEvents} currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} categories={this.state.categories} setUserEvents={this.setUserEvents}/>
        </div>
      </div>
    );
  }
}
export default App;
