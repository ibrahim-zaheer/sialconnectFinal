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
      await axios.delete(`/api/bidding/delete/${id}`, {  // Fixed API endpoint path
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuctions(auctions.filter((auction) => auction._id !== id));
      setMessage("Auction deleted successfully");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete auction");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    }
  };

  const isAuctionExpired = (endTime) => {
    const currentDate = new Date();
    const auctionEndDate = new Date(endTime);
    return auctionEndDate < currentDate;
  };

  const filteredAuctions = auctions.filter(auction => 
    auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    auction.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-neutral-900">My Auctions</h1>
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search auctions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <svg 
              className="absolute right-3 top-2.5 h-5 w-5 text-neutral-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {message && (
          <div className={`p-4 mb-6 rounded ${
            message.includes("Failed") ? "bg-red-100 border-l-4 border-red-500 text-red-700" 
                                     : "bg-green-100 border-l-4 border-green-500 text-green-700"
          }`}>
            <p>{message}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredAuctions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions.map((auction) => (
              <div key={auction._id} className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-neutral-900">{auction.title}</h2>
                      <p className="text-primary-600 font-medium mt-1">Rs {auction.startingBid}</p>
                    </div>
                    {auction.image?.url && (
                      <div className="flex-shrink-0">
                        <img
                          src={auction.image.url}
                          alt={auction.title}
                          className="w-20 h-20 object-cover rounded-lg border border-neutral-200"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <p className="text-neutral-600 text-sm line-clamp-2">{auction.description || "No description provided"}</p>
                  </div>

                  <div className="mt-4 space-y-1">
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">Category:</span> {auction.category}
                    </p>
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">Start:</span> {new Date(auction.startTime).toLocaleString()}
                    </p>
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">End:</span> {new Date(auction.endTime).toLocaleString()}
                    </p>
                  </div>

                  {isAuctionExpired(auction.endTime) && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Expired
                      </span>
                    </div>
                  )}

                  <div className="mt-6 flex justify-between items-center">
                    <Link
                      to={`/bidding/${auction._id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDeleteAuction(auction._id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-neutral-900">No auctions found</h3>
            <p className="mt-1 text-neutral-500">
              {searchQuery ? "No auctions match your search criteria" : "You haven't created any auctions yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExporterAuctions;