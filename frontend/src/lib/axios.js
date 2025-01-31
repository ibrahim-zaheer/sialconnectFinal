import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "" // Use relative URLs in production
    : "http://localhost:5000"; // Use full URL in development

export default axios;
