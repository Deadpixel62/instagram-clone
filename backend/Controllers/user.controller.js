const User = require('../Models/user.model');
const userController = {};
require("dotenv").config()

//import jsonwebtoken:
const jwt = require("jsonwebtoken");

//import bcrypt:
const bcrypt = require("bcrypt");
const SECRET = process.env.JWT_SECRET


userController.signup = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
      const newUser = new User({
        email,
        password,
      });
      // hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser.save()
          if (err) throw err;
          return res.status(200).json({
            message: "User created successfully",
            user: newUser,
            token: jwt.sign(
              {
                email: newUser.email,
                userId: newUser._id,
              },
              SECRET,
              { expiresIn: "1h" }
            ),
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};


userController.login = (req, res) => {
    const { email, password } =
        req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({
                            message: 'Invalid credentials'
                        });
                    }
                    jwt.sign(
                        { id: user._id },
                        process.env.JWT_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                success: true,
                                token: `Bearer ${token}`
                        }
                    );
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};



module.exports = userController