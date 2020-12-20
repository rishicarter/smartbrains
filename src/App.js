import './App.css';
import Navigation from "./components/Navigation/navigation";
import Logo from "./components/Logo/logo";
import FormLink from "./components/ImageLinkForm/FormLink";
import UserDetails from "./components/Userdetails/UserDetails";
import FaceRecLink from "./components/FaceRecog/FaceRecLink.js";
import { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import properties from './properties';
import Signin from './components/Singin/signin';
import Register from './components/Register/register';


const app1 = new Clarifai.App({
    apiKey: properties.API
});

const particleOptions = {
  particles: {
    number : {
      value : 30,
      density : {
        enable : true,
        value_area : 800
      }
    }
  }
}
class App extends Component{
  constructor(){
    super();   
    // console.log(properties.API)
    this.state={
      input : '',
      inputUrl : '',
      box : '',
      route : 'signin',
      isSignin : false
    }
  }
  faceDetect = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  settingBox=(box) => {
    this.setState({box : box});
  }
  onInputChange = (event) => {
    this.setState({input : event.target.value});
  }
  onSubmitClick = () =>{
    this.setState({inputUrl : this.state.input});
    app1.models.predict(
      Clarifai.FACE_DETECT_MODEL
      ,this.state.input)
      .then(response => this.settingBox(this.faceDetect(response)))
      .catch(err => console.log(err))
  }
  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignin : false})
    }else if (route === 'home'){
      this.setState({isSignin : true})
    }
    this.setState({route : route})
  }
  render(){
    const { isSignin, box, inputUrl, route } = this.state;
    return (
      <>
        <Particles className='particles'
          params={particleOptions}
        />   
        <Navigation isSignin={isSignin} onRouteChange={this.onRouteChange}/>
        {route === 'home' ? 
          <div>
            <Logo />
            <UserDetails />
            <FormLink onInputChange={this.onInputChange} onSubmitClick={this.onSubmitClick}/>
            <FaceRecLink box = {box} inputURL={inputUrl}/>
          </div>
          : (route === 'signin' || route === 'signout') ?<Signin onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
        }
      </>
    );
  };
}

export default App;
