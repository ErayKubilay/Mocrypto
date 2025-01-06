const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgrepostgre",
    host: "localhost",
    port: 5432,
    database: "Mocrypto"
});

module.exports = pool;
