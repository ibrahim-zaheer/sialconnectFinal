import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../assets/css/landingPage.css";
import ProductImage from "../assets/images/image-1.jpg";
import Footer from "./footer";


// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/SupplierProducts?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white mt-16">
      {/* Hero Section */}
      <section className="w-full h-screen flex items-center px-4 sm:px-8 lg:px-16 xl:px-24 bg-gradient-to-r from-primary-50 to-white">
        <motion.div 
          className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16 xl:gap-24"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-800 leading-tight"
            >
              Connecting Exporters with <span className="text-primary-600">Reliable</span> Suppliers
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-primary-600 max-w-2xl mx-auto lg:mx-0"
            >
              SialConnect simplifies product sourcing by bridging the gap between exporters and trusted suppliers. 
              Find, compare, and negotiate - all in one platform.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0"
            >
              <input
                type="text"
                placeholder="Search products or suppliers..."
                className="flex-grow px-6 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
              />
              <motion.button 
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearchSubmit}
              >
                Search
              </motion.button>
            </motion.div>
          </div>

          {/* Image Content */}
          <motion.div 
            variants={scaleUp}
            className="lg:w-1/2 mt-12 lg:mt-0"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary-200 rounded-2xl rotate-3 opacity-30"></div>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Business networking"
                className="relative rounded-2xl shadow-xl object-cover w-full h-[400px] lg:h-[500px]"
              />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-primary-100"
              >
                <div className="flex items-center">
                  <div className="bg-primary-100 p-3 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-primary-800">1000+</p>
                    <p className="text-sm text-primary-600">Successful Matches</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Best Selling Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="w-[90vw] md:w-[80vw] mx-auto py-16"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2">
            Best Selling
          </h2>
          <p className="text-primary-600">
            Get in on the trend with our curated selection of best-selling styles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div
                className={`h-64 ${
                  item === 1
                    ? "bg-primary-800"
                    : item === 2
                    ? "bg-primary-700"
                    : "bg-primary-600"
                } flex items-center justify-center`}
              >
                <motion.img
                  src={ProductImage}
                  alt="Product"
                  className="w-48 h-48 object-cover rounded-lg"
                  whileHover={{ scale: 1.05 }}
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-primary-800 mb-2">
                  {item === 1
                    ? "Regular Fit Long Sleeve Top"
                    : item === 2
                    ? "Black Crop Tailored Jacket"
                    : "Textured Sunset Shirt"}
                </h3>
                <p className="text-primary-600 font-semibold mb-3">
                  {item === 1 ? "$38.99" : item === 2 ? "$62.99" : "$49.99"}
                </p>
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < (item === 2 ? 4 : 5)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.202c.969 0 1.371 1.24.588 1.81l-3.404 2.473a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.404-2.473a1 1 0 00-1.176 0l-3.404 2.473c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.215 9.401c-.783-.57-.38-1.81.588-1.81h4.202a1 1 0 00.95-.69l1.286-3.974z" />
                    </svg>
                  ))}
                  <span className="text-sm text-primary-700 ml-1">
                    {item === 2 ? "4.9" : "5.0"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={itemVariants}
          className="text-center mt-12"
        >
          <button 
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
            onClick={() => navigate('/products')}
          >
            See all products →
          </button>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="w-[90vw] md:w-[80vw] mx-auto my-20 bg-primary-800 rounded-xl p-12 text-white"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            Join Our Sustainable Fashion Movement
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="mb-8 text-primary-100"
          >
            Be part of the change towards a more eco-conscious wardrobe without
            compromising on style.
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              className="bg-white text-primary-800 hover:bg-primary-50 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
              onClick={() => navigate('/products')}
            >
              Explore
            </button>
            <button 
              className="border border-white text-white hover:bg-primary-700 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/register')}
            >
              Sign Up
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Best Supplier Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="w-[90vw] md:w-[80vw] mx-auto py-16"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2">
            Trusted Suppliers
          </h2>
          <p className="text-primary-600">
            Partnered with the best to bring you quality products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div
                className={`h-48 ${
                  item === 1
                    ? "bg-primary-100"
                    : item === 2
                    ? "bg-primary-200"
                    : "bg-primary-300"
                } flex items-center justify-center`}
              >
                <motion.div 
                  whileHover={{ rotate: 5 }}
                  className="w-32 h-32 rounded-full bg-white/30 flex items-center justify-center"
                >
                  <span className="text-primary-800 font-medium">
                    Supplier Logo
                  </span>
                </motion.div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-primary-800 mb-2">
                  {item === 1
                    ? "EcoFabric Inc."
                    : item === 2
                    ? "GreenStitch Co."
                    : "Sustainable Styles"}
                </h3>
                <p className="text-primary-600">
                  {item === 1
                    ? "Premium organic materials since 2010"
                    : item === 2
                    ? "Ethical manufacturing practices"
                    : "Innovative sustainable designs"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="w-[90vw] md:w-[80vw] mx-auto py-20"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2">
            Customer Voices
          </h2>
          <p className="text-primary-600">What our community says about us</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Emily Wilson",
              text: "I love how these clothes make me feel good about my fashion choices. The quality is outstanding and they're so comfortable!",
            },
            {
              name: "Sarah Thompson",
              text: "Finally found a brand that aligns with my values. The pieces are stylish, durable, and ethically made. Worth every penny!",
            },
            {
              name: "Olivia Martinez",
              text: "The customer service is exceptional and the clothes are even better than I expected. I'm slowly replacing my entire wardrobe with their pieces.",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-xl transition-all duration-300 ${
                index === 1 ? "bg-primary-800 text-white" : "bg-white shadow-md"
              }`}
            >
              <span className="text-3xl font-bold text-primary-400 mb-4 block">
                "
              </span>
              <p className="mb-6 italic">{testimonial.text}</p>
              <p className="font-semibold">— {testimonial.name}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={itemVariants}
          className="flex justify-center gap-4 mt-12"
        >
          <button className="p-3 border border-primary-300 rounded-md hover:bg-primary-50 transition-all duration-300">
            ←
          </button>
          <button className="p-3 border border-primary-300 rounded-md bg-primary-100 hover:bg-primary-200 transition-all duration-300">
            →
          </button>
        </motion.div>
      </motion.section>

      <Footer />
    </div>
  );
}