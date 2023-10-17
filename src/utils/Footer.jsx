// Footer.js
import React from 'react';
import '../style/footer.css';
import AdSlot from '../utils/AdSlot';

function Footer(props){
    const { imageUrl,text,adId,handleImageClicked } = props;

  return (
    <div className="footer">
            <AdSlot text={text} imageUrl={imageUrl} adId={adId} handleImageClicked={handleImageClicked}  />

{/* {  imageUrl&&      <img src={imageUrl} alt="Ad" style={{margin:'auto',display:'flex'}} loading="lazy"/>
}        <p style={{color:'white'}}>{text}</p> */}
    </div>
  );
};

export default Footer;
