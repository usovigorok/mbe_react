import React from 'react';

function Iframe(props) {
  return (
    <iframe src={props.url} width={props.width} height={props.height}></iframe>
  );
}

export default Iframe;