import React from "react";
import "../App.css";

export default function Tracking({
    responseData,
    responseDataNotFound,
}) {
  return (
    <div className="grid items-center justify-center">
      {responseData && (
        <>
          <ul className="mt-5 mb-2">
            <li className="font-bold">{responseData.data.currentStatus}</li>
            <li>{responseData.data.currentStatusDate}</li>
          </ul>

          {responseData &&
            responseData.data.history.map((item, index) => (
              <div key={index} className="ml-5 mb-2">
                <li className="font-bold">
                  {item.StatusDescription} - {item.locationName}
                </li>
                <p className="px-6">{item.statusDate}</p>
              </div>
            ))}
        </>
      )}

      {/* ID not found */}
      <div className="py-10">
        {responseDataNotFound && <h2 className="font-bold">"{responseDataNotFound}"</h2>}
      </div>
    </div>
  );
}
