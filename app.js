const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const path = require("path");
const userModel = require("./models/user");
const freelancerModel = require("./models/freelancer");
const clientModel = require("./models/client");
const isLoggedIn = require("./Middlewares/isLoggedIn");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/signin", (req, res) => {
    res.render("signin");
});

app.post("/signin", (req, res) => {
    res.send("Working on it");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/create", async (req, res) => {
    try {
        let { username, email, password, isFreelancer } = req.body;

        // Check if the user already exists
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).alert("User already exists").redirect("/signin");
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create the user with the hashed password
        user = await userModel.create({
            username,
            email,
            password: hash,
            isFreelancer,
        });

        // Generate a JWT token
        let token = jwt.sign({ email, userId: user._id }, "My_Secret_Token");

        // Set the token in cookies
        res.cookie("token", token);

        // Redirect based on the user type
        if (isFreelancer) {
            res.redirect("/create/FreelancerDetails");
        } else {
            res.redirect("/create/ClientDetails");
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.get("/create/FreelancerDetails", isLoggedIn, (req, res) => {
    // res.send("Working on Freelancer Details");
    res.render("FL Details");
});

app.get("/create/ClientDetails", isLoggedIn, (req, res) => {
    res.render("Client Details");
});

app.post("/create/FreelancerDetails", async (req, res) => {
    res.send("Working on Freelancer Details post");
});

app.post("/create/ClientDetails", async (req, res) => {
    res.send("Working on Clients Details post");
});

app.post("/logout", async (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
});

// Middlewares



app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log("http://localhost:3000/");
});
