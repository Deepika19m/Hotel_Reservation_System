const User = require("../models/User");

const registerUser = async (req, res) => {
    const { name, email, mobile, password, rePassword } = req.body;

    if (password !== rePassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, mobile, password, role: 'user' });

    try {
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error registering user", error });
    }
};


// Login User (no admin role, just regular user)
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    // Check if passwords match
    if (password !== user.password) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // Return user details (including role) on successful login
    res.status(200).json({
        message: "Login successful",
        role: user.role,
        name: user.name,
        email: user.email,
    });
};

module.exports = { registerUser, loginUser };
