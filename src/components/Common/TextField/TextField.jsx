import React from 'react';
import "./TextField.css"
function TextField({ label="label", value = "", onChange, disabled }) {
  return (
    <div className='TextField'>
      <label>{label}</label>
      <input
        type="text"
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextField;