import React, { Component, Fragment } from 'react';

import Former from './Former';

import NameInput from './NameInput';
import AgeInput from './AgeInput';
import CheckBoxGroup from './CheckBoxGroup';

import './App.css';

const formerMembers = [
  {
    name: 'nameInput',
    Component: NameInput,
    state: {
      value: 'hello',
    },
    stateKey: 'value',
  },
  {
    name: 'ageInput',
    Component: AgeInput,
    state: {
      value: '',
    },
    stateKey: 'value',
  },
  {
    name: 'checkBoxGroup',
    Component: CheckBoxGroup,
    state: {
      selectedIndex: null,
    },
    stateKey: 'selectedIndex',
  },
];

class App extends Component {
  render() {
    console.log('render App !!!!!!!!!!!!!!');
    return (
      <Former
        onSubmit={(formState) => console.log('formState', formState)}
        onError={(errors) => console.log('errors', errors)}
        formerMembers={formerMembers}
      >
        {({ reset }) => (
          <div
            className="member"
            style={{ marginTop: 20, textAlign: 'center' }}
          >
            <input type="submit" value="submit" />
            <input type="button" value="clear" onClick={reset} />
          </div>
        )}
      </Former>
    );
  }
}

export default App;
