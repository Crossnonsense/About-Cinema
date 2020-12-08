import React, {Component} from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

export default class Filmitem extends Component{
    constructor(props){
        super()
        this.state = {
            id:props.person.id,
            name:props.person.name,
        }
    }

    render(){
        return(
        <div id="personItem">
            <Link to={`/persons/${this.state.id}`}>{this.state.name}</Link>            
        </div>
        )
    }
}