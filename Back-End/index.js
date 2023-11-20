const express = require("express");
const cors = require("cors");

const { 
    getTrackingPostSabuyData,
    getTrackingNinjavanData 
} = require("./controller/index");
const { 
    formatDataPostSabuy, 
    formatDataNinjavan 
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

app.listen(8000, () => {
    console.log("Server in port 8000")
});