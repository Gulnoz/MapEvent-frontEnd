import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTimeout from 'react-timeout'
import pumkin from './pic/pumpkin.svg'
import Music from './pic/Music.svg'
import foodIcon from './pic/taco.svg'
import bussiness from './pic/idea.svg'
import community from './pic/social-care.svg'
import art from './pic/creativity.svg'
import film from './pic/video-camera.svg'
import sport from './pic/exercise.svg'
import science from './pic/chip.svg'
import infoWindowBackround from './pic/89733.jpg'
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper, Marker, InfoWindow, Point, } from 'google-maps-react';

class MapContainer extends React.Component{

    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {} 
    }

    infoWindowHendler = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
    };

    markerIconHendler=(category_id)=> {
        switch (category_id) {
            case 1:   //music
                return Music 
            case 11:   //food
                return foodIcon 
           case 9:    //bisseness
                return science 
            case 5:   //community
                return community 
            case 6:   //community
                return community 
            case 2:  //art
                return art 
            //     break;
            case 10:   //film
                { return film }
            //     break;
            case 3:   //sport
                { return sport }
            //     break;
            case 6:   //Science
                return science 
            case 8:   //Science
                return science 
            //     break;
            case 4:   //Science
                return science 
            //     break;
            default:
                return pumkin
        }
    }  
    // onInfoWindowOpen=(props, e)=>{
    //     return (props.currentUser
    //      ?
    //     <button onClick={ (e) => this.props.addFavoritEvent(e, this.state.selectedPlace.id)}>"Add!❤️"</button>
    //     :null)
    //  }
    onInfoWindowOpen(props, e) {
        const btn=this.props.isUserEvent(this.state.selectedPlace)
        ?
         (<button style={{ background: "rgba(255, 255, 255, .1)", fontSize: "calc(5px + 2vmin)", border: "none" }} onClick={e => { this.props.editEvent(this.state.selectedPlace.eventObj) }}><span>📝</span></button>)
        : (<button style={{ background: "rgba(255, 255, 255, .1)", fontSize: "calc(5px + 2vmin)", border: "none"}}onClick={e => { this.props.addFavoritEvent(e, this.state.selectedPlace.eventObj) }}><span>❤️</span></button>)
       
        ReactDOM.render(React.Children.only(btn), document.getElementById("iwc"));
    }

    displayMarkers = () => {
        //console.log(this.props.events)
        
        return this.props.events.map((oneEvent, index ) => {
            console.log(this.state.selectedPlace)
            return <Marker 
                key={oneEvent.id}
                id={oneEvent.id}
                eventObj={oneEvent}
                position={{
                    lat: oneEvent.location_lat,
                    lng: oneEvent.location_long,
                }}
                // position={{
                // lat: oneEvent.venue.address.latitude,
                // lng: oneEvent.venue.address.longitude
                // }}
                onClick={this.infoWindowHendler}
                name={oneEvent.name}
                description={oneEvent.description}
                location={oneEvent.address}
                date={oneEvent.date}
                start={oneEvent.start_time}
                end={oneEvent.end_time}
                // url={oneEvent.url}
                icon={this.markerIconHendler(oneEvent.category_id)}
                img={oneEvent.image}
            />
            })
    }
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     console.log(this.props.eventToEdit)
    //     if (!nextProps.eventToEdit) {

    //         this.setState({
    //             showingInfoWindow: false,  //Hides or the shows the infoWindow
    //             activeMarker: {},          //Shows the active marker upon click
    //             selectedPlace: {} 
    //         })


    //     }
    // }

    render() {
        console.log(this.state.selectedPlace)
        const Background = 'https://images-na.ssl-images-amazon.com/images/I/91xRMoJBzoL._SY355_.jpg'
        return (
            <div style={{
                position: "relative",
                border: "1px solid white",
                overflow: "hidden",
                borderRadius: "10px",
                width:"100%",
                height:"90vh"}}>
            <Map
                google={this.props.google}
                zoom={12}
                initialCenter={{ lat: 40.7128, lng: -74.0060 }}
                onClick={this.onClose}
                onDragend={this.onClose}
            >
                {this.displayMarkers()}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                    option={{boxStyle: {
                                width: '100px'
                            }}
                    }
                        onOpen={e => this.props.currentUser   ? this.onInfoWindowOpen(this.props, e) : null}
                     >      
                    
                      {/* backgroundImage: `url(${this.state.selectedPlace.img})` */}
                        <div id="pic" style={{
                            backgroundImage: `url(${this.state.selectedPlace.img})`, backgroundSize: 'cover', overflow: 'hidden', borderRadius: '5px' }} >
                    
                            <div style={{ color: 'white', padding: "20px", backgroundColor: 'rgba(70, 107, 117,.7)'}}>
                            <h3>{this.state.selectedPlace.name} <span id="iwc" />  
                            {/* <img
                                style={{ width: '40px', height: '30px' }}
                                src={Background}
                            /> */}
                                  </h3>
                                <div><strong>Date: {this.state.selectedPlace.date} Time: {this.state.selectedPlace.start} -  {this.state.selectedPlace.end}</strong></div> 
                        <div><strong>Adress: {this.state.selectedPlace.location}</strong></div>
                        <div><strong>Description: {this.state.selectedPlace.description}</strong></div>
                        {/* <a href={this.state.selectedPlace.url}>URL: {this.state.selectedPlace.url}</a> */}
                    </div>
                    </div>
                </InfoWindow>
            </Map>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);
