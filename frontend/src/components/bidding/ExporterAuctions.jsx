import { useState, useEffect } from "react";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";
import StatusFilter from "./components/StatusFilter";

const ExporterAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

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

  // const filteredAuctions = auctions.filter((auction) => {
  //   const searchLower = searchQuery.toLowerCase();
  //   return (
  //     auction.title.toLowerCase().includes(searchLower) ||
  //     auction.description.toLowerCase().includes(searchLower) ||
  //     auction.category.toLowerCase().includes(searchLower)
  //   );
  // });

  const filteredAuctions = auctions.filter((auction) => {
    const searchLower = searchQuery.toLowerCase();

    const matchesSearch =
      auction.title.toLowerCase().includes(searchLower) ||
      auction.description.toLowerCase().includes(searchLower) ||
      auction.category.toLowerCase().includes(searchLower);

    const isExpired = isAuctionExpired(auction.endTime);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && !isExpired) ||
      (statusFilter === "expired" && isExpired);

    return matchesSearch && matchesStatus;
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
    <div className="p-4 sm:p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Auctions</h1>

          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
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
            <input
              type="text"
              placeholder="Search auctions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <StatusFilter selected={statusFilter} onChange={setStatusFilter} />
          </div>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              message.includes("successfully")
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
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
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 p-6"
              >
                {/* Image Section */}
                <div className="w-48 h-48 rounded-lg bg-gray-100 overflow-hidden mx-auto">
                  {auction.image ? (
                    <img
                      src={
                        Array.isArray(auction.image)
                          ? auction.image[0]
                          : auction.image.url || auction.image
                      }
                      alt={auction.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/400x200?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                      <svg
                        className="w-12 h-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {auction.title}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isAuctionExpired(auction.endTime)
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {isAuctionExpired(auction.endTime) ? "Expired" : "Active"}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {auction.description || "No description provided"}
                  </p>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Starting Bid:</span>
                      <span className="font-medium text-gray-700">
                        Rs {auction.startingBid}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-medium text-gray-700 capitalize">
                        {auction.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Starts:</span>
                      <span className="font-medium text-gray-700">
                        {formatDate(auction.startTime)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ends:</span>
                      <span className="font-medium text-gray-700">
                        {formatDate(auction.endTime)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between mt-4 space-x-3">
                    <Link
                      to={`/bidding/${auction._id}`}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-md text-sm font-medium transition-colors"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDeleteAuction(auction._id)}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
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
            <h3 className="mt-3 text-lg font-medium text-gray-900">
              No auctions found
            </h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              {searchQuery
                ? "No auctions match your search criteria. Try different keywords."
                : "You haven't created any auctions yet. Start by creating a new auction."}
            </p>
            {!searchQuery && (
              <Link
                to="/exporter/create-auction"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create New Auction
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExporterAuctions;
