// Styles for PrimaryButton

////////////////////////
// Import Modules
////////////////////////

import {
  StyleSheet,
} from 'react-native'

////////////////////////
// Styles
////////////////////////


export default StyleSheet.create({

  buttonWrapper:{
    borderColor: "#00ff12",
    borderRadius: 30,
    marginTop: 40,
    backgroundColor: "#8a24b6", 
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText:{
    fontSize: 22,
    color: "white"
  },
  animatedPixelRightDown:{
    position: "absolute",
    top: 0, 
    left: 0,
    width: 2, 
    height: 2,
    backgroundColor: "#00ff12"
  },
  animatedPixelLeftUp:{
    position: "absolute",
    bottom: 0, 
    right: 0,
    width: 2, 
    height: 1,
    backgroundColor: "#00ff12"
  }
});

////
