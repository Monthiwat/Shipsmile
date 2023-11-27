const express = require("express");
const cors = require("cors");

const { 
    getTrackingPostSabuyData,
    getTrackingNinjavanData,
    getTrackingKerryExpressData,
    getTrackingBestExpressData
} = require("./controller/index");
const { 
    formatDataPostSabuy, 
    formatDataNinjavan, 
    formatDataKerryExpress, 
    formatDataBestExpress 
} = require("./utils/index");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/tracking/:trackId", async (req, res) => {
    let trackId = req.params.trackId;
    trackId = trackId ? trackId.trim() : "";

    if (trackId.startsWith("E")) {
        let tmpGetTrackingPostSabuyData = await getTrackingPostSabuyData(trackId);
        let tmpFormatData = await formatDataPostSabuy(
            trackId,
            tmpGetTrackingPostSabuyData
        );
        // console.log("tmpFormatData1 : ", tmpFormatData);
        res.send(tmpFormatData);

    } else if (trackId.startsWith("N")) {
        let tmpGetTrackingNinjavanData = await getTrackingNinjavanData(trackId);
        let tmpFormatData = await formatDataNinjavan(
            trackId,
            tmpGetTrackingNinjavanData
        );
        console.log("tmpFormatData2 : ", tmpFormatData);
        res.send(tmpFormatData);
    
    } else if (trackId.startsWith("S")) {
        let tmpGetTrackingKerryExpressData = await getTrackingKerryExpressData(trackId);
        let tmpFormatData = await formatDataKerryExpress(
            trackId,
            tmpGetTrackingKerryExpressData
        );
        console.log("tmpFormatData3 : ", tmpFormatData);
        res.send(tmpFormatData);
    
    } else if (trackId.startsWith("6")) {
        let tmpGetTrackingKerryExpressData = await getTrackingBestExpressData(trackId);
        let tmpFormatData = await formatDataBestExpress(
            trackId,
            tmpGetTrackingKerryExpressData
        );
        console.log("tmpFormatData4 : ", tmpFormatData);
        res.send(tmpFormatData);
    
        } else {
        return res.send({
            status: false,
            trackId: trackId,
            message: "Courier Not Support",
            data: null,
          });
    }
});

app.get("*", async (req, res) => {
    return res.send({
      status: false,
      trackId: null,
      message: "Path Not Found",
    });
  });

app.listen(8082, () => {
    console.log("Server in port 8082")
});



