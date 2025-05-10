import React, { useState, useEffect } from "react";
import axios from "axios";

export const fetchRecommendedProducts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/supplier/product/recommendations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recommended products:", error);
    return [];
  }
};


