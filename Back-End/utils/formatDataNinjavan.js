const formatDataNinjavan = async (trackId, data) => {
    console.log("data", data);
  
    if (data.id) {
      // let newData = { ...data };

      // let events = [];
      // newData.events.forEach((ev) => {
      //   events.push({
      //       StatusDescription: ev.type,
      //       StatusDate: ev.data.hub_name,
      //       Location: ev.time, 
      //   })
      // });

      let history = data.events.map((item) =>({
        StatusDescription: item.type,
        statusDate: item.time,
        locationName: item.data.hub_name,
      }));

      let newData ={
        currentStatus: data.status,
        currentStatusDate: data.delivery_end_date,
        // currentLocation: data.Location,
        history: history,
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
        message: data.error ? data.error.message : data.message,
        data: null,
        originalData: data,
      };
    }
  };
  
  module.exports = {
    formatDataNinjavan,
  };
  