import React from 'react';

function Input(props) {
  return (
      <input type="text" className={props.className} onChange={props.onChange} name={props.name} defaultValue={props.value} />
  );
}

export default Input;