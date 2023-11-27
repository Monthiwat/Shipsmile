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
    if (error.response && error.response.data) {
      console.log("getTrackingKerryExpressData error : ", error.response.data);
      return error.response.data;
    } else {
      console.log("getTrackingKerryExpressData error : ", error.message);
      return error.message;
    }
  }
};

// const getTrackingPostSabuyData = async (trackId) => {
//     try {
//       const res = await fetch(`https://postsabuy.info/Search?ConsignmentNo=${trackId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const trackingData = await res.json();
//       return trackingData;
//     } catch (error) {
//         if (error.response && error.response.data) {
//             console.log("getTrackingKerryExpressData error : ", error.response.data);
//             return error.response.data;
//           } else {
//             console.log("getTrackingKerryExpressData error : ", error.message);
//             return error.message;
//           }
//     }
//   }

module.exports = {
  getTrackingPostSabuyData,
};
