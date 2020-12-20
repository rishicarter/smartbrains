const Navigation = ({ onRouteChange, isSignin }) => {
    if (isSignin){
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={ () => onRouteChange('signout') }
                    className='f3 dim pa3 link black underline pointer'>
                    Sign out!!
                </p>
            </nav>
        );
    }else{
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={ () => onRouteChange('signin') }
                    className='f3 dim pa3 link black underline pointer'>
                    Sign In
                </p>
                <p onClick={ () => onRouteChange('register') }
                    className='f3 dim pa3 link black underline pointer'>
                    Register
                </p>
            </nav>
        ); 
    }
}
export default Navigation;