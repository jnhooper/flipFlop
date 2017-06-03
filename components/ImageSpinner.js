import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Easing,
} from 'react-native';

export default class ImageSpinner extends React.Component {
  constructor () {
    super()
    this.spinValue = new Animated.Value(0)
  }

  componentDidMount () {
  this.spin()
  }

  spin () {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue:20,
        duration: 4000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }

  render (props={}) {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 10],
      outputRange: ['0deg', '360deg']
    })
    return (
      <View style={styles.container}>
        <Animated.View
          style={{transform: [{rotate: spin}] }}
        >
        {this.props.children}
        </Animated.View>
      </View>
    )
  }
}
// source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}

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
