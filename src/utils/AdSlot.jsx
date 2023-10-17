// AdSlot.js
import React, { useEffect, useRef, useState } from 'react';
import '../style/adSlot.css'; // Import the CSS file for the styles



// api.js

export const trackViewability = async (adId) => {
  if(adId){
    console.log({adId})
    try {
      const response = await  fetch(`http://localhost:8080/views/track-viewability`,{method: 'POST' ,headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        adId:adId,
        lynn:'22'
      })
    });
        
      if (response.ok) {
        console.log('Viewability tracked successfully.');
      } else {
        console.error('Failed to track viewability.');
      }
    } catch (error) {
      console.error('Error while tracking viewability:', error);
    }
  }

};


const AdSlot = (props) => {
    
  const { imageUrl,text,handleImageClicked,className,textClassName,adId } = props;
  const adRef = useRef();
  const [isInView, setIsInView] = useState(false);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsInView(true);
         // Call trackViewability with the adId when the ad becomes viewable
         if (adRef.current) {
          console.log(adRef.current.id)
          trackViewability(adRef.current.id);
        }
      }
    });
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust this threshold as needed
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => {
      if (adRef.current) {
        observer.unobserve(adRef.current);
      }
    };
  }, []);

  return (
    <div className={`ad-slot ${isInView ? 'visible' : ''}`} ref={adRef} id={adId}>
      {isInView ?
      <>
      <label className={textClassName} onClick={handleImageClicked}>
            {text}</label>
       {imageUrl&& <img src={imageUrl} alt="Ad" 
        onClick={handleImageClicked} loading="lazy" className={className}/>}
      </>
       : 'Ad Loading...'}
    </div>
  );
};

export default AdSlot;
