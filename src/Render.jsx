import React, { Fragment } from 'react';
import { fromJS } from 'immutable';

import log from './logger';
import HilightRender from './HilightRender';

const { keys } = Object;

class Render extends React.Component {
  constructor(props) {
    super(props);
    const { initialState } = props;

    this.state = {
      member: { ...initialState },
      // touched: keys(initialState).includes('value') && initialState.value.length > 0,
      canReset: false,
    };

    this.subscribedComponents = [];
  }

  componentDidMount() {
    log({ msg: `<Render/> (${this.props.name}) is mounted`, type: 'cdm' });

    const { registerMember, name, watch, initialState } = this.props;
    registerMember({
      name,
      watch,
      update: this.update,
      subscribeComponent: this.subscribeComponent,
      getState: () => this.state,
      setState: this.setState.bind(this),
      initialState,
    });
  }

  componentDidUpdate() {
    this.notify(this.subscribedComponents, {
      [this.props.name]: this.state.member,
    });
  }

  update = (change, caller) => {
    log({ msg: `<Render /> (${this.props.name}) notifiyed by ${caller}`, type: 'notify' });
    this.setState({});
  };

  subscribeComponent = ({ update, name }) => {
    log({ msg: `<Render/> subscribe ${name} to member ${this.props.name}`, type: 'event' });

    this.subscribedComponents = [...this.subscribedComponents, { update, name }];
    update({ [this.props.name]: this.state.member }, this.props.name);
  };

  notify = (subscribedComponents, change) => {
    subscribedComponents.forEach(({ update, name }) => {
      update(change, this.props.name);
    });
  };

  comparator = {
    maxLength: (v, c) => c.length <= v,
    minLength: (v, c) => c.length >= v,
  };

  evaluate = ({ schema, value }) =>
    keys(schema).reduce(
      (isValidAcc, schemaKey) => isValidAcc && this.comparator[schemaKey](schema[schemaKey], value),
      true
    );

  validate = (schema, value) => this.evaluate({ schema, value });

  setTouched = () => this.setState({ touched: true });

  render() {
    const { children, schema, name } = this.props;
    const { member, canReset } = this.state;
    // const isValid = schema ? this.validate(schema, this.state.member.value) : true;

    log({ msg: `<Render/> (${name}) render`, type: 'event' });
    return (
      <HilightRender>
        {children({
          state: member,
          // touched,
          // isValid,
          // onFocus: this.onFocus,
          setState: ({ ...args }) => {
            this.setState({
              canReset: true,
              // touched: true,
              member: { ...this.state.member, ...args },
            });
          },
          setTouched: this.setTouched,
          canReset,
        })}
      </HilightRender>
    );
  }
}

export default Render;
