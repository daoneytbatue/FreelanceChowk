const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = async (req, res, next) => {
    if (!req.cookies.token) {
        req.body.alert("Login First");
        return res.redirect("/signin");
    }

    try {
        let decoded = jwt.verify(req.cookies.token, "My_Secret_Token");
        let user = await userModel
            .findOne({ email: decoded.email })
            .select("-password");
        req.user = user;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ message: "Invalid token. Please log in again." });
    }
};