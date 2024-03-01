const mongoose = require('mongoose')
const budgetModel = require('./model/budget_schema')


let url = 'mongodb://127.0.0.1:27017/personal_budget_mongodb';

async function connectToDatabase() {
    try {
        await mongoose.connect(url);
        console.log("Connected to database");

        // Fetch
        const data = await budgetModel.find({});
        console.log(data);

        // Close connection
        await mongoose.connection.close();
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

connectToDatabase();

