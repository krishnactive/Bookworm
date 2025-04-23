import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

// Login function
export const protect = async (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login request received:', req.body);  // Log the request body to see if the request has email and password

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user);  // Log the user object found

    // Check password - Assuming plain text check for simplicity (in production use bcrypt.compare)
    if (password !== user.password) {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Log user data before generating token
    console.log('Before token generation:', user);

    // Generate the JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Log the token after it's generated
    console.log('After token generation:', token);

    // Send response with the token
    res.status(200).json({ token, message: 'Login successful' });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
