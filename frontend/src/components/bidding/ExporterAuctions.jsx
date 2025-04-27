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
      setMessage(
        error.response?.data?.message ||
          "Failed to load auctions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExporterAuctions();
  }, []);

  useEffect(() => {
    if (message.includes("successfully")) {
      const timeout = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const handleDeleteAuction = async (id) => {
    if (!window.confirm("Are you sure you want to delete this auction?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/bidding/delete/${id}`, {
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

  const isAuctionExpired = (endTime) => {
    const currentDate = new Date();
    const auctionEndDate = new Date(endTime);
    return auctionEndDate < currentDate;
  };

  const filteredAuctions = auctions.filter((auction) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      auction.title.toLowerCase().includes(searchLower) ||
      auction.description.toLowerCase().includes(searchLower) ||
      auction.category.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Auctions</h1>
        
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search auctions by title, description or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-3 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.includes("successfully")
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredAuctions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions.map((auction) => (
              <div
                key={auction._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {auction.title}
                    </h3>
                    {isAuctionExpired(auction.endTime) ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                        Expired
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                  </div>

                  {auction.image && (
                    <div className="mb-4">
                      <img
                        src={
                          Array.isArray(auction.image)
                            ? auction.image[0]
                            : auction.image.url
                        }
                        alt={auction.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Starting Bid:</span>
                      <span className="font-medium">Rs {auction.startingBid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{auction.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Starts:</span>
                      <span className="font-medium">{formatDate(auction.startTime)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-3">
                      <span className="text-gray-600">Ends:</span>
                      <span className="font-medium">{formatDate(auction.endTime)}</span>
                    </div>

                    {auction.description && (
                      <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                        {auction.description}
                      </p>
                    )}

                    <div className="mt-4 flex justify-between">
                      <Link
                        to={`/bidding/${auction._id}`}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleDeleteAuction(auction._id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No auctions found
            </h3>
            <p className="mt-1 text-gray-500">
              {searchQuery
                ? "No auctions match your search criteria"
                : "You haven't created any auctions yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExporterAuctions;