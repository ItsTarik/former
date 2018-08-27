import React, { Component } from 'react';

const checkboxes = ['male', 'female', 'other'];

class CheckBoxGroup extends Component {
  render() {
    console.log('CheckBoxGroup', this.props.selectedIndex);
    return (
      <div className="member" style={{ textAlign: 'center' }}>
        <fieldset>
          <legend>Gender</legend>
          {checkboxes.map((name, i) => (
            <span style={{ marginLeft: 10 }} key={name}>
              <input
                id={name}
                name={name}
                type="checkbox"
                checked={i === this.props.selectedIndex}
                onChange={() => this.props.handler(i)}
              />
              <label htmlFor={name}>{name}</label>
            </span>
          ))}
        </fieldset>
      </div>
    );
  }
}

export default CheckBoxGroup;
