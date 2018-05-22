////////////////////////
// Import Modules
////////////////////////

// Note: node module imports
import React, { Component } from 'react';
import {
  View,
  Image,
  Animated,
  TouchableOpacity,
  Easing,
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

const PULSE_ANIMATION_INPUT_RANGE = [1, 1.1];
const PULSE_ANIMATION_OUTPUT_RANGE = [1, 1.1];

////////////////////////
// Component
/////////////////////////


class Avatar extends Component {


  ////////////////////////
  // Constructor
  ////////////////////////

  constructor(props) {
    super(props);
  
    this.state = {
       pulseAnim: new Animated.Value(1)
    };

  }

  ////////////////////////
  // Private Methods
  ////////////////////////
  

  _pulseAnimation(){

    Animated.sequence([
      Animated.timing(
        this.state.pulseAnim,
        {
          toValue: 1,
          duration: 200,
          easing: Easing.linear
        }
      ),
      Animated.timing(
        this.state.pulseAnim,
        {
          toValue: 1.1,
          duration: 200,
          easing: Easing.linear
        }
      ),
      Animated.timing(
        this.state.pulseAnim,
        {
          toValue: 1,
          duration: 200,
          easing: Easing.linear
        }
      ),
    ]).start(() => {
      if(this.props.isAnimating){
        this._pulseAnimation();
      }
    });

  }

  ////////////////////////
  // Life Cycle
  ////////////////////////
  
  componentDidMount() {
    if(this.props.isAnimating)
      this._pulseAnimation();                   
  }

  ////////////////////////
  // UI
  ////////////////////////
  

  render() {
    return (
      <Animated.View style={[{transform: [
              {scaleX: this.state.pulseAnim.interpolate({
                inputRange: PULSE_ANIMATION_INPUT_RANGE,
                outputRange: PULSE_ANIMATION_OUTPUT_RANGE
              })}
        ]}]}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image source={this.props.source} style={[styles.avatar]} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

////////////////////
// Prop Type Checks
////////////////////////

Avatar.defaultProps = {
    ...Component.defaultProps,
    // Default props definitions
  }

Avatar.propTypes = {

}

export default Avatar;

