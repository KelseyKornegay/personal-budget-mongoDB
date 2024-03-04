const express = require('express')
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


const mongoose = require('mongoose')
const budgetModel = require('./model/budget_schema')

let url = 'mongodb://127.0.0.1:27017/personal_budget_mongodb';

app.use('/', express.static('public'));

app.get("/budget", async (req, res) => {
    try {
        await mongoose.connect(url);
        console.log("Connected to the database");

        // Fetch
        const data = await budgetModel.find({});
        console.log("Fetched data:", data); // Log fetched data
        res.send(data);

        // Close connection
        await mongoose.connection.close();
        console.log("Connection closed");
    } catch (error) {
        console.error("Error handling the request:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/addNewBudget", async (req, res) => {
    console.log(req.body);
    try {
        await mongoose.connect(url);
    } catch (error) {
        console.error("Error connecting to the database:", error);
        return res.status(500).send("Error connecting to the database");
    }

    try {
        // Insert
        let newData = new budgetModel(req.body);
        await newData.save();
    } catch (error) {
        console.error("Error inserting data:", error);
        return res.status(500).send("Error inserting data");
    }

    res.send("Data Entered Successfully");

    // Close connection
    try {
        await mongoose.connection.close();
    } catch (error) {
        console.error("Error closing the connection:", error);
        return res.status(500).send("Error closing the connection");
    }
});

app.listen(port, () => {
    console.log(`Api Served at http://localhost:${port}`);
})