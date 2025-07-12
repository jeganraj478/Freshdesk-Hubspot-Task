const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    const isApiKeyPresent=user?.freshdeskDomain && user?.freshdeskKey && user?.hubspotKey 
    const token = generateToken(user._id);
    res.status(201).json({ token,isApiKeyPresent });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};


const saveKeys = async (req, res) => {
  const { freshdeskKey, freshdeskDomain, hubspotKey } = req.body;
  try {
    await User.findByIdAndUpdate(req.userId, {
      freshdeskKey,
      freshdeskDomain,
      hubspotKey
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save keys', error: err.message });
  }
};


module.exports={
login,
signup,
saveKeys
}