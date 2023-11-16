import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [responseDataPostSabuy, setResponseDataPostSabuy] = useState(null);
  const [responseDataNinja, setResponseDataNinja] = useState(null);
  const [responseDataNotFound, setResponseDataNotFound] = useState(null);

  const refInput = useRef(null);

  function handleSearchTrack() {
    const trackId = refInput.current.value;

    if (trackId.trim() !== "") {
      // API Postsabuy
      if (trackId.startsWith("E")) {
        // Define the options for the fetch request
        const requestOptionsPost = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(postData),
        };

        // Make the fetch request
        fetch(
          "https://postsabuy.info/Search?ConsignmentNo=" + trackId,
          requestOptionsPost
        )
          .then((response) => response.json())
          .then((dataRes) => {
            console.log(dataRes);
            const dataPostSabuy = {};

            if (dataRes.Status === true) {
              setResponseDataPostSabuy(dataRes);
              setResponseDataNinja("");
              setResponseDataNotFound("");
            } else {
              console.log("Setting Not Found ID2");
              setResponseDataNotFound("Setting Not Found ID2: " + trackId);
              setResponseDataPostSabuy("");
              setResponseDataNinja("");
            }
          })
          .catch((error) => {
            // Handle errors here
            console.error("Error fetching data:", error);
          });
      } else if (trackId.startsWith("N")) {
        //API ninja
        // Define the options for the fetch request
        const requestOptionsGet = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(postData),
        };

        // Make the fetch request
        fetch(
          "https://walrus.ninjavan.co/th/dash/1.2/public/orders?tracking_id=" +
            trackId,
          requestOptionsGet
        )
          .then((response) => response.json())
          .then((dataRes) => {
            console.log(dataRes);

            if (!dataRes.error) {
              setResponseDataNinja(dataRes);
              setResponseDataPostSabuy("");
              setResponseDataNotFound("");
            } else {
              console.log("Setting Not Found ID3");
              setResponseDataNotFound("Setting Not Found ID3: " + trackId);
              setResponseDataPostSabuy("");
              setResponseDataNinja("");
            }
          })
          .catch((error) => {
            // Handle errors here
            console.error("Error fetching data:", error);
          });
      } else {
        console.log("Setting Not Found ID");
        setResponseDataNotFound("Setting Not Found ID: " + trackId);
        setResponseDataPostSabuy("");
        setResponseDataNinja("");
      }
    }

    // switch(true) {
    //   case trackId.startsWith("EB") == true :
    //     // Define the options for the fetch request
    //     const requestOptionsPost = {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       // body: JSON.stringify(postData),
    //     };

    //     // Make the fetch request
    //     fetch('https://postsabuy.info/Search?ConsignmentNo='+ trackId, requestOptionsPost)
    //       .then(response => response.json())
    //       .then(dataRes => {
    //           console.log(dataRes);
    //           setResponseData(dataRes);
    //       })
    //       .catch(error => {
    //         // Handle errors here
    //         console.error('Error fetching data:', error);
    //       });
    //       break;
    //   case trackId.startsWith("EB") == true :
    //     // Define the options for the fetch request
    //     const requestOptionsGet = {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       // body: JSON.stringify(postData),
    //     };

    //     // Make the fetch request
    //     fetch('https://walrus.ninjavan.co/th/dash/1.2/public/orders?tracking_id='+ trackId, requestOptionsGet)
    //       .then(response => response.json())
    //       .then(dataRes => {
    //           console.log(dataRes);
    //           setResponseData(dataRes);
    //       })
    //       .catch(error => {
    //         // Handle errors here
    //         console.error('Error fetching data:', error);
    //       });
    //       break;
    //     default:
    //       console.error('Invalid tracking ID prefix');
    //       return;
    // }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSearchTrack();
    }
  }

  function handleClearInput() {
    refInput.current.value = "";
    setResponseDataPostSabuy("");
    setResponseDataNinja("");
    setResponseDataNotFound("");
  }

  if (responseDataNotFound) {
    return (
      <div className="w-full h-screen rounded bg-white pt-10">
        <h2 className="text-center font-bold text-xl mb-2">
          {responseDataNotFound}
        </h2>
      </div>
    );
  } else {
    return (
      <>
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-500">
          <div className="w-full h-screen rounded bg-white pt-10">
            <h2 className="text-center font-bold text-xl mb-2">Tracking</h2>
            <div className="flex items-center justify-center">
              <input
                className="m-1 p-1 bg-gray-50 border border-gray-300 text-gray-900"
                type="text"
                placeholder="Track ID"
                ref={refInput}
                onKeyDown={handleKeyPress}
              />
              <button
                onClick={handleSearchTrack}
                className="m-1 p-1  bg-red-600 border border-gray-300 text-white"
              >
                TRACK
              </button>
              <button
                onClick={handleClearInput}
                className="m-1 p-1  bg-red-600 border border-gray-300 text-white"
              >
                CLEAR
              </button>
            </div>
            {/* SHOW TRACKING */}
            <div className="grid items-center justify-center">
              {/* POSTSABUY */}
              {responseDataPostSabuy && (
                <>
                  <ul className="mt-5 mb-2">
                    <li className="font-bold">
                      {responseDataPostSabuy.StatusDescription}
                    </li>
                    <li>{responseDataPostSabuy.StatusDate}</li>
                  </ul>
                  {responseDataPostSabuy &&
                    responseDataPostSabuy.History.map((h, index) => (
                      <div key={index} className="ml-5 mb-2">
                        <li className="font-bold">
                          {h.StatusDescription} - {h.LocationName}
                        </li>
                        <p className="px-6">{h.StatusDate}</p>
                      </div>
                    ))}
                </>
              )}
              {/* NINJA */}
              {responseDataNinja && (
                <>
                  <ul className="mt-5 mb-2">
                    <li className="font-bold">{responseDataNinja.status}</li>
                    <li>{responseDataNinja.delivery_end_date}</li>
                  </ul>
                  {responseDataNinja &&
                    responseDataNinja.events.map((ev, index) => (
                      <div key={index} className="ml-5 mb-2">
                        <li className="font-bold">
                          {ev.type} - {ev.data.hub_name}
                        </li>
                        <p className="px-6">{ev.time}</p>
                      </div>
                    ))}
                </>
              )}
              {/* ID not found
              <div className="py-10">
                {responseDataNotFound && <h2>{responseDataNotFound}</h2>}
              </div> */}
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default App;
