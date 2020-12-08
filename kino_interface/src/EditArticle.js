import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom';

export default class EditArtile extends Component{
    constructor(){
        super()
        this.state = {
            id:0,
            author:0,
            name:"",
            text:"",
            persons:[],
            films:[],
            AllPersons:[],
            AllFilms:[],
            redirect:false
        }
    }

    async componentDidMount() {
        //let id=this.props.match.params.id
        await axios.get('/persons/').then(res => {
            console.log(res)
            this.setState({
                AllPersons:res.data
            })
        });

        await this.setState({
            id:this.props.article.id,
            author:this.props.article.author,
            name:this.props.article.name,
            films:this.props.article.films,
            persons:this.props.article.persons,
            text:this.props.article.text,
        })

        await axios.get('/films/').then(res => {
            console.log(res)
            this.setState({
                AllFilms:res.data
            })
        });
        console.log(this.state)
        
    }

    _onNameChange = (ev) =>{
        this.setState({
            name:ev.target.value
        })
    }

    _onTextChange = (ev) =>{
        this.setState({
            text:ev.target.value
        })
    }

    _onPersonAdd = (ev) =>{
        ev.preventDefault()
        let person = {}
        person.id=Number.parseInt(this.refs.persons.value)
        this.state.AllPersons.map((Aperson) =>{
            if (Aperson.id==person.id) {
                person.name=Aperson.name
            }
        })

        for (let index = 0; index < this.state.persons.length; index++) {
            if (this.state.persons[index].id==person.id) {
                return
            }
            
        }
        this.state.persons.push(person)
        let arr = this.state.persons
        this.setState({
            persons:arr
        })
        console.log(this.state.persons)
        this.refs.persons.value=""
    }

    _onFilmAdd = (ev) =>{
        ev.preventDefault()
        let film = {}
        film.id=Number.parseInt(this.refs.films.value)
        this.state.AllFilms.map((Afilm) =>{
            if (Afilm.id==film.id) {
                film.name=Afilm.name
            }
        })

        for (let index = 0; index < this.state.films.length; index++) {
            if (this.state.films[index].id==film.id) {
                return
            }
            
        }
        this.state.films.push(film)
        let arr = this.state.films
        this.setState({
            films:arr
        })
        console.log(this.state.films)
        this.refs.films.value=""
    }

    _DeletePerson = (event) =>{
        event.preventDefault()
        let id= event.target.id
        this.setState(prevState => ({
            persons: prevState.persons.filter(person => person.id != id)
          }));
    }

    _DeleteFilm = (event) =>{
        event.preventDefault()
        let id= event.target.id
        this.setState(prevState => ({
            films: prevState.films.filter(film => film.id != id)
          }));
    }

    async _post(ev){
        ev.preventDefault()
        const data = await {
            id:this.state.id,
            name: this.state.name,
            author: this.state.author,
            text: this.state.text,
            persons: this.state.persons,
            films:this.state.films,
        }
        console.log(data)
        axios.post("/editarticle", data).then(res => console.log(res))
        this.refs.name.value=""
        this.refs.text.value=""
        this.setState({
            persons:[],
            films:[],
            redirect:true
        })
    }

    render(){
        return(
        <div>
            Edit Article
            <form onSubmit={this._post.bind(this)}>
                <input type="text" name="name" id="name" value={this.state.name} ref="name" onChange={this._onNameChange.bind(this)}/><br/>
                <textarea id="text" name="text" ref="text" value={this.state.text} rows="10" cols="100" onChange={this._onTextChange.bind(this)}> </textarea><br/>
                <input list="persons" ref="persons"/>
                <datalist id="persons">
                    {this.state.AllPersons.map((person) =>
                        <option value={person.id} >{person.name}</option>
                    )}
                </datalist>
                <button onClick={this._onPersonAdd}>Add person</button><br/>
                <ul id="persons-list">
                {this.state.persons.map(person =>{
                    return <li key={person.id}>{person.name} <button id ={person.id} onClick={this._DeletePerson}>Delete</button></li>
                })}
                </ul><br/>

                <input list="films" ref="films"/>
                <datalist id="films">
                    {this.state.AllFilms.map((film) =>
                        <option value={film.id} >{film.name}</option>
                    )}
                </datalist>
                <button onClick={this._onFilmAdd}>Add film</button><br/>
                <ul id="films-list">
                {this.state.films.map(film =>{
                    return <li key={film.id}>{film.name} <button id ={film.id} onClick={this._DeleteFilm}>Delete</button></li>
                })}
                </ul><br/>

                <button type="submit">Submit</button><br/>
            </form>
            {this.state.redirect && <Redirect to={"/articles/"+this.state.id}/>}
        </div>
        )
    }
}