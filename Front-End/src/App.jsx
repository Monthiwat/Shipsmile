import { useState, useRef } from 'react'
import './App.css'
// image
import KerryExpress from './assets/img/Kerrry_Express.png'
import Ninjavan from './assets/img/Ninja_Van.png'
import PostSabuy from './assets/img/Post_Sabuy.jpg'
import BestExpress from './assets/img/Best-Express.jpg'
// components
import Search from './components/Search';
import Tracking from './components/Tracking';

function App() {
  const [responseData, setResponseData] = useState(null);
  const [responseDataNotFound, setResponseDataNotFound] = useState(null);
  const [loading, setLoading] = useState(false);

  const refInput = useRef(null)

  
  function handleSearchTrack () {
    const trackId = refInput.current.value;
    setResponseData("");
    setLoading(true);
    
    fetch(`http://172.29.31.52:8082/api/tracking/${trackId}`)
    // fetch(`http://localhost:8082/api/tracking/${trackId}`)
    .then(response => response.json())
    .then(dataRes => {
      console.log(dataRes);
      if (dataRes.status === true) {
        setResponseData(dataRes);
        setResponseDataNotFound("");
        setLoading(false);
      } else {
        console.log("Not Found naja")
        setResponseData("");
        setResponseDataNotFound(`ไม่พบหมายเลข ID: ${trackId}`);
        setLoading(false);
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
    <main className='flex min-h-screen flex-col items-center p-5 bg-white'>
      <div className='grid grid-cols-4 gap-4 w-96 items-center'>
        <img src={KerryExpress} alt="Kerry_Express" />
        <img src={Ninjavan} alt="Ninja_Van" />
        <img src={PostSabuy} alt="Post_Sabuy" />
        <img src={BestExpress} alt="Best-Express" />
      </div>
      <div className='w-full h-screen rounded bg-white pt-2'>
        <h2 className='text-center font-bold text-2xl mb-2'>TRACKING</h2>
        {/* SHOW  SEARCH INPUT*/}
        <Search
          refInput={refInput}
          handleKeyPress={handleKeyPress}
          handleSearchTrack={handleSearchTrack}
          handleClearInput={handleClearInput}
          showLoading={loading}
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
