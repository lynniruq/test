
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Siderbar';

function MockupAds(props) {
    const { headerIMG,sidebarIMG,footerIMG,text } = props;
    const [headerImageClicked, setHeaderImageClicked] = useState(0);
    
    function handleImageClicked(){
        let clicks = headerImageClicked+1
        setHeaderImageClicked(clicks)
        console.log({headerImageClicked})
    }

  return (
    <div style={{width:'100%'}}>
        <Header imageUrl={headerIMG} text={text} handleImageClicked={handleImageClicked}/>
       
    </div>
  );
}

export default MockupAds;
