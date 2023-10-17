import React, { useEffect, useState } from 'react';
import food from '../images/Brown Special Burger Ads Feed Ad Square-2.png';
import mcafe from '../images/Claudiofolha_ I will design an image creative for your ad campaign for $200 on fiverr_com.jpg';
import Footer from '../utils/Footer';
import Header from '../utils/Header';
import Sidebar from '../utils/Siderbar';

function FirstPage() {
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
        body: JSON.stringify({ page: 1, ...pageData }),
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
      <div style={{ background: 'white', height: '100%', width: '100%' }}>
        <Header imageUrl={food} text={'Order Now!'} handleImageClicked={handleImageClicked(123)} adId={"123"} />
        <div style={{ width: "70%", marginTop: '100px', float: 'right' }}>
          <h3>What is Lorem Ipsum?</h3>
          <p style={{ textOverflow: "ellipsis", width: '50%' }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularized in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </p>
        </div>
        <Sidebar imageUrl={mcafe} adId={"1234"} handleImageClicked={handleImageClicked(1234)} />
        <Footer text={"Hello !"} adId={"1235"} handleImageClicked={handleImageClicked(1235)} />
      </div>
    );
}

export default FirstPage;
