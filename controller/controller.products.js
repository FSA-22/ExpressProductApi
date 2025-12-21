import { products } from '../constants/index.js';

export const getProducts = async (req, res) => {
  res.send(products);
};

export const getOneProduct = async (req, res) => {
  const {
    params: { id },
  } = req;

  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id),
  );

  if (productIndex === -1) {
    return res.status(404).send({ message: 'Product not found' });
  }

  return res.status(200).send(products[productIndex]);
};

export const createProduct = async (req, res) => {
  const {
    body: { name, description, size },
  } = req;

  const newProduct = {
    id: products[products.length - 1].id + 1,

    // ...body,

    // or destructure body

    name,
    description,
    size,
  };

  products.push(newProduct);

  console.log(newProduct);

  return res.status(201).send(newProduct);
};

export const updateProduct = async (req, res) => {
  const {
    params: { id },
    body: { name, description, size },
  } = req;

  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id),
  );

  if (productIndex === -1) {
    return res.status(404).send({ message: 'Product not found' });
  }

  const updatedProduct = {
    id: parseInt(id),
    name,
    description,
    size,
  };

  products[productIndex] = updatedProduct;

  return res.status(200).send(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  const {
    params: { id },
  } = req;

  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id),
  );

  if (productIndex === -1) {
    return res.status(404).send({ message: 'Product not found' });
  }

  products.splice(productIndex, 1);

  return res.status(200).send({ message: 'Product deleted successfully' });
};
