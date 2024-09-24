const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index");
})

app.get('/login', (req, res) => {
    res.render("login");
})

// app.get('/signup', (req, res) => {
//     res.render("login")
// })

app.get('/create', async (req, res) => {
    let {username, email, password} = req.body;

    let createdUser = await userModel.create({
        username, 
        email, 
        password
    });

    res.send(createdUser);
})

app.listen(3000)