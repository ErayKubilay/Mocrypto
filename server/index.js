const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.use(express.json());

app.listen(5000, () => {
    console.log("AN INSTANCE ON 5000");
})


// pool.query("CREATE DATABASE accounts;").then((Response) => {
//     console.log("Database has been created.");
//     console.log(Response);
// })


// ROUTES 

app.post("/account", async (req, res) => {
    try {
        console.log(req.body);
    }
    catch (err) {
        console.error(err.message);
    }
});
