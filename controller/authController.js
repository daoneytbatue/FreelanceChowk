const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.loginHandler = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        console.log("USER====",user);
        if (!user){
            return res.render("signin",context={
                alert: "invalid Email or password"
            }); 
        }
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        console.log(email, password);
        if (hash === user.password) {
            let token = jwt.sign({ email, userId: user._id, isFreelancer: user.isFreelancer }, "My_Secret_Token");

            res.cookie("token", token);

            res.redirect("/user/Freelancer/Dashboard")

        } else {
            console.log("invalid Email or password");
            
            return res.render("signin",context={
                alert: "invalid Email or password",
                
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}