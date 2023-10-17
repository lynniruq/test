// Footer.js
import React from 'react';
import '../style/footer.css';
import AdSlot from '../utils/AdSlot';

function Sidebar(props) {
  const { imageUrl,text,adId,handleImageClicked } = props;

  return (
    <div className="sidebar">
        <AdSlot text={text} imageUrl={imageUrl} className={"sidebar-img"} adId={adId} handleImageClicked={handleImageClicked} />

    </div>

    // <div className="sidebar">
        // <img src={imageUrl} alt="Ad" className="sidebar" loading="lazy"/>
    // </div>
  );
};

export default Sidebar;
