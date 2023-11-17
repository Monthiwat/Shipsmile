import React from "react";

export default function Tracking({ responseData, error }) {
  return (
    <div className="grid items-center justify-center">
      {responseData.status === true ? (
        <>
          <ul className="mt-5 mb-2">
            <li className="font-bold">
              สถานะ : {responseData.data.currentStatus}
            </li>
            <li>น้ำหนัก : {responseData.data.weight} กรัม</li>
            <li>วันที่ส่ง : {responseData.data.startData}</li>
            <li>วันที่รับ : {responseData.data.reciveDate}</li>
            <li>ผู้รับ/สถานที่จัดส่ง : {responseData.data.location}</li>
          </ul>
          <div>
            <h2 className="font-bold text-l mb-2">ติดตามสถานะการจัดส่ง</h2>
            {responseData.data.history.map((history, index) => (
              <div key={index} className="ml-5 mb-2">
                <li className="font-bold">
                  {history.currentStatus} - {history.locationName}
                </li>
                <p className="px-6">{history.statusDate}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full h-screen rounded bg-white pt-10">
          <h2 className="text-center font-bold text-xl mb-2">
            {error ? error : responseData.message}
          </h2>
        </div>
      )}
    </div>
  );
}
