import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  Easing
} from 'react-native';

export default class FlipFlop extends React.Component{

  constructor(props){
    super();
    console.log(props, this);
    this.flipValue = new Animated.Value(-1);
    this.flopValue = 1;
    this.state={display: 0, max:props.children.length-1, rotateUp:true};
  }

  clickCard(){
    const display = this.state.display === this.state.max? 0 : this.state.display+=1
    this.animate(false, display)
  }

  animate(endRotation = false, display){
    Animated.timing(
      this.flipValue,
      {
        toValue:this.flopValue,
        duration: 250,
        easing: Easing.linear
      }
    ).start(()=>this.toggleDisplay(endRotation, display));
  }

  toggleDisplay(endRotation, display){
    const self = this;
    if(!endRotation){
      this.setState({display, rotateUp: !this.state.rotateUp}, (props)=>{
        self.swapValues()
        self.animate(!endRotation, display);
      })
    }else{
      self.swapValues();
    }
  }

  swapValues(){
    this.flopValue = this.flopValue*-1;
    this.flipValue.setValue(this.flopValue * -1);
  }

  render(){
    const deg = this.state.rotateUp? '90deg' : '-90deg'
    const rotateX = this.flipValue.interpolate({
      inputRange: [-1, 1],
      outputRange: ['0deg', deg]
    });

    const child = this.props.children[this.state.display]
    return (
        <TouchableWithoutFeedback onPress={this.clickCard.bind(this)}>
          <Animated.View
            style={{
              transform: [{rotateX}]
            }}
          >
            {child}
          </Animated.View>
        </TouchableWithoutFeedback>
    )
  }
}
