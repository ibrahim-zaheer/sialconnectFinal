import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../lib/axios";
import BidForm from "./BidForm";
import { Link } from "react-router-dom";

const SupplierDetails = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        setLoading(true);
        setError(""); // Reset errors on new fetch

        const response = await axios.get(`/api/bidding/user-details/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("API Response:", response.data);

        setUserDetails(response.data);
        localStorage.setItem(`auction-${id}`, JSON.stringify(response.data)); // Cache updated data
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

  if (loading) return <div>Loading details...</div>;
  if (error) return <div>{error}</div>;
  if (!userDetails) return <div>No details found.</div>;

  return (
    <div className="user-detail w-[80vw] mx-auto mt-20">
      

      {/* Correctly display profile picture directly from profilePicture URL */}
      {userDetails?.profilePicture && (
        <img
          src={userDetails?.profilePicture}
          alt={userDetails?.name}
          style={{ width: "250px", height: "auto", borderRadius: "10px", marginTop: "10px" }}
        />
      )}
      <p><strong>Name:</strong> {userDetails?.name}</p>
      <p><strong>Email:</strong> {userDetails?.email}</p>

        <div className="mt-4">
                      {/* <Link
                        to={`/chat`}
                        className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                      >
                        Chat
                      </Link> */}

                        <Link
                                        to={`/chat?supplierId=${id}`}
                                        className="inline-block bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                                      >
                                        Chat
                                      </Link>
                    </div>
    </div>
  );
};

export default SupplierDetails;
