import React, { useState, useEffect } from 'react';
import './App.css';
import FirstPage from './view/FirstPage';
import SecondPage from './view/SecondPage';
import ThirdPage from './view/ThirdPage';
import FourthPage from './view/FourthPage';
import Pie from './utils/BasicPie.jsx';

function useTimeTracker() {
  const [pageStartTime, setPageStartTime] = useState(null);
  const [pageLoadTime, setPageLoadTime] = useState(null);

  const startTimer = () => {
    setPageStartTime(Date.now());
  };

  const stopTimer = (pageClicked) => {
    if (pageStartTime) {
      const pageEndTime = Date.now();
      const timeSpent = (pageEndTime - pageStartTime) / 1000; // Convert to seconds
      console.log(`Time spent on the current page: ${timeSpent} seconds`);
      sendTimeSpentOnPageToServer(timeSpent,pageClicked)
    }
  };

  
function sendTimeSpentOnPageToServer(timeSpent,pageClicked) {
  fetch('http://localhost:8080/views/track-time-spent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ timeSpent,page:pageClicked }),
  });
}

  const trackPageLoad = () => {
    const loadTime = performance.timing.domComplete - performance.timing.domContentLoadedEventEnd;
    setPageLoadTime(loadTime);
  };

  return { startTimer, stopTimer, trackPageLoad, pageLoadTime };
}

function App() {
  const [pageClicked, setPageClicked] = useState(0);
  const { startTimer, stopTimer, trackPageLoad, pageLoadTime } = useTimeTracker();
  const [timeSpentData, setTimeSpentData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/views/timeSpent')
      .then((response) => response.json())
      .then((data) => {
        setTimeSpentData(data);
        console.log('data',data)
      })
      .catch((error) => {
        console.error(error);
      });
    startTimer(); // Start the timer when the component first renders
    
    return () => {
      stopTimer(pageClicked); // Stop the timer when the component unmounts
    };
  }, [pageClicked]);

  const handlePageClick = (page) => {
    setPageClicked(page);
    trackPageLoad(); // Track the page load time
  };

  return (
    <div style={{height:'100%'}}>
      <div className="tab">
        <label className="tablinks" onClick={() => handlePageClick(1)}>
          First Page
        </label>
        <label className="tablinks" onClick={() => handlePageClick(2)}>
          Second Page
        </label>
        <label className="tablinks" onClick={() => handlePageClick(3)}>
          3rd Page
        </label>
        <label className="tablinks" onClick={() => handlePageClick(4)}>
          4th Page
        </label>
      </div>
      {/* {pageLoadTime !== null && (
        <p>Page load time: {pageLoadTime} milliseconds.</p>
      )} */}
      {pageClicked === 1 && <FirstPage />}
      {pageClicked === 2 && <SecondPage />}
      {pageClicked === 3 && <ThirdPage />}
      {pageClicked === 4 && <FourthPage />}
      {pageClicked === 0 && timeSpentData.length>0 && <Pie data={timeSpentData} />}
    </div>
  );
}

export default App;
