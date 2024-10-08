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

app.get('/signin', (req, res) => {
    res.render("signin");
})
app.get('/signup', (req, res) => {
    res.render("signup");
})


app.post('/create', async (req, res) => {
    let {username, email, password} = req.body;

    let createdUser = await userModel.create({
        username, 
        email, 
        password
    });

    res.send(createdUser);
    console.log(createdUser)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})