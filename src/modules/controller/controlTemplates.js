import React from 'react';


function Fieldsets({ header, element }) {

    return (
      <fieldset>
        <legend>{header}</legend>
        {element}
      </fieldset>
    )
};
  
function Inputs({
    label, 
    type, 
    name, 
    checked, 
    handler, 
    autoFocus
}) {

    return (
      <label>{label}:
        <input type={type ||'checkbox'} 
          name={name+1 || label} 
          checked={checked} 
          onChange={handler} 
          autoFocus={autoFocus}/>
      </label>
    )
};


export { Fieldsets, Inputs };