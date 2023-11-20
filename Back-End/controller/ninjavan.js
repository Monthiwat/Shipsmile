const axios = require("axios");

const getTrackingNinjavanData = async (trackId) => {
    try {
        const trackingData = await axios.get(
            `https://walrus.ninjavan.co/th/dash/1.2/public/orders?tracking_id=${trackId}`,
            {
              "Content-Type": "application/json",
            }
        );
        return trackingData.data;
    } catch (error) {
        if (error.response && error.response.data) {
            console.log("getTrackingNinjavanData error : ", error.response.data);
            return error.response.data;
          } else {
            console.log("getTrackingNinjavanData error : ", error.message);
            return error.message;
          }
        
    }
};

module.exports = {
    getTrackingNinjavanData,
  };