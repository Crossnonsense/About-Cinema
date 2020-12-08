const mysql = require("mysql2/promise");

const config = {
    host: "localhost",
    user: "Georgiy",
    database: "kino",
    password: "f(12)=479001599"
}

class user{
    id;
    name;
    login;
    password;
    articles=[];
    recomended=[];
    scores=[];
    admin;

    async findById(id){
        const connection = mysql.createPool(config);
        const [results, fields] = await connection.execute('select * from users where id = ?',[id])
        if(results.length==1){
            this.id=results[0].id
            this.name=results[0].name
            this.login=results[0].login
            this.password=results[0].password
            if (results[0].admin==0) {
                this.admin=false
            }else{
                this.admin=true
            }
            const [articles, fields] = await connection.execute('select * from articles where author = ?',[id]) 
            articles.forEach(article => {
                let temp = {}
                temp['id']=article.id
                temp['name']=article.name
                this.articles.push(temp)
            })
            const [scores, field] = await connection.execute('select * from scores where user_id = ?',[id])
            scores.forEach(score => {
                let temp = {}
                temp['user_id']=score.user_id
                temp['film_id']=score.film_id
                temp['score']=score.score
                this.scores.push(temp)
            })
            let sql = "SELECT kino.film.id as id, kino.film.name as name FROM kino.film,"
            sql+=" (SELECT distinct others2.film_id as film_id, count(*) as count FROM kino.scores, kino.film, kino.scores as others1, kino.scores as others2"
            sql+=" WHERE kino.scores.user_id=? AND kino.scores.score>7 AND kino.film.id=kino.scores.film_id"
            sql+=" AND others1.film_id=kino.scores.film_id AND others2.user_id=others1.user_id AND others2.user_id!=?"
            sql+=" AND kino.scores.film_id!=others2.film_id"
            sql+=" GROUP BY others2.film_id) as related WHERE related.count>5 AND related.film_id=kino.film.id"
            const [films, f] = await connection.execute(sql, [this.id, this.id])
            films.forEach(film => {
                let temp = {}
                temp['id']=film.id
                temp['name']=film.name
                this.recomended.push(temp)})
            connection.end()
            return 0;
        }else{
            return 1;
        }
    }

    async findBylogin(login){
        const connection = mysql.createPool(config);
        const [results, fields] = await connection.execute('select * from users where login = ?',[login])
        if(results.length==1){
            this.id=results[0].id
            this.name=results[0].name
            this.login=results[0].login
            this.password=results[0].password
            if (results[0].admin==0) {
                this.admin=false
            }else{
                this.admin=true
            }
            const [articles, fields] = await connection.execute('select * from articles where author = ?',[this.id]) 
            articles.forEach(article => {
                let temp = {}
                temp['id']=article.id
                temp['name']=article.name
                this.articles.push(temp)
            })
            const [scores, field] = await connection.execute('select * from scores where user_id = ?',[this.id])
            scores.forEach(score => {
                let temp = {}
                temp['user_id']=score.user_id
                temp['film_id']=score.film_id
                temp['score']=score.score
                this.scores.push(temp)
            })
            let sql = "SELECT kino.film.id as id, kino.film.name as name FROM kino.film,"
            sql+=" (SELECT distinct others2.film_id as film_id, count(*) as count FROM kino.scores, kino.film, kino.scores as others1, kino.scores as others2"
            sql+=" WHERE kino.scores.user_id=? AND kino.scores.score>7 AND kino.film.id=kino.scores.film_id"
            sql+=" AND others1.film_id=kino.scores.film_id AND others2.user_id=others1.user_id AND others2.user_id!=?"
            sql+=" AND kino.scores.film_id!=others2.film_id"
            sql+=" GROUP BY others2.film_id) as related WHERE related.count>5 AND related.film_id=kino.film.id"
            const [films, f] = await connection.execute(sql, [this.id, this.id])
            films.forEach(film => {
                let temp = {}
                temp['id']=film.id
                temp['name']=film.name
                this.recomended.push(temp)})
            connection.end()
            return 0;
        }else{
            return 1;
        }
    }

    async save(){
        const connection = mysql.createPool(config);
        const sql = "INSERT INTO users(name, login, password) VALUES(?, ?, ?)"
        await connection.query(sql, [this.name, this.login, this.password], function(err, results) {
            if(err) console.log(err);
            else console.log("Данные добавлены");
        });

        connection.end()
    }

    async update(){
        const connection = mysql.createPool(config);
        const sql="UPDATE users set name=?, login=?, password=? where id=?"

        await connection.query(sql, [this.name, this.login,this.password, this.id], function(err, results) {
            if(err) console.log(err);
            else console.log("Данные добавлены");
        });

        connection.end()
    }

}

module.exports = user

async function main(){
    
}

main()