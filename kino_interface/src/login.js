import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom';

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            login:'',
            password:'',
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
    

    async _post(ev){
        ev.preventDefault()
        let response
        await axios.post("/login", this.state).then(res => response=res.data)
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
        const { redirect } = this.state.redirect
        return(
        <div>
            Log in
            <form onSubmit={this._post.bind(this)}>
                <input type="text" name="login" id="login" onChange={this._onLoginChange}/><br/>
                <input type="password" name="password" id="password" onChange={this._onPasswordChange}/><br/>
                <button type="submit">Submit</button><br/>
            </form>
            {this.state.redirect && <Redirect to="/"/>}
        </div>
        )
    }
}