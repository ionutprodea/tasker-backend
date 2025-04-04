const express = require('express');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/users');
const tasks = require('./routes/tasks');
const auth = require('./routes/auth');
const cors = require('cors');

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://ionutprodea:tXiuxliWpZOkRRyO@cluster0.bvwhm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/tasker")
    .then(() => console.log('Connected to Tasker database...'))
    .catch(err => console.log('Could not connect to database', err));

app.use("/api/users", users);
app.use("/api/tasks", tasks);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));

