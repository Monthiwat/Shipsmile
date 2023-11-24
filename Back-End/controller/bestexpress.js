const axios = require("axios");
const qs = require("qs");
const md5 = require("crypto-md5");

const getTrackingBestExpressData = async (trackId) => {
  try {

        let bizData = `{
     "mailNos": {
     "mailNo": [
     "${trackId}"
     ]
    }
    }`;
    console.log("bizData : ", bizData);

    let body = {
      serviceType: "KD_TRACE_QUERY",
      bizData: bizData,
      sign: "",
      partnerID: "T_SABUYSPEED",
      partnerKey: "6Sr4vdEWTwrSbwrtf23W",
    };

    const bizDataWithKeys = body.bizData + body.partnerKey;

    const md5HexString = md5(bizDataWithKeys, "hex");
    console.log("md5HexString", md5HexString);
    body.sign = md5HexString;

    let data = qs.stringify(body);
    console.log(data)

    const trackingData = await axios.post(
      `http://sgp-seaedi.800best.com/Thailand/kdapi/api/process`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    console.log(trackingData.data);
    return trackingData.data;

    // let config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: "http://sgp-seaedi.800best.com/Thailand/kdapi/api/process",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   data: data,
    // };

    // let tmpDate = await new Promise((resolve, reject) => {
    //   axios
    //     .request(config)
    //     .then((response) => {
    //       console.log(JSON.stringify(response.data));
    //       resolve(response.data);
    //     })
    //     .catch((error) => {
    //       resolve({ status: false });
    //     });
    // });

    // return tmpDate;
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

module.exports = {
  getTrackingBestExpressData,
};


// =================== SOLUTION 2 =====================================
// const axios = require("axios");
// const qs = require("qs");
// const CryptoJS = require("crypto-js");
// const md5 = require("crypto-md5");

// let trackingId = "66850806016447";
// let bizData = `{
//  "mailNos": {
//  "mailNo": [
//  "${trackingId}"
//  ]
// }
// }`;
// console.log("bizData : ", bizData);

// let tmpData = {
//   serviceType: "KD_TRACE_QUERY",
//   bizData: bizData,
//   sign: "",
//   partnerID: "T_SABUYSPEED",
//   partnerKey: "6Sr4vdEWTwrSbwrtf23W",
// };

// const bizDataWithKeys = tmpData.bizData + tmpData.partnerKey;
// // ========= solution1 =========
// // const md5 = CryptoJS.MD5(bizDataWithKeys);
// // const md5HexString = md5.toString(CryptoJS.enc.Hex);

// // ========= solution2 =========
// const md5HexString = md5(bizDataWithKeys, "hex");
// console.log("md5HexString", md5HexString);
// tmpData.sign = md5HexString;

// let data = qs.stringify(tmpData);

// let config = {
//   method: "post",
//   maxBodyLength: Infinity,
//   url: "http://sgp-seaedi.800best.com/Thailand/kdapi/api/process",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
//   data: data,
// };

// axios
//   .request(config)
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });