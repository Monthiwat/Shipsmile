import { useState, useRef } from 'react'
import './App.css'
import Search from './components/Search';
import Tracking from './components/Tracking';

function App() {
  const [responseData, setResponseData] = useState(null);
  const [responseDataNotFound, setResponseDataNotFound] = useState(null);

  const refInput = useRef(null)

  function handleSearchTrack () {
    const trackId = refInput.current.value;

    fetch(`http://localhost:8000/api/tracking/${trackId}`)
    .then(response => response.json())
    .then(dataRes => {
      console.log(dataRes);
      if (dataRes.status === true) {
        setResponseData(dataRes);
        setResponseDataNotFound("");
      } else {
        console.log("Not Found naja")
        setResponseData("");
        setResponseDataNotFound(`ไม่พบหมายเลข ID: ${trackId}`);
      }
    });
  }

  function handleKeyPress (e) {
    if (e.key === 'Enter') {
      handleSearchTrack();
    }
  }

  function handleClearInput () {
    refInput.current.value = '';
    setResponseData("");
    setResponseDataNotFound("");
  }

  return (
    <>
    <main className='flex min-h-screen flex-col items-center justify-center p-20 bg-white'>
      <div className='w-full h-screen rounded bg-white pt-2'>
        <h2 className='text-center font-bold text-xl mb-2'>Tracking</h2>
        {/* SHOW  SEARCH INPUT*/}
        <Search
          refInput={refInput}
          handleKeyPress={handleKeyPress}
          handleSearchTrack={handleSearchTrack}
          handleClearInput={handleClearInput}
        />
        {/* SHOW TRACKING */}
        <Tracking
          responseData={responseData}
          responseDataNotFound={responseDataNotFound}
        />
      </div>
    </main>
     
    </>
  )
}

export default App
