import React, {Component} from 'react'
import axios from 'axios'
import Articleitem from './articleItem'

export default class Articles extends Component{
    constructor(){
        super()
        this.state = {
            articles: []
        }
    }

    componentDidMount = () =>{
        axios.get('/articles').then(res => {
            console.log(res)
            this.setState({
                articles:res.data
            })
        });
    }

    render(){
        return(
        <div>
            <h1>Articles</h1>
            <ul>
                {this.state.articles.map(article => (
                    <li><div className="ItemShell"><Articleitem article={article}/></div></li>
                ))}
            </ul>
        </div>
        )
    }
}