import React, {Component} from 'react'
import axios from 'axios'
const ReactDOM = require('react-dom')


export default class NewFilm extends Component{
    constructor(){
        super()
        this.state = {
            persons: [],
            name:"",
            year:2020,
            description:"",
            actors:[],
            scriptWriters:[],
            directors:[],
            producers:[]
        }
    }

    componentDidMount = () =>{
        //let id=this.props.match.params.id
        axios.get('/persons/').then(res => {
            console.log(res)
            this.setState({
                persons:res.data
            })
        });
        
    }

    _onActorAdd = (ev) =>{
        ev.preventDefault()
        let actor={}
        actor.id=Number.parseInt(this.refs.actors.value)
        this.state.persons.map((person) =>{
            if (person.id==actor.id) {
                actor.name=person.name
            }
        })

        for (let index = 0; index < this.state.actors.length; index++) {
            if (this.state.actors[index].id==actor.id) {
                return
            }
            
        }
        this.state.actors.push(actor)
        let arr = this.state.actors
        this.setState({
            actor:arr
        })
        console.log(this.state.actors)
        this.refs.actors.value=""
    } 

    _onScripterAdd = (ev) =>{
        ev.preventDefault()
        let scripter = {}
        scripter.id=Number.parseInt(this.refs.scriptWriters.value)
        this.state.persons.map((person) =>{
            if (person.id==scripter.id) {
                scripter.name=person.name
            }
        })
        for (let index = 0; index < this.state.scriptWriters.length; index++) {
            if (this.state.scriptWriters[index].id==scripter.id) {
                return
            }
            
        }
        this.state.scriptWriters.push(scripter)
        let arr = this.state.scriptWriters
        this.setState({
            scriptWriters:arr
        })
        console.log(this.state.scriptWriters)
        this.refs.scriptWriters.value=""
    }

    _onDirectorAdd = (ev) =>{
        ev.preventDefault()
        let director = {}
        director.id=Number.parseInt(this.refs.directors.value)
        this.state.persons.map((person) =>{
            if (person.id==director.id) {
                director.name=person.name
            }
        })

        for (let index = 0; index < this.state.directors.length; index++) {
            if (this.state.directors[index].id==director.id) {
                return
            }
            
        }
        this.state.directors.push(director)
        let arr = this.state.directors
        this.setState({
            directors:arr
        })
        console.log(this.state.directors)
        this.refs.directors.value=""
    }

    _onProducerAdd = (ev) =>{
        ev.preventDefault()
        let producer = {}
        producer.id=Number.parseInt(this.refs.producers.value)
        this.state.persons.map((person) =>{
            if (person.id==producer.id) {
                producer.name=person.name
            }
        })

        for (let index = 0; index < this.state.producers.length; index++) {
            if (this.state.producers[index].id==producer.id) {
                return
            }
            
        }
        this.state.producers.push(producer)
        let arr = this.state.producers
        this.setState({
            producers:arr
        })
        console.log(this.state.producers)
        this.refs.producers.value=""
    }

    _onNameChange = (ev) =>{
        this.setState({
            name:ev.target.value
        })
    }

    _onYearChange = (ev) =>{
        this.setState({
            year:ev.target.value
        })
    }

    _onDescriptionChange = (ev) =>{
        this.setState({
            description:ev.target.value
        })
    }

    _DeleteActor = (event) =>{
        event.preventDefault()
        let id= event.target.id
        this.setState(prevState => ({
            actors: prevState.actors.filter(actor => actor.id != id)
          }));
    }

    _DeleteDirector = (event) =>{
        event.preventDefault()
        let id= event.target.id
        this.setState(prevState => ({
            directors: prevState.directors.filter(director => director.id != id)
          }));
    }

    _DeleteWriter = (event) =>{
        event.preventDefault()
        let id= event.target.id
        this.setState(prevState => ({
            scriptWriters: prevState.scriptWriters.filter(scripter => scripter.id != id)
          }));
    }

    _DeleteProducer = (event) =>{
        event.preventDefault()
        let id= event.target.id
        this.setState(prevState => ({
            producers: prevState.producers.filter(producer => producer.id != id)
          }));
    }

    async _post(ev){
        ev.preventDefault()
        const data = await {
            name: this.state.name,
            year: this.state.year,
            description: this.state.description,
            actors: this.state.actors,
            directors:this.state.directors,
            scriptWriters: this.state.scriptWriters,
            producers: this.state.producers
        }
        console.log(data)
        axios.post("/newfilm", data).then(res => console.log(res))
    }

    render(){
        return(
        <div>
            New Film 
            <form onSubmit={this._post.bind(this)}>
                <input type="text" name="name" id="name" placeholder="Name" onChange={this._onNameChange}/><br/>
                <input type="text" name="year" id="year" placeholder="Year" onChange={this._onYearChange}/><br/>
                <h5>Description:</h5>
                <textarea id="decription" name="decription" placeholder="Description" rows="5" cols="100" onChange={this._onDescriptionChange}> </textarea><br/>
                <input list="actors" ref="actors"/>
                <datalist id="actors">
                    {this.state.persons.map((actor) =>
                        <option value={actor.id} >{actor.name}</option>
                    )}
                </datalist>
                <button onClick={this._onActorAdd}>Add actor</button><br/>
                <ul id="actors-list">
                {this.state.actors.map(actor =>{
                    return <li key={actor.id} className="IShell">{actor.name} <button id ={actor.id}onClick={this._DeleteActor}>Delete</button></li>
                })}
                </ul><br/>

                <input list="scriptWriters" ref="scriptWriters"/>
                <datalist id="scriptWriters">
                    {this.state.persons.map((scripter) =>
                        <option value={scripter.id} >{scripter.name}</option>
                    )}
                </datalist>
                <button onClick={this._onScripterAdd}>Add scripter</button><br/>
                <ul id="scripters-list">
                    {this.state.scriptWriters.map(scripter =>{
                        return <li className="IShell">{scripter.name} <button id ={scripter.id}onClick={this._DeleteWriter}>Delete</button></li>
                    })}
                </ul><br/>

                <input list="directors" ref="directors"/>
                <datalist id="directors">
                    {this.state.persons.map((director) =>
                        <option value={director.id} >{director.name}</option>
                    )}
                </datalist>
                <button onClick={this._onDirectorAdd}>Add director</button><br/>
                <ul id="directors-list">
                    {this.state.directors.map(director =>{
                        return <li className="IShell">{director.name} <button id ={director.id}onClick={this._DeleteDirector}>Delete</button></li>
                    })}
                </ul><br/>

                <input list="producers" ref="producers"/>
                <datalist id="producers">
                    {this.state.persons.map((producer) =>
                        <option value={producer.id} >{producer.name}</option>
                    )}
                </datalist>
                <button onClick={this._onProducerAdd}>Add producer</button><br/>
                <ul id="producers-list">
                    {this.state.producers.map(producer =>{
                        return <li className="IShell">{producer.name} <button id ={producer.id}onClick={this._DeleteProducer}>Delete</button></li>
                    })}
                </ul><br/>

                <button type="submit">Submit</button><br/>
            </form>
        </div>
        )
    }
}