// This file abstracts the ImagePicker behavior
// to reduce duplication.

////////////////////////
// Import Modules
////////////////////////

import {
  ActionSheetIOS
} from "react-native"
import ImagePicker from 'react-native-image-crop-picker';
import OpenAppSettings from 'react-native-app-settings';
import DialogAndroid from 'react-native-dialogs';

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import {basicAlert} from  "./CSAlerts";
import {
deviceTypes, 
deviceOS
} from "./CSDevice";

////////////////////////
// Constants
////////////////////////

// Properties
const MEDIA_OPTIONS_PROPERTY              = { width: 300, height: 300, cropping: true }
// Strings  
const PHOTO_WARNING_HEADER_STRING         = "App Requires Photos Access";
const PHOTO_WARNING_BODY_STRING           = "Go to the app settings and enable Photos Permissions.";
const CAMERA_WARNING_HEADER_STRING        = "App Requires Camera Access";
const CAMERA_WARNING_BODY_STRING          = "Go to the app settings and enable Camera Permissions.";
const FILE_WARNING_HEADER_STRING          = "App Requires Storage Access";
const FILE_WARNING_BODY_STRING            = "Go to the app settings and enable Storage Permissions.";
const CANCEL_OPTIONS_STRING               = "Cancel";
const CAMERA_OPTIONS_STRING               = "Camera";
const GALLERY_OPTIONS_STRING              = "Gallery";
const SELECT_MEDIA_DIALOG_TITLE_STRING    = "Select Media";
// Regex Patterns
const IMAGE_ACCCESS_PATTERN               = /Cannot access images/;
const CAMERA_PERMISSIONS_PATTERN          = /camera permission/;
const ANDROID_FILE_PERMISSIONS_PATTERN    = /open failed: ENOENT/;
// Bool
const ALERT_VISIBLE_TRUE_BOOL             = true;
const ALERT_VISIBLE_FALSE_BOOL            = false;
// NUmbers
const CANCEL_BUTTON_INDEX_NUMBER           = 0;
const OPEN_CAMERA_BUTTON_INDEX_NUMBER      = 1;
const OPEN_GALLERY_BUTTON_INDEX_NUMBER     = 2;


//Arrays
const MEDIA_OPTIONS_IOS_ARRAY           = [CANCEL_OPTIONS_STRING, CAMERA_OPTIONS_STRING, GALLERY_OPTIONS_STRING];
const MEDIA_OPTIONS_ANDROID_ARRAY       = [CANCEL_OPTIONS_STRING, CAMERA_OPTIONS_STRING, GALLERY_OPTIONS_STRING, ];

class CSImagePicker {

  ////////////////////////
  // Constructor
  ////////////////////////

  constructor(){

    this._isAlertVisible = ALERT_VISIBLE_FALSE_BOOL;
    this._onImageLoadCallback = undefined;

    // Configure the android media dialog
    let andoridCameraDialogOptions = { 
      items: MEDIA_OPTIONS_ANDROID_ARRAY,
      title: SELECT_MEDIA_DIALOG_TITLE_STRING,
      itemsCallback: (id, text) => this._openMediaType(id)
    }
    this.mediaDialog = new DialogAndroid();
    this.mediaDialog.set(andoridCameraDialogOptions);


  }

  ////////////////////////
  // Callbacks
  ////////////////////////

  // Handles on Alert buttton press
  _onAlertButtonPress = () => {

    OpenAppSettings.open();
    this._isAlertVisible = ALERT_VISIBLE_FALSE_BOOL;

  }

  ////////////////////////
  // Private Methods
  ////////////////////////

  // Creates an alert takes a header and body
  _createAlert(header, body){
    if(!this._isAlertVisible){
      this._isAlertVisible = ALERT_VISIBLE_TRUE_BOOL;
      basicAlert(
        header, 
        body,
        this._onAlertButtonPress
      );
    }
  }


  // Process a newly selected image to be stored on the projectImage state
  _processImage(imageSource){

    let source = { uri: imageSource.path, mimeType: imageSource.mime};

    if(this._onImageLoadCallback != undefined)
      this._onImageLoadCallback(source);

  }
  
  // Handles opening the selected media type
  _openMediaType(buttonIndex){
    console.log(buttonIndex);
    if(buttonIndex == OPEN_CAMERA_BUTTON_INDEX_NUMBER){
      this.openCamera().then(image => {
        this._processImage(image);
      });
    }else if(buttonIndex == OPEN_GALLERY_BUTTON_INDEX_NUMBER){
      this.openGallery().then(image => {
        this._processImage(image);
      });
    }

  }

  ////////////////////////
  // Public Methods
  ////////////////////////

  // Opens the image media gallery
  openGallery(){

    return new Promise((resolve, reject) => {
      ImagePicker.openPicker(MEDIA_OPTIONS_PROPERTY).then(image => {
        resolve(image);
      }).catch(error=>{
        if(error.message.match(IMAGE_ACCCESS_PATTERN))
          this._createAlert(PHOTO_WARNING_HEADER_STRING, PHOTO_WARNING_BODY_STRING);
      });
    })

  }

  // Opens the camera
  openCamera(){

    return new Promise((resolve, reject) => {
      ImagePicker.openCamera(MEDIA_OPTIONS_PROPERTY).then(image => {
        resolve(image);
      }).catch(error=>{
        if(error.message.match(CAMERA_PERMISSIONS_PATTERN)){
          this._createAlert(CAMERA_WARNING_HEADER_STRING, CAMERA_WARNING_BODY_STRING); 
        }else if(error.message.match(ANDROID_FILE_PERMISSIONS_PATTERN)){
          this._createAlert(FILE_WARNING_HEADER_STRING, FILE_WARNING_BODY_STRING);
        }
      });
    });

  }

 // Opens a menu to allow to selct either camra or gallery
 openeMediaMenu(onImageLoad){

    if(onImageLoad != undefined){
      this._onImageLoadCallback = onImageLoad;
    }

    if(deviceOS == deviceTypes.ios){

      // Show the iOS Action Sheet
      ActionSheetIOS.showActionSheetWithOptions({
        options: MEDIA_OPTIONS_IOS_ARRAY,
        cancelButtonIndex: CANCEL_BUTTON_INDEX_NUMBER,
      },
      (buttonIndex) => {
        this._openMediaType(buttonIndex);
      });

    }else{

      // Show the android dialog
      this.mediaDialog.show();

    }

 }

}

export default CSImagePicker