const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const users = async () => {
  try {
    const users = await User.find().populate('createdEvents');
    return users.map(user => {
      return {
        ...user._doc
      };
    });
  } catch (err) {
    throw err;
  }
};

const createUser = async args => {
  try {
    const user = await User.findOne({ email: args.userInput.email });
    if (user) {
      throw new Error('User already exist.');
    }
    const hashPwd = await bcrypt.hash(args.userInput.password, 12);
    const newUser = new User({
      email: args.userInput.email,
      password: hashPwd
    });
    const result = await newUser.save();
    return { ...result._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist.');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect');
    }

    const token = await jwt.sign(
      {
        userId: user.id,
        email: user.email
      },"webToken2019",
      {
        expiresIn: '1hr'
      }
    );

    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  users: users,
  createUser: createUser,
  login: login
};
