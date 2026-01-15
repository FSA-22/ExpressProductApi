import bcrypt from 'bcryptjs';

export const products = [
  { id: 1, name: 'Nike Shoes', price: 40000, description: 'White Nike Shoes' },
];

export const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    refreshToken: null,
  },
];
