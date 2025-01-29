import { useState, useEffect } from "react";
import axios from "axios";

const ExporterAuctions = () => {
  const [auctions, setAuctions] = useState([]); // Auctions state
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // Error or notification message
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Fetch exporter's auctions
  const fetchExporterAuctions = async () => {
    setLoading(true);
    setMessage(""); // Reset message

    try {
      const token = localStorage.getItem("token"); // Fetch token from storage
      const response = await axios.get("/bidding/read", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuctions(response.data.auctions); // Set fetched auctions
    } catch (error) {
      console.error(
        "Error fetching exporter's auctions:",
        error.response?.data || error.message
      );
      setMessage(
        error.response?.data?.message ||
          "Failed to load auctions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch auctions on component mount
  useEffect(() => {
    fetchExporterAuctions();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter auctions based on the search query
  const searchedAuctions = auctions.filter((auction) =>
    auction.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-24 text-[#1b263b]">
      {/* Search Input */}
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Search your auctions..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <h1 className="text-center text-3xl font-semibold my-10">My Auctions</h1>

      {/* Display Auctions */}
      {loading ? (
        <p className="text-center text-gray-500">Loading auctions...</p>
      ) : message ? (
        <p className="text-center text-red-500">{message}</p>
      ) : searchedAuctions.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center gap-8 mt-4 bg-gray-100 rounded-lg w-[80vw] mx-auto p-8 my-5">
          {searchedAuctions.map((auction) => (
            <div
              key={auction._id}
              className="w-full sm:w-1/2 lg:w-[30%] bg-white shadow-md rounded-lg py-8 px-5"
            >
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-lg font-bold">{auction.title}</h1>
                  <p className="text-sm text-gray-500 mt-2">
                    Starting Bid: Rs {auction.startingBid}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {auction.description || "No description provided"}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Category: {auction.category}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {new Date(auction.startTime).toLocaleString()} -{" "}
                    {new Date(auction.endTime).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  {auction.image && (
                    <img
                      src={auction.image.url || "https://via.placeholder.com/150"}
                      alt="Auction Image"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                </div>
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
