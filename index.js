const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const user = require("./routes/user");
const admin = require("./routes/admin");

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET,OPTIONS,PATCH,DELETE,POST,PUT']
}));

app.use("/api/user", user);
app.use("/api/admin", admin);


const port = process.env.PORT || 9001;

mongoose
    .connect(
        'mongodb+srv://farmhousevp:NeyUhpsaNAHNG7CF@farmhousevap.8ghmghc.mongodb.net/farmhouse?retryWrites=true&w=majority&appName=Farmhousevap'
    )
    .then(result => {
        app.listen(port);
        console.log(`Listening to port ${port}`);
    })
    .catch(err => console.log(err));