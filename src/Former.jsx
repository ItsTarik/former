import React, { Fragment } from 'react';
import WithController from './WithController';

const initialazeFormer = (props) => ({
  refs: props.formerMembers.map(({ name }) => ({
    ref: React.createRef(),
    name,
  })),
  formState: [],
});

export default class Former extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialazeFormer(props),
    };
  }

  // formerHandler = (i) => (event) => {
  //   console.log('***', this.state.refs[i].ref.current);
  //   this.state.refs[i].ref.current.handler(event.target.value);
  // };

  // renderFormMembers = (Components) =>
  //   Components.map((FormComponent, i) => {
  //     return (
  //       <FormComponent
  //         ref={this.state.refs[i]}
  //         handler={this.formerHandler(i)}
  //         key={i}
  //       />
  //     );
  //   });

  // componentDidMount() {
  //   this.getInitialFormState();
  // }

  renderFormMembers = (formerMembers) =>
    formerMembers
      .map(({ Component: MemberWithoutRef, state, stateKey }) =>
        React.forwardRef((props, ref) => {
          const Hocked = WithController(MemberWithoutRef);
          return (
            <Hocked state={state} {...props} stateKey={stateKey} ref={ref} />
          );
        })
      )
      .map((FormComponent, i) => {
        return (
          <FormComponent
            ref={this.state.refs[i].ref}
            // handler={this.formerHandler(i)}
            key={i}
          />
        );
      });

  // getInitialFormState = () => {
  //   const initialFormState = this.state.refs.reduce(
  //     (stateAcc, { current }) => [...stateAcc, current.state],
  //     []
  //   );

  //   this.setState({ formState: initialFormState, shouldRender: false });
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    const formState = this.state.refs.reduce((stateAcc, { ref, name }) => {
      // console.log('ref', ref);
      return { ...stateAcc, [name]: ref.current.state };
    }, {});
    // console.log('formState', JSON.stringify(formState, null, 4));
    this.props.onError('this is an error');
    this.props.onSubmit(formState);
  };

  reset = () => this.setState({ ...initialazeFormer(this.props) });

  render() {
    return (
      <Fragment>
        {
          <form onSubmit={this.handleSubmit} className="former__wrapper">
            {this.renderFormMembers(this.props.formerMembers)}
            {this.props.children({ reset: this.reset })}
          </form>
        }
      </Fragment>
    );
  }
}
