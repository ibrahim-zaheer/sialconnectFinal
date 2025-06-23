// import axios from "axios";

// axios.defaults.baseURL =
//   process.env.NODE_ENV === "production"
//     ? "" // Use relative URLs in production
//     : "http://localhost:5000"; // Use full URL in development

// export default axios;


import axios from "axios";

// Use the .env values to set the baseURL for Axios
axios.defaults.baseURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL // Use the production API URL
    : import.meta.env.VITE_API_URL_LOCAL; // Use the local development API URL

export default axios;