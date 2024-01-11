require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {databaseConnection} = require('./Database/dbConnection');

const app = express();
app.use(express.json());

// CORS
app.use(cors({
    origin: ["http://localhost:3000"]
}));

const startServer = () => {
    app.get("/", (req, res) => {
        res.json(200).send("E-Commerce API's");
    });

    app.listen(process.env.PORT, () => console.log(`Server Listening @ ${process.env.PORT}`));
}

databaseConnection()
.then(() => {
    startServer();
})
.catch((error) => {
    console.error("Failed to Start Server: ", error);
})