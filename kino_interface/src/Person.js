import React, {Component} from 'react'
import axios from 'axios'
import Articleitem from './articleItem'
import Filmitem from './filmItem'
const images = require.context('./imgs/persons')

export default class Person extends Component{
    constructor(){
        super()
        this.state = {
            person: {
                id:1,
                films:[],
                articles:[]
            }
        }
    }

    componentDidMount = () =>{
        let id=this.props.match.params.id
        axios.get('/persons/'+id).then(res => {
            console.log(res)
            this.setState({
                person:res.data
            })
            console.log(this.state.person)
        });
    }

    render(){
        let image = images('./'+this.state.person.id+'.jpg')
        return(
        <div>
            <h2>{this.state.person.name}</h2>
            <img src={image} alt="img" id="film"></img>
            <hr/>
            <h4><label>Birth Date: {this.state.person.birthdate}</label></h4><hr/>
            <h4>Films</h4>
            <ul>
                {this.state.person.films.map(film => (
                    <li className="IShell"><Filmitem film={film}/></li>
                ))}
            </ul><hr/>
            <h4>Articles</h4>
            <ul>
                {this.state.person.articles.map(article => (
                    <li className="IShell"><Articleitem article={article}/></li>
                ))}
            </ul><hr/>
        </div>
        )
    }
}