import { useState, useEffect } from "react";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";

const ExporterAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchExporterAuctions = async () => {
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No token found. Please login.");
        return;
      }
      const response = await axios.get("/api/bidding/getAuctionsByExporter", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuctions(response.data.auctions);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load auctions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExporterAuctions();
  }, []);

  const handleDeleteAuction = async (id) => {
    if (!window.confirm("Are you sure you want to delete this auction?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/bidding/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuctions(auctions.filter((auction) => auction._id !== id));
      setMessage("Auction deleted successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete auction");
    }
  };

   // Function to check if the auction is expired
   const isAuctionExpired = (endTime) => {
    const currentDate = new Date();
    const auctionEndDate = new Date(endTime);
    return auctionEndDate < currentDate;
  };

  return (
    <div className="mt-24 text-[#1b263b]">
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Search your auctions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <h1 className="text-center text-3xl font-semibold my-10">My Auctions</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading auctions...</p>
      ) : message ? (
        <p className="text-center text-red-500">{message}</p>
      ) : auctions.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center gap-8 mt-4 bg-gray-100 rounded-lg w-[80vw] mx-auto p-8 my-5">
          {auctions.map((auction) => (
            <div key={auction._id} className="w-full sm:w-1/2 lg:w-[30%] bg-white shadow-md rounded-lg py-8 px-5">
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-lg font-bold">{auction.title}</h1>
                  <p className="text-sm text-gray-500 mt-2">Starting Bid: Rs {auction.startingBid}</p>
                  <p className="text-sm text-gray-600 mt-2">{auction.description || "No description provided"}</p>
                  <p className="text-sm text-gray-600 mt-2">Category: {auction.category}</p>
                  {/* <p className="text-sm text-gray-600 mt-2">
                    {new Date(auction.startTime).toLocaleString()} - {new Date(auction.endTime).toLocaleString()}
                  </p> */}
                   <p className="text-sm text-gray-600 mt-2">
                    {new Date(auction.startTime).toLocaleString()} - {new Date(auction.endTime).toLocaleString()}
                  </p>
                  {isAuctionExpired(auction.endTime) && (
                    <span className="text-red-500 font-bold mt-2">Expired</span>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  {/* {auction.image && (
                    <img src={auction.image.url || "https://via.placeholder.com/150"} alt="Auction Image" className="w-24 h-24 object-cover rounded-lg" />
                  )} */}
                  {/* {auction.image && auction.image.length > 0 && (
  <img
    src={auction.image[0]}
    alt="Auction"
    className="w-24 h-24 object-cover rounded-lg"
  />
)} */}

{auction.image && (
  <img
    src={
      Array.isArray(auction.image)
        ? auction.image[0] // New format
        : auction.image.url // Old format
    }
    alt="Auction"
    className="w-24 h-24 object-cover rounded-lg"
  />
)}


                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <Link to={`/bidding/${auction._id}`} className="bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300">
                  View more
                </Link>
                <button
                  onClick={() => handleDeleteAuction(auction._id)}
                  className="bg-red-500 text-white py-1.5 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No auctions found.</p>
      )}
    </div>
  );
};

export default ExporterAuctions;
