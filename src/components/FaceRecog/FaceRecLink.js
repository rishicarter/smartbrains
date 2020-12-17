import './FaceRecog.css';
const FaceRecLink = ({ inputURL, box }) => {
    return(
        <div className='center ma'>
            <div className='mt2 absolute'>
                <img id='inputimage' alt='' src={inputURL} width='500px' height='auto'/>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    );
}
export default FaceRecLink;