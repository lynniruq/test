
import React, { useEffect, useState } from 'react';
import Footer from '../utils/Footer';
import Header from '../utils/Header';
import Sidebar from '../utils/Siderbar';


function SecondPage() {
    const [headerImageClicked, setHeaderImageClicked] = useState(0);

    useEffect(() => {
      trackPageLoad();
    }, []);

    function handleImageClicked(id) {
      return () => {
        let clicks = headerImageClicked + 1;
        setHeaderImageClicked(clicks);
        console.log(headerImageClicked);

        // Send the click count to the server
        fetch('http://localhost:8080/views/track-click-count', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ count: clicks, ad: id }),
        })
          .then((response) => {
            if (response.ok) {
              console.log('Click count updated on the server.');
            } else {
              console.error('Failed to update click count on the server.');
            }
          })
          .catch((error) => {
            console.error('Error while updating click count:', error);
          });
      };
    }

    // Example of a function to track page loads
function trackPageLoad() {
  const pageData = {
    pageUrl: window.location.href,
    timestamp: new Date().toISOString(),
    // Add other data as needed
  };

  fetch('http://localhost:8080/views/track-page-load', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ page: 2, ...pageData }),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Page load tracked successfully.');
      } else {
        console.error('Failed to track page load.');
      }
    })
    .catch((error) => {
      console.error('Error while tracking page load:', error);
    });
}






  return (
    <div style={{background:'white',height:'100%',width:'100%'}}>
    <Header  text={"She danced"} handleImageClicked={handleImageClicked(224)} adId={"224"} />
      <div style={{width: "70%",marginTop:'100px',float:'right'}}>
      <h3>What is abcd?</h3>
      <p style={{textCverflow: "ellipsis",width:'50%'}}>
            abcd.</p>
      </div>
    <Sidebar text={'"A cup of hot tea on a rainy day is pure comfort."'} handleImageClicked={handleImageClicked(225)} adId={"225"}/>
    <Footer text={"bye !"} adId={"226"} handleImageClicked={handleImageClicked(226)} />
     
    </div>
  );
}

export default SecondPage;
