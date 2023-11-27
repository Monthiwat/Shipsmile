const axios = require("axios");

const getTrackingKerryExpressData = async (trackId) => {
    try {
        const trackingData = await axios.get(
            `http://api.sabuyspeed.in.th/courier/v1/Tracking/Search/${trackId}`,
            {
              "Content-Type": "application/json",
            }
        );
        return trackingData.data;
    } catch (error) {
        if (error.response && error.response.data) {
            console.log("getTrackingKerryExpressData error : ", error.response.data);
            return error.response.data;
          } else {
            console.log("getTrackingKerryExpressData error : ", error.message);
            return error.message;
          }
        
    }
};

// const getTrackingKerryExpressData = async (trackId) => {
//   try {
//     const res = await fetch(`https://api-dev.sabuyspeed.in.th/courier/v1/Tracking/Search/${trackId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const trackingData = await res.json();
//     return trackingData.data;
//   } catch (error) {
//       console.log("getTrackingKerryExpressData error : ", error.response.data);
//       return error.response.data;
//   }
// }

module.exports = {
  getTrackingKerryExpressData,
  };
