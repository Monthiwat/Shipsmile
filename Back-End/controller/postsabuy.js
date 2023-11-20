const axios = require("axios");

const getTrackingPostSabuyData = async (trackId) => {
    try {
        const trackingData = await axios.post(
            `https://postsabuy.info/Search?ConsignmentNo=${trackId}`,
            {
              "Content-Type": "application/json",
            }
        );
        return trackingData.data;
    } catch (error) {
        console.log("getTrackingPostSabuyData error : ", error.message);
        return error.message;
        
    }
};

module.exports = {
    getTrackingPostSabuyData,
  };