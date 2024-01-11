const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { adminCredentialModel } = require('../Model/AdminCredentialModel');

const adminRegisterController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);
        const data = {
            username: username,
            email: email,
            password: encryptedPassword,
        };

        const registerAdmin = await adminCredentialModel(data).save();

        const token = jwt.sign({
            username: registerAdmin.username,
            password: registerAdmin.password
        }, `${process.env.JWT_SECRET}`);

        return res.status(200).json({
            error: false,
            message: "Registration Successfull",
            response: token,
        });
    }
    catch (error) {
        console.error('Admin Registration Error: ', error);

        if (error.code === 11000) {
            return res.status(400).json({
                error: true,
                message: "Username or email already in use",
            });
        }

        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        })
    }
};

const adminLoginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        const findUsername = await adminCredentialModel.findOne({ username: username });

        if(!findUsername) {
            return res.status(404).json({
                error: true,
                message: "Username Not Found!"
            });
        }

        const verify = bcrypt.compare(password, findUsername.password);

        // UnAuthorized User
        if (!verify) {
            return res.status(401).json({
                error: true,
                message: "Invalid Credentials",
            });
        }

        const token = jwt.sign({
            username: findUsername.username,
            password: findUsername.password
        }, `${process.env.JWT_SECRET}`);

        return res.status(200).json({
            error: false,
            message: "Login Successfull",
            response: token,
        });
    }
    catch (error) {
        console.error("Admin Login Error: ", error);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        })
    }
};

module.exports = {
    adminRegisterController,
    adminLoginController,
}