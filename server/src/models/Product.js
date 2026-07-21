import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
    },
    tags: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, 'Please add a product description'],
    },
    retailPrice: {
      type: Number,
      required: [true, 'Please add a retail price'],
      min: 0,
    },
    salePrice: {
      type: Number,
      default: null,
      min: 0,
    },
    sku: {
      type: String,
      required: [true, 'Please add a SKU'],
      unique: true,
      trim: true,
    },
    currentStock: {
      type: Number,
      required: [true, 'Please add stock level'],
      min: 0,
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
    },
    status: {
      type: String,
      enum: ['Published', 'Draft'],
      default: 'Draft',
    },
    images: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
