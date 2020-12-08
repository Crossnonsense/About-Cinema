import React, {Component} from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

export default class Filmitem extends Component{
    constructor(props){
        super()
        this.state = {
            id:props.film.id,
            name:props.film.name,
            year:props.film.year
        }
    }


    render(){
        return(
        <div>
            <Link to={`/films/${this.state.id}`}>{this.state.name}</Link>            
        </div>
        )
    }
}