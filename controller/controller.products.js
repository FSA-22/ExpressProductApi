import { products } from '../constants/index.js';

export const getProducts = async (req, res) => {
  // return all products
  res
    .status(201)
    .send(products, { message: 'All products retrieved successfully' });
};

export const getOneProduct = async (req, res) => {
  const {
    params: { id },
  } = req;

  // find product by id
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id),
  );

  // if product not found
  if (productIndex === -1) {
    return res.status(404).send({ message: 'Product not found' });
  }

  return res.status(200).send(products[productIndex], {
    message: 'Products retrieved successfully',
  });
};

export const createProduct = async (req, res) => {
  const {
    body: { name, description, size },
  } = req;

  // reject if any field is missing
  if (!name || !description || !size) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  // create new product
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

  return res
    .status(201)
    .send(newProduct, { message: 'Product created successfully' });
};

export const updateProduct = async (req, res) => {
  const {
    params: { id },
    body: { name, description, size },
  } = req;

  // find product by id
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id),
  );

  if (productIndex === -1) {
    return res.status(404).send({ message: 'Product not found' });
  }

  // reject if any field is missing
  if (!name || !description || !size) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  // update product
  const updatedProduct = {
    id: parseInt(id),
    name,
    description,
    size,
  };

  // save updated product
  products[productIndex] = updatedProduct;

  return res
    .status(200)
    .send(updatedProduct, { message: 'Product updated successfully' });
};

export const deleteProduct = async (req, res) => {
  const {
    params: { id },
  } = req;

  // find product by id
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(id),
  );

  // if product not found
  if (productIndex === -1) {
    return res.status(404).send({ message: 'Product not found' });
  }

  // delete product
  products.splice(productIndex, 1);

  return res.status(200).send({ message: 'Product deleted successfully' });
};
