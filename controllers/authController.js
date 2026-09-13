const bcrypt = require('bcrypt');
const User = require('../models/User');

async function register(req, res, next) {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'An account with that email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    // logs the new user straight into a session, so they don't have to log in twice
    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(201).json({ message: 'Account created.', redirect: '/dashboard' });
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register };
