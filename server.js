const express = require('express')
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());


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
    try {
        await mongoose.connect(url);
        
        // Insert
        let newData = new budgetModel(req.body);
        await budgetModel.insertMany(newData);
        
        res.send("Data Entered Successfully");

        // Close connection
        await mongoose.connection.close();
    } catch (error) {
        console.error("Error handling the request:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Api Served at http://localhost:${port}`);
})