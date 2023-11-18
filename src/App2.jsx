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
  // return (
  //   <>
  //     <div
  //       className="hero min-h-screen"
  //       style={{
  //         backgroundImage:
  //           "url(https://images.unsplash.com/photo-1590497008432-598f04441de8?q=80&w=2891&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
  //       }}
  //     >
  //       <div className="hero-overlay bg-opacity-40"></div>
  //       <div className="hero-content text-center text-neutral-content">
  //         <div className="max-w-md">
  //           <h1 className="mb-4 text-4xl font-bold">
  //             Check your Track & Trace
  //           </h1>
  //           {/* <input
  //             type="text"
  //             placeholder="Tracking number"
  //             className="input input-bordered input-lg w-full max-w-md "
  //           /> */}
  //           <div className="form-control">
  //             <div className="input-group">
  //               <input
  //                 type="text"
  //                 placeholder="Search…"
  //                 className="input input-bordered"
  //               />
  //               <button className="btn btn-square">
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   className="h-6 w-6"
  //                   fill="none"
  //                   viewBox="0 0 24 24"
  //                   stroke="currentColor"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     strokeWidth="2"
  //                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  //                   />
  //                 </svg>
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}

export default App;
