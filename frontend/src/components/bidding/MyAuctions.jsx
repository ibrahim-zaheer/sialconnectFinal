import { useState, useEffect } from "react";
import axios from "axios";

const MyAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch the auctions created by the logged-in user
  const fetchMyAuctions = async () => {
    setLoading(true);
    setMessage(""); // Reset message

    try {
      const token = localStorage.getItem("token"); // Fetch token from storage
      const response = await axios.get("/bidding/my-auctions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuctions(response.data.auctions); // Set fetched auctions
    } catch (error) {
      console.error("Error fetching auctions:", error.response?.data || error.message);
      setMessage(
        error.response?.data?.message || "Failed to load auctions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch auctions when the component mounts
  useEffect(() => {
    fetchMyAuctions();
  }, []);

  return (
    <div className="mt-24 text-[#1b263b]">
      <h1 className="text-center text-3xl font-semibold my-10">My Auctions</h1>

      {/* Display loading or error message */}
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
                  <p className="text-sm text-gray-500 mt-2">Category: {auction.category}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {auction.description || "No description provided"}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Starting Bid: Rs {auction.startingBid}</p>
                  <p className="text-sm text-gray-500 mt-2">Current Bid: Rs {auction.currentBid}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Ends at: {new Date(auction.endTime).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <img
                    src={auction.image.url || "https://via.placeholder.com/150"}
                    alt="Auction"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-md font-semibold">Bids</h3>
                {auction.bids.length > 0 ? (
                  auction.bids.map((bid, index) => (
                    <div key={index} className="mt-2 text-sm">
                      <p>{bid.userName} placed a bid of Rs {bid.amount}</p>
                    </div>
                  ))
                ) : (
                  <p>No bids yet</p>
                )}
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

export default MyAuctions;
