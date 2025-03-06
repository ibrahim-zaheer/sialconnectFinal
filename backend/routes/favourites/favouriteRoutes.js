const express = require("express");

const router = express.Router();


const {addToFavorites,getFavorites,removeFromFavorites, getFavoritesById} = require("../../controllers/favourites/favourite_controller");


router.post('/add-to-favorites', addToFavorites);
router.post('/remove-from-favorites', removeFromFavorites);
router.get('/favorites/:userId',getFavorites);

router.get('/favorites/id/:userId',getFavoritesById);

module.exports = router;