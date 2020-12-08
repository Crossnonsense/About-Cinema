const mysql = require("mysql2/promise");

const config = {
    host: "localhost",
    user: "Georgiy",
    database: "kino",
    password: "f(12)=479001599"
}

class person{
    id;
    name;
    birthdate;
    films=[];
    articles=[];

    async findById(id){
        const connection = mysql.createPool(config);
        const [results, fields] = await connection.execute('select * from persons where id = ?',[id])
        if(results.length==1){
            this.id=results[0].id
            this.name=results[0].name
            this.birthdate=results[0].birthdate
            const [articles, fields1] = await connection.execute('select * from article_to_person, articles where person_id = ? and articles.id=article_id',[id]) 
            articles.forEach(article => {
                let temp = {}
                temp['id']=article.article_id
                temp['name']=article.name
                this.articles.push(temp)})
            const [actors, fields] = await connection.execute('select * from film_to_actor, film where actor_id = ? and film.id=film_id',[id]) 
            actors.forEach(actor => {
                let temp = {}
                temp['id']=actor.film_id
                temp['name']=actor.name
                this.films.push(temp)})
            const [directors, field] = await connection.execute('select * from film_to_director, film where director_id = ? and film.id=film_id',[id]) 
            directors.forEach(director => {
                let temp = {}
                temp['id']=director.film_id
                temp['name']=director.name
                this.films.push(temp)})
            const [scripters, fiel] = await connection.execute('select * from film_to_scriptwriter, film where writer_id = ? and film.id=film_id',[id]) 
            scripters.forEach(scripter => {
                let temp = {}
                temp['id']=scripter.film_id
                temp['name']=scripter.name
                this.films.push(temp)})
            const [producers, fie] = await connection.execute('select * from film_to_producer, film where producer_id = ? and film.id=film_id',[id]) 
            producers.forEach(producer => {
                let temp = {}
                temp['id']=producer.film_id
                temp['name']=producer.name
                this.films.push(temp)})
            let distinct=[]
            let l=this.films.length
            let flags=[]
            let i=0
            for(i;i<l;i++){
                if(flags[this.films[i].id]) continue
                flags[this.films[i].id]=true
                distinct.push(this.films[i])
            }
            this.films=distinct
            connection.end()
        }
    }

    async save(){
        const connection = mysql.createPool(config);
        const sql = "INSERT INTO persons(name, birthdate) VALUES(?, ?)"
        await connection.query(sql, [this.name, this.birthdate], function(err, results) {
            if(err) console.log(err);
            else console.log("Данные добавлены");
        });

        connection.end()
    }

    async update(){
        const connection = mysql.createPool(config);
        const sql="UPDATE persons set name=?, birthdate=? where id=?"

        await connection.query(sql, [this.name, this.birthdate, this.id], function(err, results) {
            if(err) console.log(err);
            else console.log("Данные добавлены");
        });

        connection.end()
    }
}

module.exports = person

async function main(){
    
}
main()