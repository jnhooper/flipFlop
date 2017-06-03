import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';

export default class Spring extends React.Component {
  constructor () {
    super();
    this.initValue = 0.3;
    this.springValue = new Animated.Value(0.7);
    this.newValue = new Animated.Value(0.7);
    this.color = 'red'
  }
  setSpring(){
    let val = this.initValue > 0.5 ? 0.3 : 0.7;
    this.springValue.setValue(this.initValue);
    this.initValue = val;
  }

  spring () {
    let self = this;
    Animated.spring(
      this.springValue,
      {
        toValue: this.initValue,
        friction: 1,
        velocity: 0.5
      }
    ).start(()=> this.setSpring())
  }

  render(){
    let num = this.springValue
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.spring.bind(this)}>
          <Animated.View style={{height:200, width: 200, transform: [{scale: this.springValue}]}}>
          {this.props.children}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  custom:{
    borderWidth: 1,
    borderColor: 'red'
  }
});
