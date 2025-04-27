import React from "react";
import ExporterAuctions from "../../components/bidding/ExporterAuctions";
import ExporterLayout from "../../components/bidding/ExporterLayout";

// import { getMyAuctions } from "../../../../backend/controllers/bidding/auction_controller";

const ExporterAuctionsPage = () => {
    return (
      <>
        <div className="w-[80vw] mx-auto mt-24">
          <ExporterLayout/>
          <ExporterAuctions/>
          {/* <getMyAuctions/> */}
        </div>
      </>
    );
  };
  
  export default ExporterAuctionsPage;