import React, {Component} from 'react'
import axios from 'axios'
import Filmitem from './filmItem'

export default class Films extends Component{
    constructor(){
        super()
        this.state = {
            films: []
        }
    }

    componentDidMount = () =>{
        axios.get('/films').then(res => {
            console.log(res)
            this.setState({
                films:res.data
            })
        });
    }

    render(){
        return(
        <div>
            <h1>Films</h1>
            <ul>
                {this.state.films.map(film => (
                    <li><div className="ItemShell"><Filmitem film={film}/></div></li>
                ))}
            </ul>
        </div>
        )
    }
}