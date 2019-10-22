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
            case "103":   //music
                return Music 
            case "110":   //food
                return foodIcon 
           case "101":    //bisseness
                return bussiness 
            case "113":   //community
                return community 
            case "105":  //art
                return art 
            //     break;
            case "104":   //film
                { return film }
            //     break;
            case "108":   //sport
                { return sport }
            //     break;
            case "107":  //Health
                { return sport }
            //     break;
            case "102":   //Science
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
        const button = (<button style={{ background: "rgba(255, 255, 255, .1)", fontSize: "calc(5px + 2vmin)", border: "none"}}onClick={e => { this.props.addFavoritEvent(e, this.state.selectedPlace.eventObj) }}><span>❤️</span></button>);
        ReactDOM.render(React.Children.only(button), document.getElementById("iwc"));
    }

    displayMarkers = () => {
        //console.log(this.props.events)
        
        return this.props.events.map((oneEvent, index ) => {
            console.log(oneEvent)
            return <Marker 
                key={oneEvent.id}
                id={oneEvent.id}
                eventObj={oneEvent}
                position={{
                lat: oneEvent.venue.address.latitude,
                lng: oneEvent.venue.address.longitude
                }}
                onClick={this.infoWindowHendler}
                name={oneEvent.name.text}
                description={oneEvent.description.text}
                location={oneEvent.venue.address.localized_multi_line_address_display}
                date={oneEvent.start.local.slice(0,10)}
                start={oneEvent.start.local.slice(11,16)}
                end={oneEvent.end.local.slice(11, 16)}
                url={oneEvent.url}
                // icon={this.markerIconHendler(oneEvent.category_id)}
            />
            })
    }

    render() {
        // console.log(this.state.selectedPlace)
        
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
                    onOpen={e => this.props.currentUser ? this.onInfoWindowOpen(this.props, e) : null}
                >
                        <div style={{ padding:"20px", backgroundImage: "url(https://www.designbolts.com/wp-content/uploads/2013/02/Free-Tileable-Wood-Textures-Patterns-For-3D-Mapping.jpg)"}}>
                        <h3>{this.state.selectedPlace.name} <span id="iwc"/></h3>
                        <div><strong>Date:</strong> {this.state.selectedPlace.date} <strong>Time:</strong> {this.state.selectedPlace.start} -  {this.state.selectedPlace.end}</div>
                        <div><strong>Adress:</strong> {this.state.selectedPlace.location}</div>
                        <div><strong>Description: </strong>{this.state.selectedPlace.description}</div>
                        <a href={this.state.selectedPlace.url}>URL: {this.state.selectedPlace.url}</a>
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
