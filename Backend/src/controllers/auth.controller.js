const userModel = require('../models/user.model')
const blackListModel = require('../models/blacklisting.model')

const redis = require("../config/cache")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function registerController(req, res) {
    const { userName, email, password } = req.body

    //check user is exists with this email and username or not
    const isUserExists = await userModel.findOne({
        $or: [
            { userName: userName },
            { email: email }
        ]
    });

    if (isUserExists) {
        return res.status(409).json({
            message: "User alredy exists" + (isUserExists.email == email ? " Email alredy exists" : " username alredy exists")
        })
    }

    //hash password

    const hash = await bcrypt.hash(password, 10)

    //user regestration

    const newUser = await userModel.create({
        userName, email,
        password: hash
    })

    //creating jwt token
    const token = jwt.sign({
        id: newUser._id
    }, process.env.Jwt_Secret, { expiresIn: "1d" })

    //storing the jwt token in cookies

    res.cookie("token", token)

    res.status(201).json({
        message: "user created successfully",
        user: {
            username: newUser.userName,
            email: newUser.email
        }
    })


}

async function loginController(req, res) {
    const { userName, email, password } = req.body
    //checking user is exist or not
    const isUserExists = await userModel.findOne({
        $or: [
            { userName: userName },
            { email: email }
        ]
    }).select("+password")
    if (!isUserExists) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }
    //checking password
    const isMatch = await bcrypt.compare(password, isUserExists.password);

    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    //creating jwt token
    const token = jwt.sign({
        id: isUserExists._id
    }, process.env.Jwt_Secret, { expiresIn: "1d" })
    //store the token into cookies
    res.cookie("token", token)

    //login sucess 
    res.status(201).json({
        message: "user Loged in",
        user: {
            username: isUserExists.userName,
            email: isUserExists.email
        }
    })


}


async function getMe(req, res) {
    const userId = req.user.id
    // console.log(userId)
    const user = await userModel.findOne({
        _id: userId
    })
     //console.log(user)
    res.status(200).json({
        message: "User fetched",
        user: user
    })
}


async function logout(req, res) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({
                message: "Token not found"
            });
        }

        res.clearCookie("token");


        // await blackListModel.create({ token });

        await redis.set(token, Date.now().toString())

        return res.status(200).json({
            message: "User logged out successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",

        });
    }
}


module.exports = { registerController, loginController, getMe, logout }