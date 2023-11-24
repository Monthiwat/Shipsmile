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

    let history = data.History.map((item) => {
      // convert time
      let tmpDateTime = new Date(item.StatusDate);
      let tmpDate = tmpDateTime.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      let tmpTime = tmpDateTime.toLocaleTimeString("th-TH");
      let tmpStatusDate = `เมื่อ ${tmpTime} น. วันที่ ${tmpDate} `;
      return {
        StatusDescription: item.StatusDescription,
        statusDate: tmpStatusDate,
        locationName: item.LocationName,
      };
    });

    let newData = {
      currentStatus: data.StatusDescription,
      currentStatusDate: history[0].statusDate,
      // currentLocation: data.Location,
      courier: "PostSabuy",
      history: history
    };
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
