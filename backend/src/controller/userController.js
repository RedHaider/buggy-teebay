import { PrismaClient } from "@prisma/client";

import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import {
  validateFirstName,
  validateLastName,
  validatePassword,
  validateEmail,
} from "../utils/userValidation.js";

const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  const { email, password, address, phone_number, first_name, last_name } =
    req.body;

  // Validate input fields
  const firstNameError = validateFirstName(first_name);
  const lastNameError = validateLastName(last_name);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (firstNameError || lastNameError || emailError || passwordError) {
    return res.status(400).json({
      error: {
        firstName: firstNameError,
        lastName: lastNameError,
        email: emailError,
        password: passwordError,
      },
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Save new user data
    const user = await prisma.user.create({
      data: {
        email,
        password,
        address,
        phone_number,
        first_name,
        last_name,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  // Validate input fields
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError || passwordError) {
    return res.status(400).json({
      error: {
        email: emailError,
        password: passwordError,
      },
    });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // Handle authentication errors
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // generate secretKey
    const secretKey = nanoid(32);

    // generate token
    const token = jwt.sign({ userId: user.id }, secretKey);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error logging in" });
  }
};

export { registerUser, loginUser };
