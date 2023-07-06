const authServices = require("../services/authService");

const register = async (req, res) => {
  try {
    const newUser = await authServices.register(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await authServices.login(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const validate = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await authServices.validate(token);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { register, login, validate };
