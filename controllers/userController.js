// user signup controller
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const validator = require("validator");

// user signup
const userSignup = async (req, res) => {
  const { firstname, lastname, email, password, repeatPassword } = req.body;
  let emptyFields = [];
  if (!firstname) emptyFields.push("firstname");
  if (!lastname) emptyFields.push("lastname");
  if (!email) emptyFields.push("email");
  if (!password) emptyFields.push("password");
  if (!repeatPassword) emptyFields.push("repeatPassword");

  if (emptyFields.length > 0)
    return res
      .status(404)
      .json({ error: "Please Fill In All Fields!", emptyFields });

  if (!validator.isEmail(email))
    return res.status(404).json({ error: "Invalid Email Address!" });

  if (!validator.isStrongPassword(password))
    return res.status(404).json({ error: "Password Is Not Strong!" });

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(400)
        .json({ error: "Email Already Exists,Please Login!" });
    if (password !== repeatPassword)
      return res.status(400).json({ error: "Password Don't Match!" });
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });
    const token = jwt.sign(
      { _id: user._id, username: `${user.firstname} ${user.lastname}` },
      process.env.SECRET,
      { expiresIn: "8h" }
    );
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// user login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  let emptyFields = [];

  if (!email) emptyFields.push("email");
  if (!password) emptyFields.push("password");

  if (emptyFields.length > 0)
    return res
      .status(404)
      .json({ error: "Please Fill In All Fields!", emptyFields });
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ error: "Email doesn't Exists,Please Signup!" });
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(400).json({ error: "Incorrect Password!" });
    const token = jwt.sign(
      {
        _id: user._id,
        username: `${user.firstname} ${user.lastname}`,
      },
      process.env.SECRET,
      { expiresIn: "8h" }
    );
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { userSignup, userLogin };
