import React from 'react';
import FavoritEvent from './FavoritEvent'
import { Button } from "semantic-ui-react"

export default class FavoritEventList extends React.Component {

    eventHendler = () => {
        return this.props.favorits.map(favorit => <FavoritEvent key={favorit.id} favorit={favorit} popUpFavoriteHendler={this.props.popUpFavoriteHendler}/>)
    }

    render() {
        return (
            <div>  
            <h2 style={{color:"white"}}>{this.props.caption}</h2>
                <ol class="favorit-content-div">{this.eventHendler()}</ol> 
            </div>
     )}
}


