import './App.css';
import Navigation from "./components/Navigation/navigation";
import Logo from "./components/Logo/logo";
import FormLink from "./components/ImageLinkForm/FormLink";
import UserDetails from "./components/Userdetails/UserDetails";
import FaceRecLink from "./components/FaceRecog/FaceRecLink.js";
import { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app1 = new Clarifai.App({
    apiKey: 'bdb6fc001b084ea497c013eb4fa0623a'
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
    this.state={
      input : '',
      inputUrl : '',
      box : ''
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
  render(){
    return (
      <>
        <Particles className='particles'
          params={particleOptions}
        />   
        <Navigation />
        <Logo />
        <UserDetails />
        <FormLink onInputChange={this.onInputChange} onSubmitClick={this.onSubmitClick}/>
        <FaceRecLink box = {this.state.box} inputURL={this.state.inputUrl}/>
      </>
    );
  };
}

export default App;
