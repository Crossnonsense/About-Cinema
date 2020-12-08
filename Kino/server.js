const express = require('express')
const session = require('express-session')
//const connect = require('connect')
const cookieParser = require('cookie-parser')
const app = express()
//Data Base
const user = require('./user')
const person = require('./person')
const article = require('./article')
const film = require('./film')
const selects = require('./selects')

const bodyParser = require('body-parser')
app.use(session({
    secret: 'blargadeeblargblarg',
    resave:false,
    saveUninitialized:true
  }));
//const urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json())

app.listen(5000, function(){
    console.log('server started')
})

app.get('/', async function(req,res){
    res.send("Hello World")
})

app.get('/films', async function(req, res){
    let films = await selects.AllFilms()
    res.send(films)
})

app.get('/users', async function(req, res){
    let users = await selects.AllUsers()
    res.send(users)
})

app.get('/persons', async function(req, res){
    let persons = await selects.AllPersons()
    res.send(persons)
})

app.get('/articles', async function(req, res){
    let articles = await selects.AllArticles()
    res.send(articles)
})

app.get('/users/:id', async function(req, res){
    let u = new user
    let id = req.params.id
    await u.findById(id)
    res.send(u)
})

app.get('/films/:id', async function(req, res){
    let f = new film
    let id = req.params.id
    await f.findById(id)
    res.send(f)
})

app.get('/persons/:id', async function(req, res){
    let p = new person
    let id = req.params.id
    await p.findById(id)
    res.send(p)
})

app.get('/articles/:id', async function(req, res){
    let a = new article
    let id = req.params.id
    await a.findById(id)
    res.send(a)
})

app.post('/editfilm', async function(req, res){
    let f = new film
    await f.findById(req.body.id)
    f.name = req.body.name
    f.year = Number.parseInt(req.body.year)
    f.description = req.body.description
    f.actors = req.body.actors
    f.directors = req.body.directors
    f.scriptWriters = req.body.scriptWriters
    f.producers = req.body.producers
    await f.update()
    console.log(f)
})

app.post('/editarticle', async function(req, res){
    let a = new article
    await a.findById(req.body.id)
    a.name=req.body.name
    a.author=req.body.author
    a.text=req.body.text
    a.persons=req.body.persons
    a.films=req.body.films
    await a.update()
    console.log(a)
})

app.post('/newfilm',  async function(req,res){
    let f = new film
    f.name = req.body.name
    f.year = Number.parseInt(req.body.year)
    f.description = req.body.description
    f.actors = req.body.actors
    f.directors = req.body.directors
    f.scriptWriters = req.body.scriptWriters
    f.producers = req.body.producers
    await f.save()
    console.log(f)
})

app.post('/newperson',  async function(req,res){
    let p = new person
    p.name=req.body.name
    p.birthdate=req.body.birthdate
    await p.save()
    console.log(p)
})

app.post('/newarticle',  async function(req,res){
    let a = new article
    a.name=req.body.name
    a.author=req.body.author
    a.text=req.body.text
    a.persons=req.body.persons
    a.films=req.body.films
    await a.save()
    console.log(a)
})

app.post('/newuser',  async function(req,res){
    let u = new user
    u.login=req.body.login
    u.name=req.body.name
    u.password=req.body.password
    await u.save()
    await u.findBylogin(req.body.login)
    res.send(u)
    req.session.user = u.id
    req.session.save()
    console.log(u)
})

app.get('/currentuser', async function(req,res){
    if (req.session.user!=undefined) {
        let u = new user
        await u.findById(req.session.user)
        res.send(u)
    } else {
        let user = {id:0, login:'',admin:false}
        res.send(user)
    }
})

app.post('/login',  async function(req,res){
    let u = new user
    if (await u.findBylogin(req.body.login)==0) {
        if ((u.login==req.body.login)&&(u.password==req.body.password)) {
            u.password=''
            res.send(u)
            req.session.user = u.id
            req.session.save()
            return true
        }else{
            res.send(false)
        }
        
    } else {
        res.send(false)
    }
    console.log(req.body)
})

app.get('/logout',  async function(req,res){
    let user = {id:0, login:'',admin:false}
    let temp
    req.session.user=temp
    req.session.save()
    res.send(user)
})