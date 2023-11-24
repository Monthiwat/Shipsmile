const formatDataKerryExpress = async (trackId, data) => {
    console.log("data", data);
    console.log(data[0].ConsignmentNo);
    
    if (data[0].ConsignmentNo) {

      let history = data[0].States.map((item) =>{
        // convert time
        let tmpDateTime = new Date(item.UpdateDate);
        let tmpDate = tmpDateTime.toLocaleDateString("th-TH", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        let tmpTime = tmpDateTime.toLocaleTimeString("th-TH");
        let tmpStatusDate = `เมื่อ ${tmpTime} น. วันที่ ${tmpDate} `;
        return {
          StatusDescription: item.Description,
          statusDate: tmpStatusDate,
          locationName: item.Location
        }
      });

      let newData ={
        currentStatus: data[0].Delivered,
        currentStatusDate: history[0].statusDate,
        courier: "Kerry Express",
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
    formatDataKerryExpress,
  };