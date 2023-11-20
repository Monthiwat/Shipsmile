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
            <ul className="steps steps-vertical">
              {responseData.data.history.map((history, index) => (
                <li className="step step-primary" key={index}>
                  <div>
                    <p className="text-left text-base">
                      {history.statusDescription}
                      {history.locationName ? ` - ${history.locationName}` : ""}
                    </p>
                    <p className="text-left text-sm ">{history.statusDate}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div />
      )}
    </div>
  );
}
