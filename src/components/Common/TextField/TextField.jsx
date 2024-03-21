import React, { useState, forwardRef } from 'react';
import "./TextField.css";

const TextField = forwardRef(({ label="label", type="text", value = "", onChange, disabled, rules, error, setError, rigthIcon }, ref) => {
  const [input, setInput] = useState(value);
  
  if (!setError) [error, setError] = useState(error)
  
  const handleChange = (event) => {
    if (error) setError(false)
    setInput(event.target.value);
    onChange && onChange(event);
  };

  const validate = () => {
    console.log("validating");
    // ejecutara rules con el input y si devuelve false marcara error en el input
    if (rules && !rules(input)) setError(true)
  }

  return (
    <div className='TextField'>
      <label>{label}</label>
      <input
        ref={ref}
        className={`${error && 'error'} ${rigthIcon && 'inputWithIcon'}`}
        type={type}
        value={input}
        disabled={disabled}
        onChange={handleChange}
        onBlur={validate}
      />
      {rigthIcon && (
        <div className="rigthIcon">
          {rigthIcon}
        </div>
        )}
      
    </div>
  );
});

export default TextField;