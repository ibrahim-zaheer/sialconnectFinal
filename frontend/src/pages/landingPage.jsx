// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useTranslation, Trans } from "react-i18next";
// import "../assets/css/landingPage.css";
// import Footer from "./footer";
// import ProductSearch from "../components/ProductSearch";
// import TopProducts from "../components/TopProducts";
// import { useSelector } from "react-redux";
// import TopSuppliers from "../components/TopSuppliers";
// import RecommendedProducts from "../components/Exporter/products/RecommendedProducts";

// // Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.3,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

// const fadeIn = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       duration: 0.8,
//       ease: "easeOut",
//     },
//   },
// };

// const scaleUp = {
//   hidden: { scale: 0.95, opacity: 0 },
//   visible: {
//     scale: 1,
//     opacity: 1,
//     transition: {
//       duration: 0.8,
//       ease: "easeOut",
//     },
//   },
// };

// export default function LandingPage() {
//   const { t } = useTranslation();
//   const user = useSelector((state) => state.user);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const testimonialsRef = useRef(null);
//   const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

//   // Industrial-themed images
//   const heroImage =
//     "https://www.just-style.com/wp-content/uploads/sites/27/2024/08/pak.jpg";
//   const backgroundPattern =
//     "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&auto=format&fit=crop";

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchSubmit = () => {
//     if (searchQuery.trim()) {
//       navigate(
//         `/SupplierProducts?search=${encodeURIComponent(searchQuery.trim())}`
//       );
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearchSubmit();
//     }
//   };

//   // Safely get testimonials data
//   const getTestimonials = () => {
//     try {
//       const quotes = t("testimonials.quotes", { returnObjects: true });
//       return Array.isArray(quotes) ? quotes : [];
//     } catch (error) {
//       console.error("Error loading testimonials:", error);
//       return [];
//     }
//   };

//   const testimonials = getTestimonials();

//   // Testimonial carousel logic
//   useEffect(() => {
//     if (!isAutoPlaying || testimonials.length <= 1) return;

//     const interval = setInterval(() => {
//       setCurrentTestimonialIndex((prev) =>
//         prev === testimonials.length - 1 ? 0 : prev + 1
//       );
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [testimonials.length, isAutoPlaying]);

//   const goToTestimonial = (index) => {
//     setIsAutoPlaying(false);
//     setCurrentTestimonialIndex(index);
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   const nextTestimonial = () => {
//     goToTestimonial(
//       currentTestimonialIndex === testimonials.length - 1
//         ? 0
//         : currentTestimonialIndex + 1
//     );
//   };

//   const prevTestimonial = () => {
//     goToTestimonial(
//       currentTestimonialIndex === 0
//         ? testimonials.length - 1
//         : currentTestimonialIndex - 1
//     );
//   };

//   // Extra work
//   useEffect(() => {
//     const canvas = /** @type {HTMLCanvasElement} */ (
//       document.getElementById("node-canvas")
//     );
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");

//     let w, h;
//     const resize = () => {
//       w = canvas.width = window.innerWidth;
//       h = canvas.height = window.innerHeight;
//     };
//     window.addEventListener("resize", resize);
//     resize();

//     // ----- create nodes -----
//     let nodes = Array.from({ length: 70 }, () => ({
//       x: Math.random() * w,
//       y: Math.random() * h,
//       vx: (Math.random() - 0.5) * 0.4,
//       vy: (Math.random() - 0.5) * 0.4,
//       r: Math.random() * 2 + 1,
//     }));

//     // ----- animation loop -----
//     const draw = () => {
//       ctx.clearRect(0, 0, w, h);

//       // lines
//       for (let i = 0; i < nodes.length; i++) {
//         for (let j = i + 1; j < nodes.length; j++) {
//           const dx = nodes[i].x - nodes[j].x;
//           const dy = nodes[i].y - nodes[j].y;
//           const d = Math.hypot(dx, dy);
//           if (d < 120) {
//             ctx.beginPath();
//             ctx.strokeStyle = `rgba(0,246,255,${1 - d / 120})`;
//             ctx.lineWidth = 0.5;
//             ctx.moveTo(nodes[i].x, nodes[i].y);
//             ctx.lineTo(nodes[j].x, nodes[j].y);
//             ctx.stroke();
//           }
//         }
//       }

//       // dots
//       for (const n of nodes) {
//         ctx.beginPath();
//         ctx.fillStyle = "rgba(0,246,255,0.9)";
//         ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
//         ctx.fill();
//       }
//     };

//     const update = () => {
//       for (const n of nodes) {
//         n.x += n.vx;
//         n.y += n.vy;
//         if (n.x < 0 || n.x > w) n.vx *= -1;
//         if (n.y < 0 || n.y > h) n.vy *= -1;
//       }
//     };

//     const loop = () => {
//       draw();
//       update();
//       requestAnimationFrame(loop);
//     };
//     loop();

//     return () => window.removeEventListener("resize", resize);
//   }, []);
//   // Extra work

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-16">
//       {/* Hero Section */}
//       <section className="w-full h-screen flex items-center px-4 sm:px-8 lg:px-16 xl:px-24 relative overflow-hidden">
//         {/* Professional Abstract Background */}
//         <div className="absolute inset-0 z-0 overflow-hidden">
//           {/* Soft multi-tone gradient */}
//           <canvas
//             id="node-canvas"
//             className="w-full h-full block"
//             style={{ position: "absolute", top: 0, left: 0 }}
//           />
//           <div className="absolute inset-0 animate-background bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-gray-900 to-black opacity-80" />

//           {/* Abstract vector pattern overlay */}
//           <svg
//             className="absolute w-full h-full opacity-10"
//             viewBox="0 0 800 600"
//             preserveAspectRatio="xMidYMid slice"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="1">
//                 <stop offset="0%" stopColor="#00f6ff" />
//                 <stop offset="100%" stopColor="#0fffc1" />
//               </linearGradient>
//             </defs>

//             {[...Array(5)].map((_, i) => (
//               <path
//                 key={i}
//                 d={`M0 ${100 + i * 100} C 200 ${50 + i * 50}, 600 ${
//                   150 + i * 50
//                 }, 800 ${100 + i * 100}`}
//                 fill="none"
//                 stroke="url(#lineGradient)"
//                 strokeWidth="2"
//               >
//                 <animate
//                   attributeName="d"
//                   dur="10s"
//                   repeatCount="indefinite"
//                   values={`
//             M0 ${100 + i * 100} C 200 ${50 + i * 50}, 600 ${
//                     150 + i * 50
//                   }, 800 ${100 + i * 100};
//             M0 ${90 + i * 100} C 250 ${30 + i * 50}, 550 ${170 + i * 50}, 800 ${
//                     110 + i * 100
//                   };
//             M0 ${100 + i * 100} C 200 ${50 + i * 50}, 600 ${
//                     150 + i * 50
//                   }, 800 ${100 + i * 100}
//           `}
//                 />
//               </path>
//             ))}
//           </svg>
//         </div>

//         <motion.div
//           className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16 xl:gap-24 relative z-10"
//           initial="hidden"
//           animate="visible"
//           variants={containerVariants}
//         >
//           {/* Text Content */}
//           <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
//             <motion.h1
//               variants={itemVariants}
//               className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg"
//             >
//               <Trans
//                 i18nKey="hero.title"
//                 components={{ 1: <span className="text-yellow-400" /> }}
//               />
//             </motion.h1>

//             <motion.p
//               variants={itemVariants}
//               className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
//             >
//               {t("hero.description")}
//             </motion.p>

//             <motion.div variants={itemVariants}>
//               <ProductSearch
//                 onProductSelect={(product) =>
//                   navigate(`/supplier/product/${product._id}`)
//                 }
//               />
//             </motion.div>
//           </div>

//           {/* Image Content */}
//           <motion.div variants={scaleUp} className="lg:w-1/2 mt-12 lg:mt-0">
//             <div className="relative">
//               <div className="absolute -inset-4 bg-white/10 rounded-2xl rotate-3 opacity-30"></div>
//               <img
//                 src={heroImage}
//                 alt="Industrial worker cutting metal"
//                 className="relative rounded-2xl shadow-xl object-cover w-full h-[400px] lg:h-[500px] border-4 border-white/20"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src =
//                     "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&auto=format&fit=crop";
//                 }}
//               />
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.8 }}
//                 className="absolute -bottom-6 -right-6 bg-white/90 p-4 rounded-xl shadow-lg border border-gray-300"
//               >
//                 <div className="flex items-center">
//                   <div className="bg-blue-100 p-3 rounded-lg mr-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-blue-600"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 10V3L4 14h7v7l9-11h-7z"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-800">
//                       {t("hero.stats.matches")}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       {t("hero.stats.matchesLabel")}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Best Selling Section */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         variants={containerVariants}
//         className="w-[90vw] md:w-[80vw] mx-auto py-16"
//       >
//         <motion.div variants={itemVariants} className="text-center mb-12">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
//             {t("bestSelling.title")}
//           </h2>
//           <p className="text-gray-600">{t("bestSelling.description")}</p>
//         </motion.div>

//         <TopProducts />

//         <motion.div variants={itemVariants} className="text-center mt-12">
//           <button
//             className="px-6 py-3 bg-primary-900 hover:bg-primary-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
//             onClick={() => navigate("/ExporterProducts")}
//           >
//             {t("bestSelling.seeAll")}
//           </button>
//         </motion.div>
//       </motion.section>

//       {/* Value Proposition Section */}
//       {/* <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={containerVariants}
//         className="w-full bg-gray-50 py-20"
//       >
//         <div className="w-[90vw] md:w-[80vw] mx-auto">
//           <motion.div variants={itemVariants} className="text-center mb-12">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
//               Why Trust Our Platform
//             </h2>
//             <p className="text-gray-600 max-w-3xl mx-auto">
//               {t('valueProps.description')}
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: (
//                   <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                   </svg>
//                 ),
//                 title: t('valueProps.features.0.title'),
//                 description: t('valueProps.features.0.description')
//               },
//               {
//                 icon: (
//                   <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
//                   </svg>
//                 ),
//                 title: t('valueProps.features.1.title'),
//                 description: t('valueProps.features.1.description')
//               },
//               {
//                 icon: (
//                   <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 ),
//                 title: t('valueProps.features.2.title'),
//                 description: t('valueProps.features.2.description')
//               }
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 whileHover={{ y: -5 }}
//                 className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
//               >
//                 <div className="flex justify-center mb-4">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{feature.title}</h3>
//                 <p className="text-gray-600 text-center">{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section> */}

//       {/* CTA Section */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={fadeIn}
//         className="w-[90vw] md:w-[80vw] mx-auto my-20 bg-primary-900 rounded-xl p-12 text-white"
//       >
//         <div className="max-w-2xl mx-auto text-center">
//           <motion.h2
//             variants={itemVariants}
//             className="text-2xl md:text-3xl font-bold mb-4"
//           >
//             {t("cta.title")}
//           </motion.h2>
//           <motion.p variants={itemVariants} className="mb-8 text-blue-100">
//             {t("cta.description")}
//           </motion.p>
//           <motion.div
//             variants={itemVariants}
//             className="flex flex-col sm:flex-row gap-4 justify-center"
//           >
//             <button
//               className="bg-white text-blue-800 hover:bg-primary-100 px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
//               onClick={() => navigate("/ExporterProducts")}
//             >
//               {t("cta.buttons.explore")}
//             </button>
//             {!user.role && (
//               <button
//                 className="border border-white text-white hover:bg-primary-600 px-6 py-3 rounded-lg transition-all duration-300"
//                 onClick={() => navigate("/signIn")}
//               >
//                 {t("cta.buttons.signUp")}
//               </button>
//             )}
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* Trusted Suppliers Section */}
//       {/* <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         variants={containerVariants}
//         className="w-[90vw] md:w-[80vw] mx-auto py-16"
//       >
//         <motion.div variants={itemVariants} className="text-center mb-12">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
//             {t("suppliers.title")}
//           </h2>
//           <p className="text-gray-600">{t("suppliers.description")}</p>
//         </motion.div>

//         <TopSuppliers />
//       </motion.section> */}

//       {/* Recommended Products Section */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         variants={containerVariants}
//         className="w-[90vw] md:w-[80vw] mx-auto py-16"
//       >
//         <RecommendedProducts maxItems={3} />
//       </motion.section>

//       {/* Testimonials */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={containerVariants}
//         className="w-[90vw] md:w-[80vw] mx-auto py-20 relative"
//       >
//         <motion.div variants={itemVariants} className="text-center mb-12">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
//             {t("testimonials.title")}
//           </h2>
//           <p className="text-gray-600">{t("testimonials.description")}</p>
//         </motion.div>

//         <div className="relative">
//           <button
//             onClick={prevTestimonial}
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 -ml-4"
//             aria-label="Previous testimonials"
//           >
//             <svg
//               className="w-6 h-6 text-gray-700"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           </button>

//           <div className="overflow-hidden">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{
//                 transform: `translateX(-${currentTestimonialIndex * 100}%)`,
//               }}
//             >
//               {testimonials.map((testimonial, index) => (
//                 <motion.div
//                   key={index}
//                   className="w-full flex-shrink-0 px-4"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <div
//                     className={`p-8 rounded-xl transition-all duration-300 mx-auto max-w-2xl ${
//                       index % 3 === 1
//                         ? "bg-blue-800 text-white"
//                         : "bg-white shadow-md"
//                     }`}
//                   >
//                     <div className="flex items-center mb-4">
//                       <div
//                         className={`w-12 h-12 rounded-full ${
//                           index % 3 === 1 ? "bg-blue-700" : "bg-blue-100"
//                         } flex items-center justify-center mr-4`}
//                       >
//                         <span
//                           className={`text-lg font-bold ${
//                             index % 3 === 1 ? "text-white" : "text-blue-800"
//                           }`}
//                         >
//                           {testimonial.author.charAt(0)}
//                         </span>
//                       </div>
//                       <div>
//                         <p className="font-semibold">{testimonial.author}</p>
//                         {/* <p className={`text-sm ${index % 3 === 1 ? "text-blue-200" : "text-gray-500"}`}>
//                           {testimonial.role || t('testimonials.defaultRole')}
//                         </p> */}
//                       </div>
//                     </div>
//                     <p className="italic">"{testimonial.text}"</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={nextTestimonial}
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 -mr-4"
//             aria-label="Next testimonials"
//           >
//             <svg
//               className="w-6 h-6 text-gray-700"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Testimonial indicators */}
//         {testimonials.length > 1 && (
//           <div className="flex justify-center mt-8 space-x-2">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToTestimonial(index)}
//                 className={`w-3 h-3 rounded-full transition-all ${
//                   currentTestimonialIndex === index
//                     ? "bg-primary-700 w-6"
//                     : "bg-gray-300"
//                 }`}
//                 aria-label={`Go to testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         )}
//       </motion.section>

//       <Footer />
//     </div>
//   );
// }

// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useTranslation, Trans } from "react-i18next";
// import "../assets/css/landingPage.css";
// import heroImage from "../assets/images/sial.jpg";
// import Footer from "./footer";
// import ProductSearch from "../components/ProductSearch";
// import TopProducts from "../components/TopProducts";
// import TopSuppliers from "../components/TopSuppliers";
// import RecommendedProducts from "../components/Exporter/products/RecommendedProducts";
// import { useSelector } from "react-redux";
// import PricingPage from "./pricing/PricingPage";

// /* ────────────────────────────────────────────────────────────
//    Animation variants
//    ──────────────────────────────────────────────────────────── */
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1, delayChildren: 0.3 },
//   },
// };
// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
// };
// const fadeIn = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
// };
// const scaleUp = {
//   hidden: { scale: 0.95, opacity: 0 },
//   visible: {
//     scale: 1,
//     opacity: 1,
//     transition: { duration: 0.8, ease: "easeOut" },
//   },
// };

// /* ────────────────────────────────────────────────────────────
//    Neural-network background (pure Canvas)
//    ──────────────────────────────────────────────────────────── */
// const NeuralBackground = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     /* resize for Hi-DPI */
//     const resize = () => {
//       const { innerWidth: w, innerHeight: h, devicePixelRatio: dpr } = window;
//       canvas.width = w * dpr;
//       canvas.height = h * dpr;
//       canvas.style.width = `${w}px`;
//       canvas.style.height = `${h}px`;
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     /* node logic */
//     const COUNT = 40;
//     const MAX_DIST = 160;
//     const SPEED = 0.4;
//     let nodes = Array.from({ length: COUNT }, () => ({
//       x: Math.random() * window.innerWidth,
//       y: Math.random() * window.innerHeight,
//       vx: (Math.random() - 0.5) * SPEED,
//       vy: (Math.random() - 0.5) * SPEED,
//       r: Math.random() * 2 + 1.2,
//     }));

//     const step = () => {
//       nodes.forEach((n) => {
//         n.x += n.vx;
//         n.y += n.vy;
//         if (n.x < 0 || n.x > window.innerWidth) n.vx *= -1;
//         if (n.y < 0 || n.y > window.innerHeight) n.vy *= -1;
//       });
//     };

//     const draw = () => {
//       ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
//       /* connections */
//       for (let i = 0; i < nodes.length; i++) {
//         for (let j = i + 1; j < nodes.length; j++) {
//           const dx = nodes[i].x - nodes[j].x;
//           const dy = nodes[i].y - nodes[j].y;
//           const d = Math.hypot(dx, dy);
//           if (d < MAX_DIST) {
//             const o = 1 - d / MAX_DIST;
//             ctx.strokeStyle = `rgba(99,102,241,${o * 0.25})`;
//             ctx.beginPath();
//             ctx.moveTo(nodes[i].x, nodes[i].y);
//             ctx.lineTo(nodes[j].x, nodes[j].y);
//             ctx.stroke();
//           }
//         }
//       }
//       /* nodes */
//       ctx.fillStyle = "rgba(99,102,241,0.9)";
//       nodes.forEach((n) => {
//         ctx.beginPath();
//         ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
//         ctx.fill();
//       });
//     };

//     let raf;
//     const loop = () => {
//       step();
//       draw();
//       raf = requestAnimationFrame(loop);
//     };
//     loop();

//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("resize", resize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute inset-0 w-full h-full max-h-screen pointer-events-none opacity-60 z-10"
//     />
//   );
// };

// /* ────────────────────────────────────────────────────────────
//    Landing Page
//    ──────────────────────────────────────────────────────────── */
// export default function LandingPage() {
//   const { t } = useTranslation();
//   const user = useSelector((s) => s.user);
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   /* testimonials carousel */
//   const testimonials = t("testimonials.quotes", { returnObjects: true }) ?? [];
//   const [idx, setIdx] = useState(0);
//   const [auto, setAuto] = useState(true);

//   useEffect(() => {
//     if (!auto || testimonials.length <= 1) return;
//     const id = setInterval(
//       () => setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1)),
//       5000
//     );
//     return () => clearInterval(id);
//   }, [auto, testimonials.length]);

//   const goTo = (i) => {
//     setAuto(false);
//     setIdx(i);
//     setTimeout(() => setAuto(true), 10000);
//   };

//   // const heroImage =
//   //   "https://www.just-style.com/wp-content/uploads/sites/27/2024/08/pak.jpg";

//   return (
//     <div className="min-h-screen mx-auto bg-white text-gray-900 mt-10 font-sans">
//       {/* ────────── Hero ────────── */}
//       <section className="relative w-full min-h-[90vh] flex items-center px-4 sm:px-8 lg:px-16 xl:px-24 overflow-hidden">
//         <div className="absolute inset-0 z-0" />
//         <NeuralBackground />

//         <motion.div
//           className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-16 px-4 sm:px-8 lg:px-0 relative z-20"
//           initial="hidden"
//           animate="visible"
//           variants={containerVariants}
//         >
//           {/* text */}
//           <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
//             <motion.h1
//               variants={itemVariants}
//               className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-xl"
//             >
//               <Trans
//                 i18nKey="hero.title"
//                 components={{ 1: <span className="text-indigo-600" /> }}
//               />
//             </motion.h1>
//             <motion.p
//               variants={itemVariants}
//               className="text-lg md:text-xl max-w-2xl mx-auto lg:mx-0"
//             >
//               {t("hero.description")}
//             </motion.p>
//             <motion.div variants={itemVariants}>
//               <ProductSearch
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 onKeyPress={(e) =>
//                   e.key === "Enter" &&
//                   query.trim() &&
//                   navigate(
//                     `/SupplierProducts?search=${encodeURIComponent(
//                       query.trim()
//                     )}`
//                   )
//                 }
//                 onProductSelect={(p) => navigate(`/supplier/product/${p._id}`)}
//               />
//             </motion.div>
//           </div>

//           {/* image */}
//           <motion.div variants={scaleUp} className="lg:w-1/2 lg:mt-0">
//             <div className="relative">
//               <div className="absolute -inset-4 bg-indigo-500/20 rounded-2xl rotate-3" />
//               <img
//                 src={heroImage}
//                 alt="Industry"
//                 className="relative rounded-2xl shadow-xl object-cover w-full border border-indigo-400/40"
//                 onError={(e) =>
//                   (e.target.src =
//                     "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&auto=format&fit=crop")
//                 }
//               />
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.8 }}
//                 className="absolute -bottom-6 -right-6 bg-indigo-900/90 p-4 rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm"
//               >
//                 <div className="flex items-center">
//                   <div className="bg-indigo-500/20 p-3 rounded-lg mr-3 border border-indigo-400/30">
//                     <svg
//                       className="h-6 w-6 text-indigo-300"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M13 10V3L4 14h7v7l9-11h-7z"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="font-bold text-white">
//                       {t("hero.stats.matches")}
//                     </p>
//                     <p className="text-sm text-indigo-200">
//                       {t("hero.stats.matchesLabel")}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* ────────── Best-selling ────────── */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         variants={containerVariants}
//         className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto py-16"
//       >
//         {/* <motion.div variants={itemVariants} className="text-center mb-12">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//             {t("bestSelling.title")}
//           </h2>
//           <p className="text-gray-500">{t("bestSelling.description")}</p>
//         </motion.div> */}

//         {/* Grid for Top Products */}
//         <motion.div
//           variants={itemVariants}
//           className="w-full md:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
//         >
//           <TopProducts />
//         </motion.div>

//         <motion.div variants={itemVariants} className="text-center mt-12">
//           <button
//             className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-md"
//             onClick={() => navigate("/ExporterProducts")}
//           >
//             {t("bestSelling.seeAll")}
//           </button>
//         </motion.div>
//       </motion.section>

//       {/* ────────── CTA ────────── */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={fadeIn}
//         className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto my-20 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl py-12 text-white"
//       >
//         <div className="max-w-2xl  mx-auto text-center">
//           <motion.h2
//             variants={itemVariants}
//             className="text-2xl md:text-3xl font-bold mb-4"
//           >
//             {t("cta.title")}
//           </motion.h2>
//           <motion.p variants={itemVariants} className="mb-8 text-indigo-100">
//             {t("cta.description")}
//           </motion.p>
//           <motion.div
//             variants={itemVariants}
//             className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
//           >
//             <button
//               className="bg-white text-indigo-800 hover:bg-gray-100 px-6 py-3 rounded-lg transition-all shadow-md"
//               onClick={() => navigate("/ExporterProducts")}
//             >
//               {t("cta.buttons.explore")}
//             </button>
//             {!user.role && (
//               <button
//                 className="border border-white text-white hover:bg-indigo-700 px-6 py-3 rounded-lg transition-all"
//                 onClick={() => navigate("/signIn")}
//               >
//                 {t("cta.buttons.signUp")}
//               </button>
//             )}
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* ────────── Suppliers ────────── */}
//       {/* <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         variants={containerVariants}
//         className="w-[90vw] md:w-[80vw] mx-auto py-16"
//       >
//         <motion.div variants={itemVariants} className="text-center mb-12">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//             {t("suppliers.title")}
//           </h2>
//           <p className="text-gray-500">{t("suppliers.description")}</p>
//         </motion.div>
//         <TopSuppliers />
//       </motion.section> */}

//       {/* ────────── Recommended Products ────────── */}
//       <motion.section
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         variants={containerVariants}
//         className="w-[90vw] md:max-w-6xl mx-auto py-16"
//       >
//         <RecommendedProducts maxItems={3} />
//       </motion.section>

//       {user?.role === "exporter" && <PricingPage />}

//       {/* ────────── Testimonials ────────── */}
//       {testimonials.length > 0 && (
//         <motion.section
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={containerVariants}
//           className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto py-20 relative"
//         >
//           <motion.div variants={itemVariants} className="text-center mb-12">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//               {t("testimonials.title")}
//             </h2>
//             <p className="text-gray-500">{t("testimonials.description")}</p>
//           </motion.div>

//           {/* arrows */}
//           <button
//             onClick={() => goTo(idx === 0 ? testimonials.length - 1 : idx - 1)}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow-md -ml-4"
//             aria-label="Prev"
//           >
//             <svg
//               className="w-5 h-5 text-gray-700"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           </button>

//           {/* carousel */}
//           <div className="overflow-hidden">
//             <div
//               className="flex transition-transform duration-500 w-full flex-nowrap"
//               style={{ transform: `translateX(-${idx * 100}%)` }}
//             >
//               {testimonials.map((tst, i) => (
//                 <motion.div
//                   key={i}
//                   className="w-full flex-shrink-0 px-4 sm:px-6"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                 >
//                   <div
//                     className={`p-8 rounded-xl max-w-2xl mx-auto shadow-md ${
//                       i % 2 ? "bg-indigo-50" : "bg-gray-50"
//                     }`}
//                   >
//                     <div className="flex items-center mb-4">
//                       <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
//                         <span className="text-lg font-bold text-indigo-600">
//                           {tst.author.charAt(0)}
//                         </span>
//                       </div>
//                       <p className="font-semibold text-gray-800">
//                         {tst.author}
//                       </p>
//                     </div>
//                     <p className="italic text-gray-700">“{tst.text}”</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={() => goTo(idx === testimonials.length - 1 ? 0 : idx + 1)}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow-md -mr-4"
//             aria-label="Next"
//           >
//             <svg
//               className="w-5 h-5 text-gray-700"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>

//           {/* indicators */}
//           {testimonials.length > 1 && (
//             <div className="flex justify-center mt-8 space-x-2">
//               {testimonials.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => goTo(i)}
//                   className={`h-3 rounded-full transition-all ${
//                     idx === i ? "bg-indigo-600 w-6" : "bg-gray-400 w-3"
//                   }`}
//                   aria-label={`go to testimonial ${i + 1}`}
//                 />
//               ))}
//             </div>
//           )}
//         </motion.section>
//       )}

//       {/* ────────── Footer ────────── */}
//       <Footer />
//     </div>
//   );
// }

// =====================================

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import "../assets/css/landingPage.css";
import heroImage from "../assets/images/sial.jpg";
import Footer from "./footer";
import ProductSearch from "../components/ProductSearch";
import TopProducts from "../components/TopProducts";
import TopSuppliers from "../components/TopSuppliers";
import RecommendedProducts from "../components/Exporter/products/RecommendedProducts";
import { useSelector } from "react-redux";
import PricingPage from "./pricing/PricingPage";

/* ────────────────────────────────────────────────────────────
   Animation variants
   ──────────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};
const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/* ────────────────────────────────────────────────────────────
   Neural-network background (pure Canvas)
   ──────────────────────────────────────────────────────────── */
const NeuralBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    /* resize for Hi-DPI */
    const resize = () => {
      const { innerWidth: w, innerHeight: h, devicePixelRatio: dpr } = window;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    /* node logic */
    const COUNT = 40;
    const MAX_DIST = 160;
    const SPEED = 0.4;
    let nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 2 + 1.2,
    }));

    const step = () => {
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > window.innerWidth) n.vx *= -1;
        if (n.y < 0 || n.y > window.innerHeight) n.vy *= -1;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      /* connections */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_DIST) {
            const o = 1 - d / MAX_DIST;
            ctx.strokeStyle = `rgba(99,102,241,${o * 0.25})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      /* nodes */
      ctx.fillStyle = "rgba(99,102,241,0.9)";
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    let raf;
    const loop = () => {
      step();
      draw();
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full max-h-screen pointer-events-none opacity-60 z-10"
    />
  );
};

/* ────────────────────────────────────────────────────────────
   Landing Page
   ──────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const { t } = useTranslation();
  const user = useSelector((s) => s.user);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  /* testimonials carousel */
  const testimonials = t("testimonials.quotes", { returnObjects: true }) ?? [];
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || testimonials.length <= 1) return;
    const id = setInterval(
      () => setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1)),
      5000
    );
    return () => clearInterval(id);
  }, [auto, testimonials.length]);

  const goTo = (i) => {
    setAuto(false);
    setIdx(i);
    setTimeout(() => setAuto(true), 10000);
  };

  return (
    <div className="min-h-screen mx-auto bg-white text-gray-900 mt-10 font-sans overflow-x-hidden">
      {/* ────────── Hero ────────── */}
      <section className="relative w-full min-h-[90vh] flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 overflow-hidden">
        <div className="absolute inset-0 z-0" />
        <NeuralBackground />

        <motion.div
          className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 px-4 sm:px-6 lg:px-0 relative z-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* text */}
          <div className="lg:w-1/2 space-y-4 md:space-y-6 text-center lg:text-left">
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-xl"
            >
              <Trans
                i18nKey="hero.title"
                components={{ 1: <span className="text-indigo-600" /> }}
              />
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0"
            >
              {t("hero.description")}
            </motion.p>
            <motion.div variants={itemVariants} className="px-2 sm:px-0 mt-5">
              <ProductSearch
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  query.trim() &&
                  navigate(
                    `/SupplierProducts?search=${encodeURIComponent(
                      query.trim()
                    )}`
                  )
                }
                onProductSelect={(p) => navigate(`/supplier/product/${p._id}`)}
              />
            </motion.div>
          </div>

          {/* image */}
          <motion.div variants={scaleUp} className="lg:w-1/2 mt-8 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-indigo-500/20 rounded-xl md:rounded-2xl rotate-3" />
              <img
                src={heroImage}
                alt="Industry"
                className="relative rounded-xl md:rounded-2xl shadow-xl object-cover w-full border border-indigo-400/40"
                onError={(e) =>
                  (e.target.src =
                    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&auto=format&fit=crop")
                }
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-indigo-900/90 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg border border-gray-700 backdrop-blur-sm"
              >
                <div className="flex items-center">
                  <div className="bg-indigo-500/20 p-2 sm:p-3 rounded-md sm:rounded-lg mr-2 sm:mr-3 border border-indigo-400/30">
                    <svg
                      className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm sm:text-base">
                      {t("hero.stats.matches")}
                    </p>
                    <p className="text-xs sm:text-sm text-indigo-200">
                      {t("hero.stats.matchesLabel")}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ────────── Best-selling ────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto py-12 md:py-16"
      >
        <motion.div
          variants={itemVariants}
          className="w-full md:max-w-5xl mx-auto px-2 sm:px-4"
        >
          <TopProducts />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-8 md:mt-12"
        >
          <button
            className="px-5 py-2 sm:px-6 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-md text-sm sm:text-base"
            onClick={() => navigate("/ExporterProducts")}
          >
            {t("bestSelling.seeAll")}
          </button>
        </motion.div>
      </motion.section>

      {/* ────────── CTA ────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="md:w-full w-[90vw] max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto my-12 sm:my-16 md:my-20 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl py-8 sm:py-12 text-white"
      >
        <div className="max-w-2xl mx-auto text-center px-2 sm:px-4">
          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
          >
            {t("cta.title")}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mb-6 sm:mb-8 text-indigo-100 text-sm sm:text-base"
          >
            {t("cta.description")}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center flex-wrap"
          >
            <button
              className="bg-white text-indigo-800 hover:bg-gray-100 px-5 py-2 sm:px-6 sm:py-3 rounded-lg transition-all shadow-md text-sm sm:text-base"
              onClick={() => navigate("/ExporterProducts")}
            >
              {t("cta.buttons.explore")}
            </button>
            {!user.role && (
              <button
                className="border border-white text-white hover:bg-indigo-700 px-5 py-2 sm:px-6 sm:py-3 rounded-lg transition-all text-sm sm:text-base"
                onClick={() => navigate("/signIn")}
              >
                {t("cta.buttons.signUp")}
              </button>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* ────────── Recommended Products ────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="w-full max-w-6xl px-4 sm:px-6 mx-auto py-12 md:py-16"
      >
        <RecommendedProducts maxItems={3} />
      </motion.section>

      {user?.role === "exporter" && <PricingPage />}

      {/* ────────── Testimonials ────────── */}
      {testimonials.length > 0 && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="w-full max-w-5xl px-16 sm:px-6 lg:px-8 mx-auto py-12 md:py-20 relative"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {t("testimonials.title")}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              {t("testimonials.description")}
            </p>
          </motion.div>

          {/* arrows */}
          <button
            onClick={() => goTo(idx === 0 ? testimonials.length - 1 : idx - 1)}
            className="absolute md:left-0 left-8 mt-6 top-1/2 -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 p-2 sm:p-3 rounded-full shadow-md -ml-2 sm:-ml-4"
            aria-label="Prev"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* carousel */}
          <div className="overflow-hidden px-2 md:px-0">
            <div
              className="flex transition-transform duration-500 w-full flex-nowrap"
              style={{ transform: `translateX(-${idx * 100}%)` }}
            >
              {testimonials.map((tst, i) => (
                <motion.div
                  key={i}
                  className="w-full flex-shrink-0 px-5 md:px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div
                    className={`p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl max-w-2xl mx-auto shadow-md ${
                      i % 2 ? "bg-indigo-50" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-3 sm:mr-4">
                        <span className="text-base sm:text-lg font-bold text-indigo-600">
                          {tst.author.charAt(0)}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {tst.author}
                      </p>
                    </div>
                    <p className="italic text-gray-700 text-sm sm:text-base">
                      "{tst.text}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <button
            onClick={() => goTo(idx === testimonials.length - 1 ? 0 : idx + 1)}
            className="absolute right-8 mt-6 md:right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 hover:bg-gray-300 p-2 sm:p-3 rounded-full shadow-md -mr-2 sm:-mr-4"
            aria-label="Next"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* indicators */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8 flex-wrap gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 sm:h-3 rounded-full transition-all ${
                    idx === i
                      ? "bg-indigo-600 w-4 sm:w-6"
                      : "bg-gray-400 w-2 sm:w-3"
                  }`}
                  aria-label={`go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          )}
        </motion.section>
      )}

      {/* ────────── Footer ────────── */}
      <Footer />
    </div>
  );
}
