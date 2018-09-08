import React, { Fragment } from 'react';
import log from './logger';

import StatePreview from './StatePreview';
import HilightRender from './HilightRender';

export default class Former extends React.Component {
  constructor(props) {
    super(props);
    this.previewRef = { ref: React.createRef(), name: '<StatePreview/>' };
  }

  members = [];

  registerMember = (member) => {
    log({ msg: `<Former/> register member ${member.name}`, type: 'event' });
    this.members = [...this.members, member];
  };

  componentDidMount() {
    this.members.forEach(({ name, watch, update, subscribeComponent }) => {
      subscribeComponent({
        update: this.previewRef.ref.current.update,
        name: this.previewRef.name,
      });
      if (!!watch && this.members.find(({ name }) => name === watch)) {
        this.members.find(({ name }) => name === watch).subscribeComponent({
          update,
          name,
        });
      }
    });
  }

  onSubmit = (handleSubmit) => (e) => {
    e.preventDefault();
    // const formState = [...this.members].reduce(
    //   (acc, { ref, name }) => ({ ...acc, [name]: ref.current.state.member }),
    //   {}
    // );

    const formState = this.previewRef.ref.current.state;
    log({ msg: `<Former/> onSubmit`, type: 'event' }, formState);
    if (true) this.reset(); // !!!

    return handleSubmit(formState);
  };

  reset = () => {
    log({ msg: `<Former/> reset`, type: 'event' });
    this.members.forEach(({ getState, setState, initialState }) => {
      if (getState().canReset) {
        setState({
          member: initialState,
          canReset: false,
        });
      }
    });
  };

  parseChildrenNodes = (children, registerMember) => {
    const rootNodes = React.Children.toArray(children);
    const formVDOM = rootNodes.reduce((dom, node, i) => {
      const ParsedNode = node.type;

      const injectProps = ParsedNode.name === 'Render';
      if (node.props.children) {
        const props = injectProps
          ? { key: i, ...node.props, registerMember }
          : { key: i, ...node.props };

        return [
          ...dom,
          <ParsedNode {...props}>
            {typeof node.props.children === 'function'
              ? node.props.children
              : this.parseChildrenNodes(node.props.children, registerMember)}
          </ParsedNode>,
        ];
      }
      return [...dom, <ParsedNode key={i} {...node.props} />];
    }, []);
    return formVDOM;
  };

  render() {
    log({ msg: `<Former/> render`, type: 'render' });
    const { children, handleSubmit, showStatePreview, ...rest } = this.props;
    return (
      <HilightRender>
        <StatePreview showStatePreview={showStatePreview} ref={this.previewRef.ref} />
        <form {...rest} onSubmit={this.onSubmit(handleSubmit)}>
          {/* {children} */}
          {this.parseChildrenNodes(children({ reset: this.reset }), this.registerMember)}
        </form>
      </HilightRender>
    );
  }
}
