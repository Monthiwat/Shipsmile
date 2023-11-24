const formatDataBestExpress = async (trackId, data) => {
  console.log("data", data);
  console.log(data.result);

  if (data.result === true && data.traceLogs.length > 0) {
    let history = data.traceLogs[0].traces.trace.map((item) => {
      // convert time
      let tmpDateTime = new Date(item.operateTime);
      let tmpDate = tmpDateTime.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      let tmpTime = tmpDateTime.toLocaleTimeString("th-TH");
      let tmpStatusDate = `เมื่อ ${tmpTime} น. วันที่ ${tmpDate} `;
      return {
        StatusDescription: item.statusCodeDesc,
        statusDate: tmpStatusDate,
        locationName: item.siteName,
      };
    });

    let newData = {
      currentStatus: history[0].StatusDescription,
      currentStatusDate: history[0].statusDate,
      courier: "Best Express",
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
  formatDataBestExpress,
};
