const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const path = require('path');
const userModel = require('./models/user');
const freelancerModel = require('./models/freelancer');
const clientModel = require('./models/client');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
    let { username, email, password, isFreelancer } = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("Something is Wrong here");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                email,
                password: hash,
                isFreelancer
            });
        })
    })

    let token = jwt.sign({ email }, "My_Secret_Token");
    res.cookie("token", token);

    if (isFreelancer) {
        res.redirect("/create/FreelancerDetails");
    } else {
        res.redirect("/create/ClientDetails");
    }
})

app.get('/create/FreelancerDetails', (req, res) => {
    // res.send("Working on Freelancer Details");
    res.render("FL Details")
})

app.get('/create/ClientDetails', (req, res) => {
    res.send("Working on Clients Details");
})

app.post('/create/FreelancerDetails', async (req, res) => {
    res.send("Working on Freelancer Details post");
})

app.post('/create/ClientDetails', async (req, res) => {
    res.send("Working on Clients Details post");
})

app.post('/logout', async (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    console.log('http://localhost:3000/');
})