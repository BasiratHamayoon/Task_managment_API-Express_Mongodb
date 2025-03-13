const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
   
    try{
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: " User Created Successfully!"});
    } catch (error) {
        res.status(400).json({error: error.message });  
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: "Invailid Credentials!"});


        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invailid Credentials!"});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h"});
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};