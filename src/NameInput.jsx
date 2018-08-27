import React from 'react';

const NameInput = ({ value, handler }) => {
  console.log('render NameInput');
  return (
    <input
      className="member"
      placeholder="NameInput"
      type="text"
      value={value}
      onChange={handler}
    />
  );
};

export default NameInput;
