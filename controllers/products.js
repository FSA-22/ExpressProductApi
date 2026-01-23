import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      message: 'All products retrieved successfully',
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to retrieve products',
    });
  }
};

export const getOneProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Invalid product ID',
    });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price } = req.body;

  console.log('FILE:', req.file);
  console.log('BODY:', req.body);

  if (!name || !description || !price) {
    return res.status(400).json({
      message: 'Name, description, and price are required',
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: 'Product image is required',
    });
  }

  const product = await Product.create({
    name,
    description,
    price,
    imageUrl: req.file.path, // Cloudinary secure URL
  });

  res.status(201).json({
    message: 'Product created successfully',
    data: product,
  });
};

/**
 * @function updateProduct
 * @description
 * Updates an existing product by ID.
 *
 * Design decisions:
 * - Uses findByIdAndUpdate for atomic update
 * - `new: true` ensures updated document is returned
 *
 * @route PUT /products/:id
 */
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, imageUrl, price } = req.body;

  if (!name || !description || !imageUrl || !price) {
    return res.status(400).json({
      message: 'All fields are required',
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        imageUrl,
        price,
      },
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Invalid product ID',
    });
  }
};

/**
 * @function deleteProduct
 * @description
 * Deletes a product by ID.
 *
 * Design decisions:
 * - Uses findByIdAndDelete for single DB operation
 *
 * @route DELETE /products/:id
 */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Invalid product ID',
    });
  }
};
