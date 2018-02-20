import React from 'react';

function InputBlock(props) {
  return (
      <div className='input-block'><label>{props.label}</label>
        <input type="text" className={props.className} onChange={props.onChange} name={props.name} defaultValue={props.value} />
      </div>
  );
}

export default InputBlock;