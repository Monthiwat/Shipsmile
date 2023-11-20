import { useState, useRef } from "react";
import Search from "./components/Search";
import Tracking from "./components/Tracking";
import "./App.css";

function App() {
  const [responseData, setResponseData] = useState({});
  const [error, setError] = useState(null);
  const refInput = useRef(null);
  const refModal = useRef(null);
  const refModalTitle = useRef(null);
  const refModalDescription = useRef(null);
  const [loading, setLoading] = useState(false);

  function handleSearchTrack() {
    handleLoading(true);
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
          handleLoading(false);
          if (dataRes.status === false) {
            handleModal("ไม่พบข้อมูล", dataRes.message);
          } else {
            handleModal(
              "พบข้อมูล",
              "",
              <Tracking responseData={dataRes} error={error} />
            );
          }
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error fetching data:", error);
          setError(error.message);
          handleModal("เกิดข้อผิดพลาด", error.message);
          setResponseData({});
          handleLoading(false);
        });
    } else {
      setError("กรุณากรอกเลขติดตามพัสดุ");
      handleModal("เกิดข้อผิดพลาด", "กรุณากรอกเลขติดตามพัสดุ");
      setResponseData({});
      handleLoading(false);
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
  function handleLoading(state) {
    if (state) {
      setLoading(state);
    } else {
      let timeout = setTimeout(() => {
        setLoading(state);
        clearTimeout(timeout);
      }, 2500);
    }
  }

  function handleModal(title, description, body) {
    refModalTitle.current.textContent = title;
    refModalDescription.current.textContent = description;
    if (title !== "") {
      refModal.current.showModal();
    } else {
      refModal.current.close();
    }
  }

  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-500">
  //     <div className="w-full min-h-screen rounded bg-white pt-10">
  //       <h2 className="text-center font-bold text-xl mb-2">Tracking</h2>
  //       {/* SHOW SEARCH INPUT */}
  //       <Search
  //         refInput={refInput}
  //         handleKeyPress={handleKeyPress}
  //         handleSearchTrack={handleSearchTrack}
  //         handleClearInput={handleClearInput}
  //       />
  //       {/* SHOW TRACKING */}
  //       <Tracking responseData={responseData} error={error} />
  //     </div>
  //   </main>
  // );
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1590497008432-598f04441de8?q=80&w=2891&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="hero-content text-center text-neutral-content w-screen">
          <div className="w-2/5">
            <h1 className="mb-4 text-4xl font-bold text-white/90">
              Check your Track & Trace
            </h1>
            <div className="relative ">
              <input
                ref={refInput}
                type="text"
                placeholder="Tracking number"
                className="input input-bordered input-lg w-full "
                onInput={(e) =>
                  (e.target.value = ("" + e.target.value).toUpperCase())
                }
                onKeyDown={handleKeyPress}
                onClick={(e) => e.target.select()}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pl-2">
                {!loading ? (
                  <button
                    onClick={handleSearchTrack}
                    className="p-4 focus:outline-none focus:shadow-outline"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </button>
                ) : (
                  // <span className="loading loading-ring loading-lg mr-2"></span>
                  <span className="loading loading-dots loading-lg mr-2"></span>
                  // <span className="loading loading-spinner loading-lg mr-2"></span>
                )}
              </span>
            </div>
          </div>
        </div>

        <dialog ref={refModal} className="modal">
          <div className="modal-box min-h-[50%]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg" ref={refModalTitle} />
            <p ref={refModalDescription} />
            {<Tracking responseData={responseData} error={error} />}
          </div>
        </dialog>
      </div>
    </>
  );
}

export default App;
