////////////////////////
// Imports
////////////////////////

import React, { Component } from 'react';
import { 
Text, 
View,
ImageBackground,
StyleSheet 
} from 'react-native';

import DropdownAlert from 'react-native-dropdownalert';


////////////////////////
// Import Libs
////////////////////////

import CSImagePicker from "./../lib/CSImagePicker"; 


////////////////////////
// Import Common Files
////////////////////////

import {FONT_WEIGHTS, COLORS} from './../common/styles'

////////////////////////
// Import Components
////////////////////////

import Avatar from './../components/avatar';
import PrimaryButton from './../components/primaryButton';

////////////////////////
// Constants
////////////////////////

// Images
const PROFILE_PLACEHOLDER_IMAGE   = require("./../assets/profile/profile-placeholder.jpg");
const VERIFIED_CHECK_IMAGE 			  = require("./../assets/profile/verify-button-circle.png");
const BACKGROUND_IMAGE						= require("./../assets/profile/background.jpg");
// Properties
const IMAGE_BACKGROUND_OPACITY    = 0.5;
// Props
const NEXT_BUTTON_LABEL           = "Next";
const NEXT_BUTTON_WIDTH           = 220;
const NEXT_BUTTON_HEIGHT          = 60;
const ERROR_BANNER_CLOSE_INTERVAL = 2000;



class Profile extends Component {

  

  constructor(props) {
    super(props);
  
    this.state = {
    	profileImage: PROFILE_PLACEHOLDER_IMAGE,
      profileSet: false,
      profileAnimating: true
    };

    this._csImagePicker = new CSImagePicker();
  }

  ////////////////////////
  // Callbacks
  ////////////////////////

  // Handles logic for an image has been selected by a user
  _onImageLoad = (imageSource) => {

    this.setState({
      profileImage: imageSource
    })

    this.setState({profileAnimating: false, profileSet: true});
    this._nextButton.animateBorder();
  }
  
  // Handles on Image Avtar press
  _onProfileImagePress = () => {

  	this._csImagePicker.openeMediaMenu(this._onImageLoad);

  }

  _onNextButtonPress = () => {

    if(!this.state.profileSet)
     this.dropdown.alertWithType('error', 'Error', "Please select a profile image");


  }



  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    return (
     <View style={styles.container}>
        <View style={styles.profileBackground} >
          <ImageBackground 
          style={styles.profileBackgroundImageWrapper}
          opacity={IMAGE_BACKGROUND_OPACITY}
          source={BACKGROUND_IMAGE}>
            <View style={styles.profileWrapper}>
              <Avatar isAnimating={this.state.profileAnimating} source={this.state.profileImage} onPress={this._onProfileImagePress}/>
              <Text style={styles.profileInstruction}> 
                Please Select a Profile Image
              </Text>
              <Text style={styles.profileDescription}>
				        The profile image will be displayed publicly for everyone to see!
              </Text>
              <PrimaryButton ref={ref => this._nextButton = ref} onPress={this._onNextButtonPress} label={NEXT_BUTTON_LABEL} width={NEXT_BUTTON_WIDTH} height={NEXT_BUTTON_HEIGHT} />
            </View>
          </ImageBackground>
         </View>
        <DropdownAlert closeInterval={ERROR_BANNER_CLOSE_INTERVAL} ref={ref => this.dropdown = ref} />
      </View>
    );
  }
}

////////////////////////
// Screen Styles
////////////////////////

const styles = StyleSheet.create({

  container: {
    flex: 1,  
  },
  
  ////////////////////
  // Profile
  ///////////////////
  
  profileBackground:{
  	flex: 1,
    backgroundColor: COLORS.BLACK
  },
  profileBackgroundImageWrapper:{
  	flex: 1,
    justifyContent: 'center'
  },

  profileWrapper:{
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: "center",
  },

  profileInstruction:{
    marginVertical: 10,
    fontSize: 20,
    fontWeight: FONT_WEIGHTS.NORMAL,
    color: COLORS.WHITE,
  },
  profileDescription:{
    color: COLORS.WHITE,
    fontWeight: FONT_WEIGHTS.LIGHT,
    textAlign: "center",
    opacity: 0.7
  },
  
  
});

export default Profile