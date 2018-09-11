import { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touched: props.state.value.length > 0,
      ...props.state,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.canReset === false && prevState.touched === true) {
      return { touched: false };
    }
    return null;
  }

  onBlur = () => this.setState({ touched: true });

  render() {
    const { state, setState, children, canReset, validation, setTouched } = this.props;

    const isReallyTouched = this.state.value.length > 0 ? true : this.state.touched && canReset;
    const isValid = isReallyTouched && state.value.length > 5 && state.value.length < 10;

    // console.log('isReallyTouched', isReallyTouched);

    return children({
      state,
      setState,
      touched: isReallyTouched,
      valisationClass: isValid ? 'valid' : 'invalid',
      isValid,
      onBlur: this.onBlur,
    });
  }
}

export default Input;
