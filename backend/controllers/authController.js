const User = require('../models/User'); // Ensure this matches your file structure
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

console.log('SECRET_KEY:', SECRET_KEY);

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ name, email, password: hashedPassword, role });
        const result = await newUser.save();
        
        const token = jwt.sign({ email: result.email, id: result._id, role: result.role }, SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({ user: result, token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Email:', email);
        console.log('Password:', password);

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Stored Password Hash:', existingUser.password);

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        console.log('Password Match:', matchPassword);

        if (!matchPassword) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id, role: existingUser.role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({ user: existingUser, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { register, login };
