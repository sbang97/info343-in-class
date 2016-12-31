import React from "react";

const BASEURL = "http://image.tmdb.org/t/p/";
const DEFAULTSIZE = "w154";
export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            // this div acts as a root element, every React component needs a root component
            <div>
                <img src={BASEURL + DEFAULTSIZE + this.props.movie.poster_path}></img>
                <h2>{this.props.movie.title}</h2>
                <p>{this.props.movie.overview}</p>
            </div>
        );
    }
}