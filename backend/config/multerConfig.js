// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('./cloudinaryConfig'); // Only one import

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'profile_pictures',
//     allowed_formats: ['jpg', 'png', 'jpeg'],
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;


const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig'); // Import your Cloudinary config

// Create storage for profile pictures
const profilePictureStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_pictures', // Folder for profile pictures
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

// Create storage for product images
const productImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'productImages', // Folder for product images
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

// Set up multer upload for profile picture
const uploadProfilePicture = multer({ storage: profilePictureStorage });

// Set up multer upload for product images
const uploadProductImage = multer({ storage: productImageStorage });

module.exports = { uploadProfilePicture, uploadProductImage };
