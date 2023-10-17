
import React, { useEffect, useState } from 'react';
import Footer from '../utils/Footer';
import Header from '../utils/Header';
import Sidebar from '../utils/Siderbar';


function ThirdPage() {
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
    body: JSON.stringify({ page: 3, ...pageData }),
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
    <Header  text={'Order Now!'} handleImageClicked={handleImageClicked(331)} adId={"331"} />
      <div style={{width: "70%",marginTop:'100px',float:'right'}}>
      <p style={{textCverflow: "ellipsis",width:'50%'}}>
      The old bookstore smelled of history and adventure</p>
      </div>
    <Sidebar text={"She danced through life with a smile that could brighten the darkest days."} adId={"332"}  handleImageClicked={handleImageClicked(332)}/>
    <Footer text={"The stars above whispered secrets to the night."} adId={"333"} handleImageClicked={handleImageClicked(333)}/>
     
    </div>
  );
}

export default ThirdPage;
