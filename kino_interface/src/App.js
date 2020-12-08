import React, {Component} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import Film from './film';
import Articles from './Articles'
import Films from './Films'
import Login from './login'
import Article from './Article'
import NewFilm from './NewFilm'
import Person from './Person';
import NewPerson from './NewPerson'
import NewArticle from './NewArticle'
import Signup from './NewUser'
import './App.css'
import EditFilm from './EditFilm'
import EditArticle from './EditArticle'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';



export default class App extends Component {  
  constructor(){
    super()
    this.state = {
        currentUser: {id:0,admin:false, login:''}
    }
    this.userChange = this.userChange.bind(this)
}

userChange(newOne){
  this.setState({currentUser:newOne})
  console.log(this.state.currentUser)
}

componentDidMount = () =>{
  axios.get('/currentuser').then(res => {
      console.log(res)
      this.setState({
          currentUser:res.data
      })
      //console.log(this.state.currentUser)
  });
}

logout = () =>{
  axios.get('/logout').then(res => {
    console.log(res)
    this.setState({
        currentUser:res.data
    })
    //console.log(this.state.currentUser)
});
}

render(){
  return (
    <div className="App">
      
      {(this.state.currentUser.id!=0) && <h4>Hello, {this.state.currentUser.login}</h4>}
      <Router><nav>
        <div className="LinkShell">
        <Link to="/">Articles</Link>
        </div>
        <div className="LinkShell">
        <Link to="/films">Films</Link></div>
        {(this.state.currentUser.id==0) ? (
          [<div className="LinkShell"><Link to="/login">Log in</Link></div>,
          <div className="LinkShell"><Link to="/signup">Sign up</Link></div>]
        ) :(
          <>{this.state.currentUser.admin ? (
            [
              <div className="LinkShell"><Link to="/NewFilm">New film</Link></div>,
              <div className="LinkShell"><Link to="/NewPerson">New person</Link></div>,
              <div className="LinkShell"><Link to="/NewArticle">New article</Link></div>,
              <button onClick={this.logout}>Log out</button>
            ]
          ):(
            [
              <Link to="/NewArticle">New article</Link>,
              <button  onClick={this.logout} id="Logout">Log out</button>
            ]
          )}</>
        )}
        </nav>
        <Switch>
          <Route exact path="/" ><Articles currentUser={this.state.currentUser}/></Route>
          <Route exact path="/films"><Films currentUser={this.state.currentUser}/></Route>
          <Route exact path="/login" ><Login onChange={this.userChange}/></Route>
          <Route exact path="/signup" ><Signup onChange={this.userChange}/></Route>
          <Route exact path="/NewFilm" component={NewFilm}></Route>
          <Route exact path="/NewPerson" component={NewPerson}></Route>
          <Route exact path="/NewArticle" ><NewArticle id={this.state.currentUser.id}/></Route>
          <Route exact path="/films/:id" render={(props)=><Film currentUser={this.state.currentUser} {...props}/>}></Route>
          <Route exact path="/persons/:id" component={Person}></Route>
          <Route exact path="/articles/:id" render={(props)=><Article currentUser={this.state.currentUser} {...props}/>}></Route>
        </Switch>
      </Router>
    </div>
  );}
}


