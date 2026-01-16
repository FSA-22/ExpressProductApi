import { products } from '../database/index.js';

/**
 * @function getProducts
 * @description
 * Retrieves all products from the data store.
 *
 * This controller:
 * - Returns the full list of products
 * - Does not apply pagination or filtering (intentional for simplicity)
 *
 * @route GET /products
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 *
 * @returns {200} List of all products
 */
export const getProducts = async (req, res) => {
  // Return all products from the in-memory store
  return res
    .status(200)
    .send(products, { message: 'All products retrieved successfully' });
};

/**
 * @function getOneProduct
 * @description
 * Retrieves a single product by its unique identifier.
 *
 * This controller:
 * - Extracts the product ID from route parameters
 * - Searches for the product in the data store
 * - Returns 404 if the product does not exist
 *
 * @route GET /products/:id
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 *
 * @returns {200} Product found
 * @returns {404} Product not found
 */

export const getOneProduct = async (req, res) => {
  const {
    params: { id },
  } = req;

  // Locate product index by ID
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id, 10),
  );

  // Handle non-existent product
  if (productIndex === -1) {
    return res.status(404).send({ message: 'Product not found' });
  }

  return res.status(200).send(products[productIndex], {
    message: 'Product retrieved successfully',
  });
};

/**
 * @function createProduct
 * @description
 * Creates and persists a new product.
 *
 * This controller:
 * - Validates required fields
 * - Generates a new incremental product ID
 * - Stores the product in memory
 *
 * @route POST /products
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 *
 * @returns {201} Product created successfully
 * @returns {400} Missing required fields
 */
export const createProduct = async (req, res) => {
  const {
    body: { name, description, size },
  } = req;

  // Validate required fields
  if (!name || !description || !size) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  // Create new product object
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    description,
    size,
  };

  // Persist product
  products.push(newProduct);

  return res
    .status(201)
    .send(newProduct, { message: 'Product created successfully' });
};

/**
 * @function updateProduct
 * @description
 * Updates an existing product by ID.
 *
 * This controller:
 * - Validates product existence
 * - Ensures all required fields are provided
 * - Replaces the existing product record
 *
 * @route PUT /products/:id
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 *
 * @returns {200} Product updated successfully
 * @returns {400} Missing required fields
 * @returns {404} Product not found
 */
export const updateProduct = async (req, res) => {
  const {
    params: { id },
    body: { name, description, size },
  } = req;

  // Locate product index
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id, 10),
  );

  // Handle non-existent product
  if (productIndex === -1) {
    return res.status(404).send({ message: 'Product not found' });
  }

  // Validate required fields
  if (!name || !description || !size) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  // Create updated product object
  const updatedProduct = {
    id: parseInt(id, 10),
    name,
    description,
    size,
  };

  // Persist updated product
  products[productIndex] = updatedProduct;

  return res
    .status(200)
    .send(updatedProduct, { message: 'Product updated successfully' });
};

/**
 * @function deleteProduct
 * @description
 * Deletes a product by its unique identifier.
 *
 * This controller:
 * - Validates product existence
 * - Removes the product from the data store
 *
 * @route DELETE /products/:id
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 *
 * @returns {200} Product deleted successfully
 * @returns {404} Product not found
 */
export const deleteProduct = async (req, res) => {
  const {
    params: { id },
  } = req;

  // Locate product index
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id, 10),
  );

  // Handle non-existent product
  if (productIndex === -1) {
    return res.status(404).send({ message: 'Product not found' });
  }

  // Remove product from store
  products.splice(productIndex, 1);

  return res.status(200).send({ message: 'Product deleted successfully' });
};
