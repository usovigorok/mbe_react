import React from 'react';

function Button(props) {
  return (
      <button onClick={props.onClick} className="btn btn-outline-primary">
        {props.caption}
      </button>
  );
}

export default Button;