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
app.use(cookie());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/test", (req, res) => {
    res.render("FL Details");
});

app.get("/signin", (req, res) => {
    res.render("signin");
});

app.post("/signin", async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).alert("User already exists");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/create", async (req, res) => {
    try {
        let { username, email, password, isFreelancer } = req.body;

        let user = await userModel.findOne({ email });
        if (user) {
            return res.redirect("/signin");
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        isFreelancer = isFreelancer === "true";

        user = await userModel.create({
            username,
            email,
            password: hash,
            isFreelancer,
        });

        let token = jwt.sign({ email, userId: user._id, isFreelancer }, "My_Secret_Token");

        res.cookie("token", token);

        if (isFreelancer) {
            res.redirect("/create/FreelancerDetails");
        } else {
            res.redirect("/create/ClientDetails");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.get("/create/FreelancerDetails", isLoggedIn, (req, res) => {
    res.render("FL Details");
});

app.get("/create/ClientDetails", isLoggedIn, (req, res) => {
    res.render("Client Details");
});

app.post("/create/FreelancerDetails", async (req, res) => {
    try {
        let { firstName, lastName, phoneNo, skills, ExpDescription, portfolio, ProjectPre } = req.body;

        let token = req.cookies.token;

        jwt.verify(token, "My_Secret_Token", async (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(401).send("Invalid token");
            }

            let userDetails = await freelancerModel.create({
                firstName,
                lastName,
                phoneNo,
                skills,
                ExpDescription,
                portfolio,
                ProjectPre,
                user: decoded.userId,
            });

            let user = await userModel.findOne({ _id: decoded.userId });
            user.FL_details = userDetails._id;
            await user.save();

            res.status(200).redirect("/user/Freelancer/Dashboard");
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.post("/create/ClientDetails", async (req, res) => {
    res.send("Working on Clients Details post");
});

app.get("/user/Freelancer/Dashboard", isLoggedIn, (req, res) =>{
    res.render("FL Details")
})

app.post("/logout", async (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log("http://localhost:3000/");
});
