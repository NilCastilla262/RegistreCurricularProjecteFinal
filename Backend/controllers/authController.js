// backend/controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserByEmail, createUser, getUserById, getAllUsers, updateUser, deleteUserById } = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "L'usuari ja existeix" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(username, email, hashedPassword);

    res.status(201).json({ message: "Usuari creat correctament" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar l'usuari" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return res.status(401).json({ error: "Correu electrònic o contrasenya incorrectes" });
    }

    const isPasswordValid = await bcrypt.compare(password.trim(), existingUser.password.trim());
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Correu electrònic o contrasenya incorrectes" });
    }

    const token = jwt.sign(
      { uuid: existingUser.UUID, email: existingUser.email, role: 'user' },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error al fer login" });
  }
};

const getUser = async (req, res) => {
  try {
    const { uuid } = req.user;
    
    const user = await getUserById(uuid);
    if (!user) {
      return res.status(404).json({ error: "Usuari no trobat" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtenir l'usuari" });
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtenir els usuaris" });
  }
};




module.exports = {
  register,
  login,
  getUser,
  getUsers,
  updateUserById,
  deleteUser,
};
