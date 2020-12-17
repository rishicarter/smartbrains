import Tilt from 'react-tilt';
import './logo.css';
import logoww from './walterwhite.png';

const Logo = () =>{
    return(
        <Tilt className="Tilt pa3 shadow-3 br3 ma5 mt0" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
         <div className="Tilt-inner tc"><img src={logoww} alt='logo'/></div>
        </Tilt>
    );
}
export default Logo;