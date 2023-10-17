
import '../style/footer.css';
import AdSlot from '../utils/AdSlot';

function Header(props) {
    const { imageUrl,text,handleImageClicked,adId } = props;

    return (
      <div className={'header'}> 
      <div className={'header-contet'}>
      <AdSlot text={text} textClassName={'header-text'} imageUrl={imageUrl} handleImageClicked={handleImageClicked} className={'header-img'} adId={adId}/>

      {/* <label 
        style={{width:'150px',cursor:'pointer',fontWeight:'bold',textAlign:'center',color:'red',background:'white',borderRadius:'25px',margin:'auto',padding:'auto',fontSize:'24px'}}>
            {text}</label>
        <img src={imageUrl} alt="Ad" style={{margin:'auto',display:'flex',width:'600px',height:'150px',cursor:'pointer'}} 
        onClick={handleImageClicked} loading="lazy"/> */}
      </div>
        
    </div>
    );
  }
  
  export default Header;