
import React, { useEffect, useState } from 'react';
import Footer from '../utils/Footer';
import Header from '../utils/Header';
import Sidebar from '../utils/Siderbar';


function FourthPage() {
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
    body: JSON.stringify({ page: 4, ...pageData }),
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
    <Header  text={"Lost in the music, the world faded away."} handleImageClicked={handleImageClicked(442)} adId={"442"} />
      <div style={{width: "70%",marginTop:'100px',float:'right'}}>
      <h3>What is abcd?</h3>
      <p style={{textCverflow: "ellipsis",width:'50%'}}>
            abcd.</p>
      </div>
    <Sidebar  text={"Sunset painted the sky with hues of orange and pink."} adId={"443"} handleImageClicked={handleImageClicked(443)}/>
    <Footer text={"In the garden, the flowers swayed to their own silent melody."} adId={"444"}  handleImageClicked={handleImageClicked(444)}/>
     
    </div>
  );
}

export default FourthPage;
