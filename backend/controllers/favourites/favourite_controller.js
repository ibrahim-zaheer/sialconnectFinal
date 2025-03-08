const express = require("express");
const User = require("../../models/User");
const Product = require("../../models/Product");


const addToFavorites = async (req, res) => {
    try {
      const { userId, productId } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      //Check if the product is already in favorites
      if (user.favorites.includes(productId)) {
        return res.status(400).json({ message: 'Product already in favorites' });
       
      }
  
      user.favorites.push(productId);
      await user.save();
  
      res.status(200).json({ message: 'Product added to favorites', user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };


  const removeFromFavorites = async (req, res) => {
    try {
      const { userId, productId } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.favorites = user.favorites.filter((id) => id.toString() !== productId);
      await user.save();
  
      res.status(200).json({ message: 'Product removed from favorites', user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };


  const getFavorites = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId).populate('favorites');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ favorites: user.favorites });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  // Backend: Fetch user's favorites
const getFavoritesById = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId).populate('favorites');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Extract only the product IDs
      const favoriteIds = user.favorites.map((product) => product._id);
  
      res.status(200).json({ favorites: favoriteIds });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  



  module.exports =  {  removeFromFavorites,addToFavorites,getFavorites,getFavoritesById};