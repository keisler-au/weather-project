import React, { useContext } from "react";

import { Context } from "../view/app";
import { filterData } from "../model/filtering-data";
import { Inputs } from "./input-template";


function Categories({ table, categories }) {
  const {
    data, 
    daysIncluded, 
    filteredCategories, 
    setFilteredCategories, 
    setFilteredData
  } = useContext(Context);

  function categoryDisplay({ target, target: { checked, parentElement } }) {
    const fieldsetChildren = [...parentElement.parentElement.children];
    fieldsetChildren.shift();
    if (parentElement.textContent === 'deselect') {
      fieldsetChildren.forEach(element => {
        element.className = !checked ? 'input-unselected' : '';
        element.children[0].checked = checked;
      });

      for (const category in filteredCategories[table]) {
        filteredCategories[table][category] = checked ? true : false;
      };
    } 
    else {
      parentElement.className = !checked ? 'input-unselected' : '';

      filteredCategories[table] = {
        ...filteredCategories[table], 
        [parentElement.textContent]: checked
      }
    }

    setFilteredCategories(pre => (
      {
        ...pre,
        [table]: filteredCategories[table]
      }
    ));
  
    setFilteredData(pre => (
      { 
        ...pre,
        [table]: filterData(filteredCategories, data, daysIncluded, [table])[table]
      } 
    ));
  };

  const categoryInputs = categories.map(category => (
    // return <exports.Inputs 
    //   key={category}
    //   label={category} 
    //   handler={categoryDisplay} 
    //   checked={filteredCategories[table][category]}
    // />

    <label key={category} >
    {category}
    <input 
      type={"checkbox"}
      onChange={categoryDisplay} 
      defaultChecked
    />
  </label>
  ));

  return categoryInputs
};


const exports = { Categories, Inputs };
export default exports;
export { Categories };