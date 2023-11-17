import { useState, useRef } from "react";
import Search from "./components/Search";
import Tracking from "./components/Tracking";
import "./App.css";

function App() {
  const [responseData, setResponseData] = useState({});
  const [error, setError] = useState(null);
  const refInput = useRef(null);

  function handleSearchTrack() {
    let trackId = refInput.current.value.trim();
    trackId = trackId ? trackId.trim() : "";
    console.log("handleSearchTrack : ", trackId);

    if (trackId.length > 0) {
      fetch(`http://localhost:8000/api/tracking/${trackId}`)
        .then((response) => response.json())
        .then((dataRes) => {
          console.log(dataRes);
          setResponseData(dataRes);
          setError("");
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error fetching data:", error);
          setError(error.message);
          setResponseData({});
        });
    } else {
      setError("กรุณากรอกเลขติดตามพัสดุ");
      setResponseData({});
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSearchTrack();
    }
  }

  function handleClearInput() {
    refInput.current.value = "";
    setResponseData({});
    setError(null);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-500">
      <div className="w-full min-h-screen rounded bg-white pt-10">
        <h2 className="text-center font-bold text-xl mb-2">Tracking</h2>
        {/* SHOW SEARCH INPUT */}
        <Search
          refInput={refInput}
          handleKeyPress={handleKeyPress}
          handleSearchTrack={handleSearchTrack}
          handleClearInput={handleClearInput}
        />
        {/* SHOW TRACKING */}
        <Tracking responseData={responseData} error={error} />
      </div>
    </main>
  );
}

export default App;
