import React from 'react';

export default class FavoritEvent extends React.Component {
    render() {
        return (
            <li onClick={() => { this.props.popUpFavoriteHendler(this.props.favorit)}}>
            <strong>
                {this.props.favorit.name}
            </strong>
            </li>

        )
    }

}
