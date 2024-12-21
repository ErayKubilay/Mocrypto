const express  = require("express");
const app =  express();
const cors =  require("cors");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("AN INSTANCE ON 5000");
})

// const pool =  new Pool({
//     host: "localhost",
//     port: 5432
// })

// pool.query("CREATE DATABASE accounts;").then((Response) => {
//     console.log("Database has been created.");
//     console.log(Response);
// })

// module.exports = pool;