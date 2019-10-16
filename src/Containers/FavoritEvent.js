import React from 'react';


export default class FavoritEvent extends React.Component {



    render() {
        console.log(this.props.favorit.name)
        return (
            <li><strong>
                {this.props.favorit.name.text}
            </strong>
            </li>

        )
    }

}