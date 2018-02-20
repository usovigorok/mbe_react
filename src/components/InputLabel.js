import React from 'react';
import Input from './Input';

function InputLabel(props) {
  if (props.edit) {
    return (
        <Input className="long-text" label={props.prefix} value={props.text} onChange={props.onChange}  />
    );
  } else {
    return (
        <label className="green-label">
          {props.prefix}{props.text}
        </label>
    );
  }
}

export default InputLabel;