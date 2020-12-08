import React, {Component} from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

export default class Articleitem extends Component{
    constructor(props){
        super()
        this.state = {
            id:props.article.id,
            name:props.article.name,
        }
    }


    render(){
        return(
        <div>
            <Link to={`/articles/${this.state.id}`}>{this.state.name}</Link>
        </div>
        )
    }
}