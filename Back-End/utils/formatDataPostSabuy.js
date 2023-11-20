const formatDataPostSabuy = async (trackId, data) => {
    console.log("data", data);
    
    if (data.Status === true) {
      // let newData = { ...data};

      // let history = [];
      // newData.History.forEach((h) => {
      //   history.push({
      //       StatusDescription: h.StatusDescription,
      //       StatusDate: h.StatusDate,
      //       Location: h.LocationName, 
      //   })
      // });

      let history = data.History.map((item) =>({
        StatusDescription: item.StatusDescription,
        statusDate: item.StatusDate,
        locationName: item.LocationName
      }));

      let newData ={
        currentStatus: data.StatusDescription,
        currentStatusDate: data.StatusDate,
        // currentLocation: data.Location,
        history: history

      }
      return {
        status: true,
        trackId: trackId,
        message: "success",
        data: newData,
        originalData: data,
      };
    } else {
      return {
        status: false,
        trackId: trackId,
        message: data.Message,
        data: null,
        originalData: data,
      };
    }
  };
  
  module.exports = {
    formatDataPostSabuy,
  };