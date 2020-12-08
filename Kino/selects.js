const mysql = require("mysql2/promise");

const config = {
    host: "localhost",
    user: "Georgiy",
    database: "kino",
    password: "f(12)=479001599"
}

async function AllFilms(){
    const connection = mysql.createPool(config);
    const [results, fields] = await connection.execute('select * from film')
    connection.end()
    return results.reverse()  
}

async function AllArticles(){
    const connection = mysql.createPool(config);
    const [results, fields] = await connection.execute('select * from articles')
    connection.end()
    return results.reverse()  
}

async function AllPersons(){
    const connection = mysql.createPool(config);
    const [results, fields] = await connection.execute('select * from persons')
    connection.end()
    return results.reverse()  
}

async function AllUsers(){
    const connection = mysql.createPool(config);
    const [results, fields] = await connection.execute('select * from users')
    connection.end()
    return results  
}
module.exports.AllFilms=AllFilms
module.exports.AllArticles=AllArticles
module.exports.AllPersons=AllPersons
module.exports.AllUsers=AllUsers