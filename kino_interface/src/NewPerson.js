import React, {Component} from 'react'
import axios from 'axios'


export default class NewPerson extends Component{
    constructor(){
        super()
        this.state = {
            name:"",
            birthdate:"",
        }
    }

    _onNameChange = (ev) =>{
        this.setState({
            name:ev.target.value
        })
    }

    _onYearChange = (ev) =>{
        this.setState({
            birthdate:ev.target.value
        })
    }

    async _post(ev){
        ev.preventDefault()
        this.state.birthdate=this.state.birthdate.split("-").reverse().join(".")
        axios.post("/newperson", this.state).then(res => console.log(res))
        console.log(this.state)
    }

    render(){
        return(
        <div>
            New Person 
            <form onSubmit={this._post.bind(this)}>
                <input type="text" name="name" id="name" onChange={this._onNameChange}/><br/>
                <input type="date" name="year" id="year" onChange={this._onYearChange}/><br/>
                <button type="submit">Submit</button><br/>
            </form>
        </div>
        )
    }
}