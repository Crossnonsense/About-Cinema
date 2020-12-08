import React, {Component} from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import EditArticle from './EditArticle'
import Filmitem from './filmItem'
import Personitem from './PersonItem'

export default class Article extends Component{
    constructor(){
        super()
        this.state = {
            article: {
                author:0,
                persons:[],
                films:[]
            },
            currentUser:{id:0}
        }
    }

    componentDidMount = () =>{
        let id=this.props.match.params.id
        axios.get('/articles/'+id).then(res => {
            console.log(res)
            this.setState({
                article:res.data
            })
        });
        this.setState({
            currentUser:this.props.currentUser
        })
    }

    render(){
        return(
        <div>
            <h2>{this.state.article.name}</h2><hr/>
            <p>{this.state.article.text}</p><hr/>
            <h4>Films</h4>
            <ul>
                {this.state.article.films.map(film => (
                    <li className="IShell"><Filmitem film={film}/></li>
                ))}
            </ul><hr/>
            <h4>Persons</h4>
            <ul>
                {this.state.article.persons.map(person => (
                    <li className="IShell"><Personitem person={person}/></li>
                ))}
            </ul><hr/>
            {(this.state.currentUser.id==this.state.article.author) && (
            <Router>
                <Link to="/editarticle" className="IShell">Edit this article</Link>
                <Switch>
                    <Route exact path="/editarticle"><EditArticle article={this.state.article}/></Route>
                </Switch>
            </Router>
        )}
        </div>

        )
    }
}