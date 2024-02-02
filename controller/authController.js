
const userModal = require("../models/userModal");
const { creatingHashedPass } = require("../utils/commonFunction");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { STATUS_CODES } = require("../utils/constant");
const register = async (req, res) => {

    console.log(req.body)
    const checkUserId = await userModal.findOne({ email: req.body.email });

    if (checkUserId) {
        return res.status(409).send({ message: "userid already exists" });
    }
    const hashPass = await creatingHashedPass(req, res)

    try {
        const newUser = new userModal({
            email: req.body.email,
            fullName: req.body.fullname,
            userName: req.body.username,
            password: hashPass,
        });
        await newUser.save();
        res.status(STATUS_CODES.HTTP_OK).send(newUser);

    }
    catch (error) {
        console.log(error)
        res.send(error)
    }

}

const login = async (req, res) => {
    console.log(req.body)
    const userInput = req?.body?.userName;
    const userPassword = req?.body?.password;
    try {
        let user;

        // Check if the input is an email address or a username
        if (userInput.includes('@')) {
            // If it contains '@', treat it as an email address
            user = await userModal.findOne({ email: userInput });
        } else {
            // Otherwise, treat it as a username
            user = await userModal.findOne({ userName: userInput });
        }

        if (!user) {
            return res.status(401).send({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(userPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: "Incorrect password" });
        }

        const token = jwt.sign({ user_id: user._id, role: user.role }, process.env.JWT_KEY, {
            expiresIn: "24h",
        });
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            domain: "localhost",
        });
        res.status(200).send(
            {
                data: user,
                message: " Login in Sucessful",
            })
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

}

const logoutUser = async (req, response) => {
    const token = req.token
    try {
        response.cookie("token", token, {
            maxAge: 0,
            domain: "localhost",
        });
        console.log("logout Sucessfull")
        response.status(200).send("Logout successful");
    } catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
};

module.exports = { register, login, logoutUser }