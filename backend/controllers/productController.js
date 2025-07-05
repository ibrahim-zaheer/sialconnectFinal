const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/offer/orderSchema");
const { uploadProductImage } = require("../config/multerConfig");

const cloudinary = require("../config/cloudinaryConfig");
// Create a Product
// exports.createProduct = async (req, res) => {
//     try {
//         const { name, description, price } = req.body;

//         // Check if the logged-in user is a supplier
//         if (req.user.role !== "supplier") {
//             return res.status(403).json({ message: "Only suppliers can create products." });
//         }

//         const product = new Product({
//             name,
//             description,
//             price,
//             supplier: req.user.id, // Assign the product to the logged-in supplier
//         });

//         await product.save();
//         res.status(201).json({ message: "Product created successfully", product });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.createProduct = async (req, res) => {
//     try {
//         const { name, description, price } = req.body;

//         // Check if the logged-in user is a supplier
//         if (req.user.role !== "supplier") {
//             return res.status(403).json({ message: "Only suppliers can create products." });
//         }

//         // Validate required fields
//         if (!name || !description || !price) {
//             return res.status(400).json({ message: "All fields (name, description, price) are required." });
//         }

//         // If there is an image, upload it to Cloudinary
//         let imageUrl = '';
//         if (req.file) {
//             imageUrl = req.file.path; // Assuming Cloudinary URL is in 'path'
//         }

//         // Create the product with the image URL if it exists
//         const product = new Product({
//             name,
//             description,
//             price,
//             supplier: req.user.id, // Assign the product to the logged-in supplier
//             image: imageUrl, // Set image URL from Cloudinary
//         });

//         await product.save();
//         res.status(201).json({ message: "Product created successfully", product });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (req.user.role !== "supplier") {
      return res
        .status(403)
        .json({ message: "Only suppliers can create products." });
    }

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const imageUrls = [];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "products",
              resource_type: "image",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          stream.end(file.buffer); // Use file buffer directly
        });
      });

      const uploadedImages = await Promise.all(uploadPromises);
      imageUrls.push(...uploadedImages);
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      supplier: req.user.id,
      image: imageUrls, // multiple image URLs
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update a Product
// exports.updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params; // Product ID
//         const { name, description, price, category } = req.body;
//         const files = req.files; // New images

//         const product = await Product.findById(id);

//         if (!product) {
//             return res.status(404).json({ message: "Product not found." });
//         }

//         // Ensure the logged-in supplier owns the product
//         if (product.supplier.toString() !== req.user.id) {
//             return res.status(403).json({ message: "You are not authorized to update this product." });
//         }

//         // Update fields if provided
//         product.name = name || product.name;
//         product.description = description || product.description;
//         product.price = price || product.price;
//         product.category = category || product.category;

//         // Handle image updates if new files are uploaded
//         if (files && files.length > 0) {
//             const imageUrls = files.map(file => {
//                 // This assumes you're using a service like Cloudinary or AWS S3
//                 // Adjust according to your file storage solution
//                 return file.path || file.location;
//             });
//             product.image = imageUrls;
//         }

//         await product.save();
//         res.status(200).json({ message: "Product updated successfully", product });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, description, price, category } = req.body;
//         const files = req.files;

//         const product = await Product.findById(id);

//         if (!product) {
//             return res.status(404).json({ message: "Product not found." });
//         }

//         if (product.supplier.toString() !== req.user.id) {
//             return res.status(403).json({ message: "You are not authorized to update this product." });
//         }

//         // Update basic fields
//         product.name = name || product.name;
//         product.description = description || product.description;
//         product.price = price || product.price;
//         product.category = category || product.category;

//         // Handle new image uploads
//         if (files && files.length > 0) {
//             // Upload new images to Cloudinary
//             const uploadPromises = files.map(file => {
//                 return new Promise((resolve, reject) => {
//                     cloudinary.uploader.upload_stream(
//                         { folder: 'productImages' },
//                         (error, result) => {
//                             if (error) return reject(error);
//                             resolve(result.secure_url);
//                         }
//                     ).end(file.buffer);
//                 });
//             });

//             const newImageUrls = await Promise.all(uploadPromises);

//             // Combine new images with existing ones (or replace if you prefer)
//             product.image = [...product.image, ...newImageUrls];
//         }

//         await product.save();
//         res.status(200).json({ message: "Product updated successfully", product });
//     } catch (error) {
//         console.error("Update product error:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, description, price, category, imagesToDelete } = req.body;
//         const files = req.files;

//         const product = await Product.findById(id);

//         if (!product) {
//             return res.status(404).json({ message: "Product not found." });
//         }

//         if (product.supplier.toString() !== req.user.id) {
//             return res.status(403).json({ message: "You are not authorized to update this product." });
//         }

//         // Update basic fields
//         product.name = name || product.name;
//         product.description = description || product.description;
//         product.price = price || product.price;
//         product.category = category || product.category;

//         // Handle image deletions if any
//         if (imagesToDelete && imagesToDelete.length > 0) {
//             // Convert single string to array if needed
//             const imagesToDeleteArray = Array.isArray(imagesToDelete) ? imagesToDelete : [imagesToDelete];

//             // Delete from Cloudinary
//             const deletePromises = imagesToDeleteArray.map(imageUrl => {
//                 const publicId = imageUrl.split('/').pop().split('.')[0];
//                 return cloudinary.uploader.destroy(`productImages/${publicId}`);
//             });

//             await Promise.all(deletePromises);

//             // Remove from product's image array
//             product.image = product.image.filter(img => !imagesToDeleteArray.includes(img));
//         }

//         // Handle new image uploads
//         if (files && files.length > 0) {
//             const uploadPromises = files.map(file => {
//                 return new Promise((resolve, reject) => {
//                     cloudinary.uploader.upload_stream(
//                         { folder: 'productImages' },
//                         (error, result) => {
//                             if (error) return reject(error);
//                             resolve(result.secure_url);
//                         }
//                     ).end(file.buffer);
//                 });
//             });

//             const newImageUrls = await Promise.all(uploadPromises);
//             product.image = [...product.image, ...newImageUrls];
//         }

//         await product.save();
//         res.status(200).json({ message: "Product updated successfully", product });
//     } catch (error) {
//         console.error("Update product error:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

//24th May 2025 Update code

// exports.updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         // Get text fields from req.body (they come through when using multer)
//         const { name, description, price, category } = req.body;
//         const files = req.files;

//         // Get imagesToDelete from req.body (might be string or array)
//         let imagesToDelete = req.body.imagesToDelete;
//         // Convert to array if it's a string
//         if (imagesToDelete && !Array.isArray(imagesToDelete)) {
//             imagesToDelete = [imagesToDelete];
//         }

//         const product = await Product.findById(id);

//         if (!product) {
//             return res.status(404).json({ message: "Product not found." });
//         }

//         if (product.supplier.toString() !== req.user.id) {
//             return res.status(403).json({ message: "You are not authorized to update this product." });
//         }

//         // Update basic fields
//         product.name = name || product.name;
//         product.description = description || product.description;
//         product.price = price || product.price;
//         product.category = category || product.category;

//         // Handle image deletions if any
//         if (imagesToDelete && imagesToDelete.length > 0) {
//             // Delete from Cloudinary
//             const deletePromises = imagesToDelete.map(imageUrl => {
//                 const publicId = imageUrl.split('/').pop().split('.')[0];
//                 return cloudinary.uploader.destroy(`productImages/${publicId}`);
//             });

//             await Promise.all(deletePromises);

//             // Remove from product's image array
//             product.image = product.image.filter(img => !imagesToDelete.includes(img));
//         }

//         // Handle new image uploads
//         if (files && files.length > 0) {
//             const uploadPromises = files.map(file => {
//                 return new Promise((resolve, reject) => {
//                     cloudinary.uploader.upload_stream(
//                         { folder: 'productImages' },
//                         (error, result) => {
//                             if (error) return reject(error);
//                             resolve(result.secure_url);
//                         }
//                     ).end(file.buffer);
//                 });
//             });

//             const newImageUrls = await Promise.all(uploadPromises);

//             // If we deleted all old images and are adding new ones, replace completely
//             if (imagesToDelete?.length === product.image.length) {
//                 product.image = newImageUrls;
//             } else {
//                 // Otherwise combine
//                 product.image = [...product.image, ...newImageUrls];
//             }
//         }

//         await product.save();
//         res.status(200).json({ message: "Product updated successfully", product });
//     } catch (error) {
//         console.error("Update product error:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, discounts } = req.body;
    const files = req.files;

    // Get imagesToDelete from req.body (might be string or array)
    let imagesToDelete = req.body.imagesToDelete;
    // Convert to array if it's a string
    if (imagesToDelete && !Array.isArray(imagesToDelete)) {
      imagesToDelete = [imagesToDelete];
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (product.supplier.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this product." });
    }

    // Update basic fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;

    // Handle discounts if provided
    if (discounts) {
      try {
        // Parse discounts if it's a string (might come as JSON string)
        const parsedDiscounts =
          typeof discounts === "string" ? JSON.parse(discounts) : discounts;

        // Validate discounts structure
        if (Array.isArray(parsedDiscounts)) {
          parsedDiscounts.forEach((discount) => {
            if (
              typeof discount.minQuantity !== "number" ||
              typeof discount.discountedPrice !== "number"
            ) {
              throw new Error("Invalid discount structure");
            }
          });
          product.discounts = parsedDiscounts;
        } else {
          throw new Error("Discounts must be an array");
        }
      } catch (error) {
        return res.status(400).json({
          message: "Invalid discounts format: " + error.message,
        });
      }
    }

    // Handle image deletions if any
    if (imagesToDelete && imagesToDelete.length > 0) {
      // Delete from Cloudinary
      const deletePromises = imagesToDelete.map((imageUrl) => {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        return cloudinary.uploader.destroy(`productImages/${publicId}`);
      });

      await Promise.all(deletePromises);

      // Remove from product's image array
      product.image = product.image.filter(
        (img) => !imagesToDelete.includes(img)
      );
    }

    // Handle new image uploads
    if (files && files.length > 0) {
      const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "productImages" }, (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            })
            .end(file.buffer);
        });
      });

      const newImageUrls = await Promise.all(uploadPromises);

      // If we deleted all old images and are adding new ones, replace completely
      if (imagesToDelete?.length === product.image.length) {
        product.image = newImageUrls;
      } else {
        // Otherwise combine
        product.image = [...product.image, ...newImageUrls];
      }
    }

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: error.message });
  }
};
// Delete a Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Ensure the logged-in supplier owns the product
    if (product.supplier.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this product." });
    }

    // Chat gpt
    const activeOrders = await Order.find({
      productId: product._id,
      status: { $ne: "completed" }, // Check for orders that are not completed
    });

    if (activeOrders.length > 0) {
      // If there are active orders, prevent deletion
      return res.status(400).json({
        message:
          "Product cannot be deleted because it is associated with active orders.",
      });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkProductForActiveOrders = async (req, res) => {
  try {
    const { id } = req.params; // Get product ID from URL

    // Check if the product is associated with any active orders
    const activeOrders = await Order.find({
      productId: id,
      status: { $ne: "completed" } // Exclude orders that are completed
    });

    // Return the count of active orders
    res.status(200).json({ activeOrders: activeOrders.length });
  } catch (error) {
    res.status(500).json({ message: "Error checking product orders", error });
  }
};


// Controller to toggle the enable_view field
exports.toggleProductView = async (req, res) => {
  try {
    const { id } = req.params; // Get the product ID from the request params

    // Find the product by ID
    const product = await Product.findById(id);

    // If the product doesn't exist, return a 404 error
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Ensure the logged-in supplier owns the product
    if (product.supplier.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to modify this product." });
    }

    // Toggle the enable_view field
    product.enable_view = !product.enable_view; // If it's true, set to false and vice versa

    // Save the updated product
    await product.save();

    // Return a success message along with the updated product
    res.status(200).json({ message: `Product view status updated to ${product.enable_view ? "enabled" : "disabled"}.`, product });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: "Error toggling product view status.", error });
  }
};

exports.getProductsBySupplier = async (req, res) => {
  try {
    if (req.user.role !== "supplier") {
      return res
        .status(403)
        .json({ message: "Only suppliers can view their products." });
    }

    const products = await Product.find({ supplier: req.user.id });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this supplier." });
    }

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
// exports.getAllProducts = async (req, res) => {
//     try {
//         // Fetch products and populate the supplier field to get the supplier details
//         const products = await Product.find()
//             .populate('supplier', 'name city') // Populating supplier details (name and city)
//             .exec();

//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Example: controller function
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("supplier", "name city profilePicture");

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Failed to load products" });
  }
};


// controllers/productController.js
// exports.getAllProducts = async (req, res) => {
//   try {
//     const { category, limit, exclude } = req.query;
//     let query = {};

//     if (category) {
//       query.category = category;
//     }
//     if (exclude) {
//       query._id = { $ne: exclude };
//     }

//     let productsQuery = Product.find(query).populate(
//       "supplier",
//       "name profilePicture city"
//     );

//     if (limit) {
//       productsQuery = productsQuery.limit(parseInt(limit));
//     }

//     const products = await productsQuery.exec();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "supplier",
      "name email profilePicture adminVerified"
    ); // Adding profilePicture to the fields to populate

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("favorites");
    if (!user) return res.status(404).json({ message: "User not found" });

    const favoriteCategories = [
      ...new Set(user.favorites.map((product) => product.category)),
    ];

    if (favoriteCategories.length === 0) {
      return res.status(200).json([]); // No favorites = no recommendations
    }

    const recommendations = await Product.find({
      category: { $in: favoriteCategories },
      _id: { $nin: user.favorites.map((p) => p._id) },
    }).limit(10);

    res.json(recommendations);
  } catch (error) {
    console.error("Error generating recommendations:", error);
    res.status(500).json({ message: "Server error" });
  }
};
