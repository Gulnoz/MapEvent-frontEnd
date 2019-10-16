import React from 'react';
import FavoritEvent from './FavoritEvent'


export default class FavoritEventList extends React.Component {

    eventHendler = () => {
        console.log("FavoritList")
        console.log(this.props.favorits)
        // console.log(this.props.favorits[0].name)
         return this.props.favorits.map(favorit => <FavoritEvent key={favorit.id} favorit={favorit} />)
    }

    render() {
        return (
            <div>
            <h2>Favorit events:</h2>
                <ol class="favorit-content-div">{this.eventHendler()}</ol> 
            
            </div>

        )
    }

}


