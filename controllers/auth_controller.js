const UserSchema = require('../models/user_models.js');
const { generateTokenAndSetCookie } = require('../utils/generateToken.js');

exports.signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if username already exists
    const existingUser = await UserSchema.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create a new user object
    const newUser = new UserSchema({
      fullName,
      username,
      password,
      gender,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate and set JWT token after user creation
    generateTokenAndSetCookie(newUser._id, res);

    // Respond with user details
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      gender: newUser.gender,
    });
  } catch (error) {
    console.error('Error in signup controller:', error.message);

    // Handle duplicate key error (E11000)
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Handle other errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ''
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({
        error: 'Invalid username or password',
      });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
    });

    console.log('Error in login controller', error.message);
  }
};
exports.logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'User logged out' });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
    });

    console.log('Error in logout controller', error.message);
  }
};
