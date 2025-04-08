import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../lib/axios";
import BidForm from "./BidForm";
import { Link } from "react-router-dom";

const AuctionDetail = () => {
  const { id } = useParams();
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const cachedData = localStorage.getItem(`auction-${id}`);
        if (cachedData) {
          setAuctionDetails(JSON.parse(cachedData));
        }

        const response = await axios.get(`/api/bidding/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setAuctionDetails(response.data);
        localStorage.setItem(`auction-${id}`, JSON.stringify(response.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching auction details:", error);
        setError("Failed to load auction details.");
        setLoading(false);
      }
    };

    if (id) {
      fetchAuctionDetails();
    }
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded max-w-4xl mx-auto my-20">
      {error}
    </div>
  );

  if (!auctionDetails) return (
    <div className="text-center text-neutral-500 py-20">
      No auction details found
    </div>
  );

  return (
    <div className="mt-24 max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md border border-neutral-200">
      {/* Auction Header */}
      <div className="border-b border-neutral-200 pb-6 mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">{auctionDetails.title}</h2>
        <p className="text-neutral-600">{auctionDetails.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Auction Details */}
        <div>
          {/* Auction Image */}
          {auctionDetails?.image?.url && (
            <div className="mb-6">
              <img
                src={auctionDetails.image.url}
                alt={auctionDetails.title}
                className="w-full h-auto max-h-80 object-contain rounded-lg border border-neutral-200"
              />
            </div>
          )}

          {/* Auction Info */}
          <div className="space-y-4">
            <div className="flex justify-between border-b border-neutral-100 pb-2">
              <span className="font-medium text-neutral-700">Starting Bid:</span>
              <span className="text-neutral-900">Rs {auctionDetails.startingBid}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-100 pb-2">
              <span className="font-medium text-neutral-700">Current Bid:</span>
              <span className="text-primary-600 font-semibold">Rs {auctionDetails.currentBid || 'No bids yet'}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-100 pb-2">
              <span className="font-medium text-neutral-700">Category:</span>
              <span className="text-neutral-900">{auctionDetails.category}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-100 pb-2">
              <span className="font-medium text-neutral-700">Start Time:</span>
              <span className="text-neutral-900">{new Date(auctionDetails.startTime).toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-100 pb-2">
              <span className="font-medium text-neutral-700">End Time:</span>
              <span className="text-neutral-900">{new Date(auctionDetails.endTime).toLocaleString()}</span>
            </div>
          </div>

          {/* Auction Creator */}
          {auctionDetails?.createdBy && (
            <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
              <h4 className="font-medium text-neutral-700 mb-3">Created By:</h4>
              <div className="flex items-center gap-3">
                {auctionDetails.createdBy.profilePicture && (
                  <img
                    src={auctionDetails.createdBy.profilePicture}
                    alt={auctionDetails.createdBy.name}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                  />
                )}
                <div>
                  <p className="font-medium text-neutral-900">{auctionDetails.createdBy.name}</p>
                  <p className="text-sm text-neutral-500">{auctionDetails.createdBy.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Bidding Section */}
        <div>
          {/* Bid Form */}
          <div className="mb-8">
            <BidForm
              auctionId={id}
              refreshAuction={setAuctionDetails}
              userHasBid={auctionDetails?.userHasBid}
            />
          </div>

          {/* Bids List */}
          <div className="border-t border-neutral-200 pt-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Bids</h3>
            
            {auctionDetails?.bids?.length > 0 ? (
              <ul className="space-y-4">
                {auctionDetails.bids.map((bid) => (
                  <li key={bid._id} className="p-4 bg-neutral-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {bid.profileImage && (
                        <img
                          src={bid.profileImage}
                          alt={bid.userName}
                          className="w-10 h-10 rounded-full border-2 border-white"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-neutral-900">{bid.userName}</span>
                          <span className="text-primary-600 font-semibold">Rs {bid.amount}</span>
                        </div>
                        <div className="mt-2">
                          <Link
                            to={`/bidding/supplier/${bid.userId._id}`}
                            className="inline-block text-sm px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                          >
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-neutral-500">
                No bids placed yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;