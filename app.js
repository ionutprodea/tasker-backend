const express = require('express');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/users');
const tasks = require('./routes/tasks');
const auth = require('./routes/auth');
const cors = require('cors');
require("dotenv").config()

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

const database = process.env.DATABASE_URL;

mongoose.connect(database)
    .then(() => console.log('Connected to Tasker database...'))
    .catch(err => console.log('Could not connect to database', err));

app.use("/api/users", users);
app.use("/api/tasks", tasks);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));

