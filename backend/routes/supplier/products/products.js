// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const productController = require("../../../controllers/productController");
const authenticateMiddleware = require("../../../middleware/authMiddleware");
const {uploadProductImage} = require("../../../config/multerConfig");

const checkStatus = require("../../../middleware/checkStatus");

// router.get("/read", authenticateMiddleware, productController.getProductsBySupplier);

// router.get("/create", authenticateMiddleware, productController.createProduct);

// router.get("/update", authenticateMiddleware, productController.updateProduct);

// router.get("/delete", authenticateMiddleware, productController.deleteProduct);
router.get("/recommendations",authenticateMiddleware,productController.getRecommendations);

router.get("/read", authenticateMiddleware, productController.getProductsBySupplier);
// router.post("/create", authenticateMiddleware,uploadProductImage.single("image") ,productController.createProduct);
router.post(
    "/create",
    authenticateMiddleware,checkStatus,
    uploadProductImage.array("images", 5), // Accept up to 5 images
    productController.createProduct
  );
router.put("/update/:id", authenticateMiddleware,  uploadProductImage.array("images", 5),productController.updateProduct);
router.delete("/delete/:id", authenticateMiddleware, productController.deleteProduct);



//for reading all the products
router.get("/readAllProducts",productController.getAllProducts)


// for viewing all the details of the suppliers
router.get("/:id", productController.getProductDetails);




module.exports = router;