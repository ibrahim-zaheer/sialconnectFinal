const express = require("express");

const User = require("../../models/User"); // Import User model


const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
  };


  // Export the functions for routes
  module.exports =  { getAllUsers };