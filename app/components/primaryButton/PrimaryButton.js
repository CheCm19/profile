////////////////////////
// Import Modules
////////////////////////

// Note: node module imports
import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing,
  Text,
  LayoutAnimation,
} from 'react-native';
import PropTypes from "prop-types";

////////////////////////
// Import Commmon Files
////////////////////////

import {COLORS} from './../../common/styles'


////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

////////////////////////
// Constants
////////////////////////

// Numbers
const BORDER_ANIMATION_TO_VALUE_NUMBER = 3;
const BORDER_ANIMATION_DURATION_NUMBER = 1000;

////////////////////////
// Component
/////////////////////////


class PrimaryButton extends Component {


  ////////////////////////
  // Constructor
  ////////////////////////

  constructor(props) {
    super(props);

    this.state = {
      buttonBorderWidth: new Animated.Value(0)
    }

  }

  ////////////////////////
  // Private Methods
  ////////////////////////

  animateBorder() {
    Animated.timing(
        this.state.buttonBorderWidth,
        {
            toValue: BORDER_ANIMATION_TO_VALUE_NUMBER,
            duration: BORDER_ANIMATION_DURATION_NUMBER,
            easing: Easing.linear
        }
    ).start()
  }

  ////////////////////////
  // UI
  ////////////////////////
  

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} >
        <Animated.View style={[styles.buttonWrapper,{width: this.props.width, height: this.props.height, borderWidth: this.state.buttonBorderWidth}]}>
          <View>
            <Text style={styles.buttonText}>{this.props.label}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}


////////////////////
// Prop Type Checks
////////////////////////

PrimaryButton.defaultProps = {
    ...Component.defaultProps,
    // Default props definitions
  }

PrimaryButton.propTypes = {
  //Prop validation definitions for custom props
}

export default PrimaryButton;

