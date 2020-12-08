import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom';

export default class Signup extends Component{
    constructor(props){
        super(props)
        this.state = {
            login:'',
            password:'',
            name:'',
            redirect:false
        }
    }

    _onLoginChange = (ev) =>{
        this.setState({
            login:ev.target.value
        })
    }

    _onPasswordChange = (ev) =>{
        this.setState({
            password:ev.target.value
        })
    }

    _onNameChange = (ev) =>{
        this.setState({
            name:ev.target.value
        })
    }
    

    async _post(ev){
        ev.preventDefault()
        let AllUsers = []
        await axios.get('/users').then(res => {
            AllUsers = res.data
        });
        if (this.state.login=="") {
            alert("Ypu didn't input your login")
            return
        }
        if (this.state.password=="") {
            alert("Ypu didn't input your password")
            return
        }
        if (this.state.name=="") {
            alert("Ypu didn't input your name")
            return
        }
        for (let index = 0; index < AllUsers.length; index++) {
            if (AllUsers[index].login==this.state.login) {
                alert("User with this login already exists")
                return
            }
            
        }
        console.log(AllUsers)
        let response
        await axios.post("/newuser", this.state).then(res => response=res.data)
        if (response) {
            console.log(response)
            this.props.onChange(response)
            this.setState({
                redirect:true
            })
        }else{
            console.log("false")
        }
    }

    

    render(){
        return(
        <div>
            Sign Up
            <form onSubmit={this._post.bind(this)}>
                <input type="text" name="login" id="login" onChange={this._onLoginChange}/><br/>
                <input type="text" name="name" id="name" onChange={this._onNameChange}/><br/>
                <input type="password" name="password" id="password" onChange={this._onPasswordChange}/><br/>
                <button type="submit">Submit</button><br/>
            </form>
            {this.state.redirect && <Redirect to="/"/>}
        </div>
        )
    }
}