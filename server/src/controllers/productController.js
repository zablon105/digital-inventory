import Product from '../models/Product.js';

// @desc    Get all products (with search, category filter, price filter, sorting, and pagination)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 8;
    const page = Number(req.query.page) || 1;

    // Search query keyword filter
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    // Category filter
    const category = req.query.category ? { category: req.query.category } : {};

    // Price range filters
    let priceFilter = {};
    if (req.query.minPrice || req.query.maxPrice) {
      priceFilter.retailPrice = {};
      if (req.query.minPrice) {
        priceFilter.retailPrice.$gte = Number(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        priceFilter.retailPrice.$lte = Number(req.query.maxPrice);
      }
    }

    // Combine filters
    const filter = { ...keyword, ...category, ...priceFilter };

    // Sorting
    let sort = {};
    if (req.query.sortBy) {
      if (req.query.sortBy === 'price-asc') sort.retailPrice = 1;
      else if (req.query.sortBy === 'price-desc') sort.retailPrice = -1;
      else if (req.query.sortBy === 'newest') sort.createdAt = -1;
    } else {
      sort.createdAt = -1; // default newest
    }

    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      salePrice,
      description,
      image,
      images,
      category,
      sku,
      countInStock,
      stock,
      tags,
      status,
      isFeatured,
    } = req.body;

    // Support both client inputs (e.g. stock, currentStock, price, retailPrice)
    const retailPriceVal = price || req.body.retailPrice;
    const stockVal = stock !== undefined ? stock : (countInStock !== undefined ? countInStock : (req.body.currentStock || 0));

    // Handle single or multi images
    const imagesList = images && images.length ? images : (image ? [image] : []);

    const skuExists = await Product.findOne({ sku });
    if (skuExists) {
      return res.status(400).json({ message: 'A product with this SKU already exists' });
    }

    const product = new Product({
      name,
      retailPrice: retailPriceVal,
      salePrice: salePrice || null,
      description,
      images: imagesList,
      category,
      sku,
      currentStock: stockVal,
      tags: tags || [],
      status: status || 'Draft',
      isFeatured: isFeatured || false,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      retailPrice,
      salePrice,
      description,
      image,
      images,
      category,
      sku,
      stock,
      currentStock,
      tags,
      status,
      isFeatured,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.retailPrice = retailPrice !== undefined ? retailPrice : (price !== undefined ? price : product.retailPrice);
      product.salePrice = salePrice !== undefined ? salePrice : product.salePrice;
      product.description = description || product.description;
      product.category = category || product.category;
      product.sku = sku || product.sku;
      product.currentStock = currentStock !== undefined ? currentStock : (stock !== undefined ? stock : product.currentStock);
      product.tags = tags || product.tags;
      product.status = status || product.status;
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;

      if (images && images.length) {
        product.images = images;
      } else if (image) {
        product.images = [image];
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
