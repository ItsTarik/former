import React, { Fragment } from 'react';
import HilightRender from './HilightRender';
import log from './logger';

class StatePreview extends React.Component {
  state = {};

  update = (fragment, name) => {
    log({ msg: `<StatePreview /> notifiyed by ${name}`, type: 'notify' });
    this.setState(fragment);
  };

  render() {
    return (
      <Fragment>
        {this.props.showStatePreview && (
          <HilightRender>
            <pre className="state">{JSON.stringify(this.state, null, 4)}</pre>
          </HilightRender>
        )}
      </Fragment>
    );
  }
}

export default React.forwardRef((props, ref) => <StatePreview {...props} ref={ref} />);
