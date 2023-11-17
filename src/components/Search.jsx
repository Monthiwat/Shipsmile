import React from "react";
import "../App.css";

export default function Search({
  refInput,
  handleKeyPress,
  handleSearchTrack,
  handleClearInput,
}) {
  return (
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
  );
}
