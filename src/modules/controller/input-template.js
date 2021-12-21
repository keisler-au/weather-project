import React from 'react';

  
export function Inputs({
  label, 
  type, 
  name,
  handler, 
  checked,
  autoFocus
}) {

  return (
    <label>
      {label}
      <input 
        type={type ||'checkbox'} 
        name={name}
        onChange={handler} 
        checked={checked}
        autoFocus={autoFocus}
      />
    </label>
  );
};
