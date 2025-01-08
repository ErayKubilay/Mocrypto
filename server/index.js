const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("AN INSTANCE ON 5000");
})


// pool.query("CREATE DATABASE accounts;").then((Response) => {
//     console.log("Database has been created.");
//     console.log(Response);
// })


// ROUTES 

// Create account 
app.post("/accounts", async (req, res) => {
    try {

        // Name is reserved name for js so we need to rename
        const { name: firstName, surname, username, password, type } = req.body;
        const newAccount = await pool.query("INSERT INTO account (name, surname, username, password, type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [firstName, surname, username, password, type]);

        res.json(newAccount.rows[0]);
        console.log(req.body);
    }
    catch (err) {
        console.log(req.body);
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while creating the account." });
    }
});

// Get all accounts

app.get("/accounts", async (req, res) => {
    try {
        const allAccounts = await pool.query("SELECT * FROM account");
        res.json(allAccounts.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while retrieving accounts." });
    }
});


// Get account by username
app.get("/accounts/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const account = await pool.query("SELECT * FROM account WHERE username = $1", [username]);

        if (account.rows.length === 0) {
            return res.status(404).json({ error: "Account not found." });
        }

        res.json(account.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while retrieving the account." });
    }
});

// Update an account by id
app.put("/accounts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name: firstName, surname, username, password, type } = req.body;

        const updatedAccount = await pool.query(
            "UPDATE account SET name = $1, surname = $2, username = $3, password = $4, type = $5 WHERE id = $6 RETURNING *",
            [firstName, surname, username, password, type, id]
        );

        if (updatedAccount.rows.length === 0) {
            return res.status(404).json({ error: "Account not found." });
        }

        res.json(updatedAccount.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while updating the account." });
    }
});

// DELETE - Delete an account by ID
app.delete("/accounts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAccount = await pool.query("DELETE FROM account WHERE id = $1 RETURNING *", [id]);

        if (deletedAccount.rows.length === 0) {
            return res.status(404).json({ error: "Account not found." });
        }

        res.json({ message: "Account deleted successfully.", account: deletedAccount.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while deleting the account." });
    }
});
