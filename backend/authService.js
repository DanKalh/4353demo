// backend/authService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

const register = async ({ email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.userCredentials.create({
    data: {
      email,
      password: hashedPassword,
      profile: {
        create: {
          fullName: '', // Set empty initial values for the required fields
          address1: '',
          address2: '',
          city: '',
          state: '',
          zipCode: '',
          skills: '[]', // Store as JSON string
          preferences: '',
          availability: '[]' // Store as JSON string
        }
      }
    }
  });

  return newUser;
};

const login = async ({ email, password }) => {
  if (!email) {
    throw new Error('Email is required');
  }

  const user = await prisma.userCredentials.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });

  return { token, user };
};

export { register, login };
