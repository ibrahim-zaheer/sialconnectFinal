import React from "react";


import AuctionList from "../../components/bidding/AuctionList";


const GetAllAuctionsPage = () => {
    return (
      <>
        <div className="w-[80vw] mx-auto mt-16">
          <AuctionList/>
        </div>
      </>
    );
  };
  
  export default GetAllAuctionsPage;