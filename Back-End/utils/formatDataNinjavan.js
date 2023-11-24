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

    let history = data.events.map((item) => {
      // convert time
      let tmpDateTime = new Date(item.time);
      let tmpDate = tmpDateTime.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      let tmpTime = tmpDateTime.toLocaleTimeString("th-TH");
      let tmpStatusDate = `เมื่อ ${tmpTime} น. วันที่ ${tmpDate} `;
      return {
        StatusDescription: item.type,
        statusDate: tmpStatusDate,
        locationName: item.data.hub_name,
      };
    });

    history = history.reverse();
    let newData = {
      currentStatus: data.status,
      currentStatusDate: data.delivery_end_date,
      // currentLocation: data.Location,
      history: history,
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
      message: data.error ? data.error.message : data.message,
      data: null,
      originalData: data,
    };
  }
};

module.exports = {
  formatDataNinjavan,
};
