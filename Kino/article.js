const mysql = require("mysql2/promise");

const config = {
    host: "localhost",
    user: "Georgiy",
    database: "kino",
    password: "f(12)=479001599"
}

class article{
    id;
    name;
    text;
    author;
    persons=[];
    films=[];

    async findById(id){
        const connection = mysql.createPool(config);
        const [results, fields] = await connection.execute('select * from articles where id = ?',[id])
        if(results.length==1){
            this.id=results[0].id
            this.name=results[0].name
            this.text=results[0].text
            this.author=results[0].author
            const [persons, fields] = await connection.execute('select * from article_to_person, persons where article_id = ? and persons.id=person_id',[id]) 
            persons.forEach(person => {
                let temp = {}
                temp['id']=person.id
                temp['name']=person.name
                this.persons.push(temp)})
            const [films, field] = await connection.execute('select * from film_to_articles, film where article_id = ? and film_id=film.id',[id]) 
            films.forEach(film => {
                let temp = {}
                temp['id']=film.id
                temp['name']=film.name
                this.films.push(temp)})
            connection.end()
        }
    }

    async save(){
        const connection = mysql.createPool(config);
        const sql = "INSERT INTO articles(name, text, author) VALUES(?, ?, ?)"
        await connection.query(sql, [this.name, this.text, this.author], function(err, results) {
            if(err) console.log(err);
            else console.log("Данные добавлены");
        });

        const [res, fields] = await connection.execute('select * from articles where name = ? and author = ?',[this.name, this.author])
        this.id=res[0].id

        if(this.persons.length>=1){
            const sql1 = "INSERT INTO article_to_person(article_id, person_id) VALUES(?, ?)"
            for (let i=0; i<this.persons.length;i++){
                await connection.query(sql1, [this.id, this.persons[i].id], function(err, results) {
                    if(err) console.log(err);
                    else console.log("Данные добавлены");
                });
            }
        }

        if(this.persons.length>=1){
            const sql1 = "INSERT INTO film_to_articles(article_id, film_id) VALUES(?, ?)"
            for (let i=0; i<this.films.length;i++){
                await connection.query(sql1, [this.id, this.films[i].id], function(err, results) {
                    if(err) console.log(err);
                    else console.log("Данные добавлены");
                });
            }
        }

        
        connection.end()
    }

    async update(){
        const connection = mysql.createPool(config); 

        const sql="UPDATE articles set name=?, text=? where id=?"

        await connection.query(sql, [this.name, this.text, this.id], function(err, results) {
            if(err) console.log(err);
            else console.log("Данные добавлены");
        });

        await connection.query("DELETE FROM film_to_articles where article_id=?",[this.id])
        await connection.query("DELETE FROM article_to_person where article_id=?",[this.id])

        if(this.films.length>=1){
            const sql1 = "INSERT INTO film_to_articles(film_id, article_id) VALUES(?, ?)"
            for (let i=0; i<this.films.length;i++){
                await connection.query(sql1, [this.films[i].id, this.id], function(err, results) {
                    if(err) console.log(err);
                    else console.log("Данные добавлены");
                });
            }
        }

        if(this.persons.length>=1){
            const sql1 = "INSERT INTO article_to_person(article_id, person_id) VALUES(?, ?)"
            for (let i=0; i<this.persons.length;i++){
                await connection.query(sql1, [this.id, this.persons[i].id], function(err, results) {
                    if(err) console.log(err);
                    else console.log("Данные добавлены");
                });
            }
        }

        connection.end()
    }
}
module.exports = article

async function main(){  
    
}

main()