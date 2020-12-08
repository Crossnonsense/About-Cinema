import React, {Component} from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import EditFilm from './EditFilm'
import Personitem from './PersonItem'
import Articleitem from './articleItem'
//import './App.css'
const images = require.context('./imgs/films')

export default class Film extends Component{
    constructor(){
        super()
        this.state = {
            film: {
                id:1,
                actors:[],
                scriptWriters:[],
                directors:[],
                producers:[],
                articles:[]
            },
            currentUser:{id:0},
            redirect:false
        }
    }

    componentDidMount = () =>{
        let id=this.props.match.params.id
        axios.get('/films/'+id).then(res => {
            console.log(res)
            this.setState({
                film:res.data
            })
            console.log(this.state.film)
            this.setState({
                currentUser:this.props.currentUser
            })
        });
    }

    render(){
        let image = images('./'+this.state.film.id+'.jpg')
        return(
        <div><h2> {this.state.film.name} ({this.state.film.year})</h2>
        <img src={image} alt="img" id="film"></img>
        <hr/>
        <h4>description: </h4><p>{this.state.film.description}</p><hr/>
        <h4>Directors: </h4>
        <ul>
                {this.state.film.directors.map(person => (
                    <li className="IShell"><Personitem person={person}/></li>
                ))}
        </ul>
        <h4>Actors: </h4>
        <ul>
                {this.state.film.actors.map(person => (
                    <li className="IShell"><Personitem person={person}/></li>
                ))}
        </ul>
        <h4>Scriptwriters: </h4>
        <ul>
                {this.state.film.scriptWriters.map(person => (
                    <li className="IShell"><Personitem person={person}/></li>
                ))}
        </ul>
        <h4>Producers: </h4>
        <ul>
                {this.state.film.producers.map(person => (
                    <li className="IShell"><Personitem person={person}/></li>
                ))}
        </ul><hr/>
        <h4>Articles</h4>
        <ul>
                {this.state.film.articles.map(article => (
                    <li className="IShell"><Articleitem article={article}/></li>
                ))}
        </ul><hr/>
        {this.state.currentUser.admin && (
            <Router>
                <Link to="/editfilm" className="IShell">Edit this film</Link>
                <Switch>
                    <Route exact path="/editfilm"><EditFilm film={this.state.film}/></Route>
                </Switch>
            </Router>
        )}
        </div>
        
        )
    }
}