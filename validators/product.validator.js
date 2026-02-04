import { body, param } from 'express-validator';

export const createProductValidator = [
  body('name').trim().notEmpty().withMessage('Product name is required'),

  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than zero'),

  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a positive integer'),

  body('description')
    .optional()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
];

export const productIdValidator = [
  param('id').isMongoId().withMessage('Invalid product ID'),
];
