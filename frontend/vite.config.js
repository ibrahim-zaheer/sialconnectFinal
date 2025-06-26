// // vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000', // Your backend server URL
//         changeOrigin: true,
//         secure: false, // Optional: set to false if your backend is not using HTTPS
//         // Optional: rewrite the path if necessary
//         // rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//       '/supplier': {
//         target: 'http://localhost:5000', // Proxy for supplier-specific routes
//         changeOrigin: true,
//         secure: false,
//       },
     
//       '/message': {
//         target: 'http://localhost:5000', // Proxy for supplier-specific routes
//         changeOrigin: true,
//         secure: false,
//       },
//      '/bidding': {
//     target: 'http://localhost:5000',
//     changeOrigin: true,
//     secure: false,
    
// },


//       "/socket.io": {
//                 target: "http://localhost:5000", // Backend server URL
//                 ws: true, // Enable WebSocket proxying
//             },
//     },
//   },
  
// });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';


// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         secure: false,
//       },
//       '/supplier': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         secure: false,
//       },
//       '/message': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         secure: false,
//       },
//       '/bidding': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         secure: false,
//       },
//       '/socket.io': {
//         target: 'http://localhost:5000',
//         ws: true,
//       },
//     },
//     historyApiFallback: true, // 🔥 Ensures React Router works on refresh
//   },
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           react: ["react", "react-dom"],
//         },
//       },
//     },
//     chunkSizeWarningLimit: 1000, // Adjust size limit (optional)
//   },
// });




import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// console.log('VITE_API_URL:', import.meta.env.VITE_API_URL); 

export default defineConfig({
  plugins: [react(),],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/socket.io": {
        target: "http://localhost:5000",
        ws: true,
      },
    },
    historyApiFallback: true, // 🔥 Ensures React Router works on refresh
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust size limit (optional)
  },
});
