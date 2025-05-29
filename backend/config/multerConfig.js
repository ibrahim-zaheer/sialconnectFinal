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

const storage = multer.memoryStorage(); 
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

// Storage for sample images
const sampleImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sample_images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const localTransactionprof = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'local_transaction_proof',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

// Set up multer upload for profile picture
const uploadProfilePicture = multer({ storage: profilePictureStorage });

// Set up multer upload for product images
// const uploadProductImage = multer({ storage: productImageStorage });
const uploadProductImage = multer({ storage });

const uploadStoreImage = multer({ storage });

const uploadSampleImage = multer({ storage: sampleImageStorage }); // New upload for samples

const uploadTransactionProof = multer({ storage: localTransactionprof });

module.exports = { uploadProfilePicture, uploadProductImage,uploadSampleImage,uploadTransactionProof, uploadStoreImage };
