import React, {
  Component,
  Animated,
} from 'react-native';


export default class FadeInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), //a new animated value (animation api form rn)
    };
  }

  componentDidMount() {  //to start timing animation , execute over 500 ms +delay
    const { delay } = this.props;

    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      delay: delay,
      duration: 500,
    })
    .start();
  }

  render() {
    return (
      <Animated.View   //animate the opacity, animated gonna be rerendered and every time the value changes
        style={{ opacity: this.state.fadeAnim }}>
        { this.props.children }
      </Animated.View>
   );
  }
 }

FadeInView.propTypes = {
  children: React.PropTypes.object,
  delay: React.PropTypes.number,
};
