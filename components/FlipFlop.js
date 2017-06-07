import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  Easing
} from 'react-native';

const validFlip = (flipValue, deg='0deg') => {
  return flipValue.interpolate({
    inputRange: [-1, 1],
    outputRange: ['0deg', deg]
  });
}

const getDirection = (state, flipValue, deg) => {
  const {vert, horiz} = state;
  const flip = validFlip(flipValue, deg);
  const noFlip = validFlip(flipValue)
  let rotateX = vert ?  flip : noFlip;
  let rotateY = horiz ? flip : noFlip;
  rotateX = {rotateX};
  rotateY = {rotateY};
  return [rotateX, rotateY]
}

export default class FlipFlop extends React.Component{

  constructor(props){
    super();
    let {
      vert = false,
      horiz = true,
      duration = 200,
    } = props;
    this.flipValue = new Animated.Value(-1);
    this.flopValue = 1;
    this.state={display: 0, max:props.children.length-1, rotateUp:true, vert, horiz, duration};
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
        duration: this.state.duration/2,
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
    let transform = []
    const{vert, horiz} = this.state;
    if (vert){
      const rotateX = this.flipValue.interpolate({
        inputRange: [-1, 1],
        outputRange: ['0deg', deg]
      });
      transform.push({rotateX});
    }
    if(horiz){
      const rotateY = this.flipValue.interpolate({
        inputRange: [-1, 1],
        outputRange: ['0deg', deg]
      });
      transform.push({rotateY});
    }

    transform = getDirection(this.state, this.flipValue, deg);

    const child = this.props.children[this.state.display]
    return (
        <TouchableWithoutFeedback onPress={this.clickCard.bind(this)}>
          <Animated.View
            style={{
              transform,
            }}
          >
            {child}
          </Animated.View>
        </TouchableWithoutFeedback>
    )
  }
}
