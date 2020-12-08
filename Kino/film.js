const mysql = require("mysql2/promise");

const config = {
    host: "localhost",
    user: "Georgiy",
    database: "kino",
    password: "f(12)=479001599"
}

class film{
    id;
    name;
    year;
    description;
    actors=[];
    scriptWriters=[];
    directors=[];
    producers=[];
    articles=[];

    async findById(id){
        const connection = mysql.createPool(config);
        const [results, fields] = await connection.execute('select * from film where id = ?',[id])
        if(results.length==1){
            this.id=results[0].id
            this.name=results[0].name 
            this.year=results[0].year
            this.description=results[0].description
            const [actors, fields] = await connection.execute('select * from film_to_actor, persons where film_id = ? and actor_id=persons.id',[id]) 
            actors.forEach((actor) => {
                let temp = {}
                temp['name']=actor.name
                temp['id']=actor.id
                this.actors.push(temp)})
            const [directors, field] = await connection.execute('select * from film_to_director, persons where film_id = ? and director_id=persons.id',[id]) 
            directors.forEach(director => {
                let temp = {}
                temp['name']=director.name
                temp['id']=director.id
                this.directors.push(temp)})
            const [scripters, fiel] = await connection.execute('select * from film_to_scriptwriter, persons where film_id = ? and writer_id=persons.id',[id]) 
            scripters.forEach(scripter => {
                let temp = {}
                temp['name']=scripter.name
                temp['id']=scripter.id
                this.scriptWriters.push(temp)})
            const [producers, fie] = await connection.execute('select * from film_to_producer, persons where film_id = ? and producer_id=persons.id',[id]) 
            producers.forEach(producer => {
                let temp = {}
                temp['name']=producer.name
                temp['id']=producer.id
                this.producers.push(temp)})
            const [articles, fi] = await connection.execute('select * from film_to_articles, articles where film_id = ? and article_id=articles.id',[id]) 
            articles.forEach(article => {
                let temp = {}
                temp['name']=article.name
                temp['id']=article.id
                this.articles.push(temp)})
            connection.end()
        }
    }

    async save(){
        const connection = mysql.createPool(config);
        const sql = "INSERT INTO film(name, year, description) VALUES(?, ?, ?)"
        await connection.query(sql, [this.name, this.year, this.description], function(err, results) {
            if(err) console.log(err);
            else console.log("Данные добавлены");
        });

        const [res, fields] = await connection.execute('select * from film where name = ? and description = ?',[this.name, this.description])
        this.id=res[0].id

        if(this.actors.length>=1){
            const sql1 = "INSERT INTO film_to_actor(film_id, actor_id) VALUES(?, ?)"
            for (let i=0; i<this.actors.length;i++){
                await connection.query(sql1, [this.id, this.actors[i].id], function(err, results) {
                    if(err) console.log(err);
                    else console.log("Данные добавлены");
                });
            }
        }

        if(this.directors.length>=1){
            const sql1 = "INSERT INTO film_to_director(film_id, director_id) VALUES(?, ?)"
            for (let i=0; i<this.directors.length;i++){
                await connection.query(sql1, [this.id, this.directors[i]['id']], function(err, results) {
                    if(err) console.log(err);
                    else console.log("Данные добавлены");
                });
            }
        }

        if(this.scriptWriters.length>=1){
            const sql1 = "INSERT INTO film_to_scriptwriter(film_id, writer_id) VALUES(?, ?)"
            for (let i=0; i<this.scriptWriters.length;i++){
                await connection.query(sql1, [this.id, this.scriptWriters[i].id], function(err, results) {
                    if(err) console.log(err);
                    else console.log("Данные добавлены");
                });
            }
        }

        if(this.producers.length>=1){
            const sql1 = "INSERT INTO film_to_producer(film_id, producer_id) VALUES(?, ?)"
            for (let i=0; i<this.producers.length;i++){
                await connection.query(sql1, [this.id, this.producers[i].id], function(err, results) {
                    if(err) console.log(err);
                    else console.log("Данные добавлены");
                });
            }
        }
        connection.end()
    }

    async update(){
        const connection = mysql.createPool(config);
        const sql="UPDATE film set name=?, description=?, year=? where id=?"

        await connection.query(sql, [this.name, this.description, this.year, this.id], function(err, results) {
            if(err) console.log(err);
            else console.log("Данные добавлены");
        });

        await connection.query("DELETE FROM film_to_actor where film_id=?",[this.id])
        await connection.query("DELETE FROM film_to_director where film_id=?",[this.id])
        await connection.query("DELETE FROM film_to_producer where film_id=?",[this.id])
        await connection.query("DELETE FROM film_to_scriptwriter where film_id=?",[this.id])

        if(this.actors.length>=1){
            const sql1 = "INSERT INTO film_to_actor(film_id, actor_id) VALUES(?, ?)"
            for (let i=0; i<this.actors.length;i++){
                await connection.query(sql1, [this.id, this.actors[i].id], function(err, results) {
                    if(err) console.log(err);
                    else console.log("Данные добавлены");
                });
            }
        }

        if(this.directors.length>=1){
            const sql1 = "INSERT INTO film_to_director(film_id, director_id) VALUES(?, ?)"
            for (let i=0; i<this.directors.length;i++){
                await connection.query(sql1, [this.id, this.directors[i].id], function(err, results) {
                    if(err) console.log(err);
                    else console.log("Данные добавлены");
                });
            }
        }

        if(this.scriptWriters.length>=1){
            const sql1 = "INSERT INTO film_to_scriptwriter(film_id, writer_id) VALUES(?, ?)"
            for (let i=0; i<this.scriptWriters.length;i++){
                await connection.query(sql1, [this.id, this.scriptWriters[i].id], function(err, results) {
                    if(err) console.log(err);
                    else console.log("Данные добавлены");
                });
            }
        }

        if(this.producers.length>=1){
            const sql1 = "INSERT INTO film_to_producer(film_id, producer_id) VALUES(?, ?)"
            for (let i=0; i<this.producers.length;i++){
                await connection.query(sql1, [this.id, this.producers[i].id], function(err, results) {
                    if(err) console.log(err);
                    else console.log("Данные добавлены");
                });
            }
        }
        connection.end()
    }
}

module.exports = film

async function main(){
    
}

main()