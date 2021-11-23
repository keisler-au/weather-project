import React, { useContext } from 'react';

import { Context } from '../../view/app';
import { filterData } from '../../model/filteringData';


export function Categories({ table, categories }) {
    const {
      data, 
      daysIncluded, 
      filterStatus, 
      setFilterStatus, 
      setFilteredData
    } = useContext(Context);
  
    function categoryDisplay({ target: { name, checked } }) {
      setFilterStatus(pre => { 
        return {
          ...pre, 
          [table]: {
            ...pre[table], 
            [name]:checked
          }
        } 
      });
      setFilteredData(pre => {
        return {
          ...pre, 
          [table]: filterData({
            ...filterStatus[table],
             [name]: checked}, 
             data[table],
          ((table === 'daily' && daysIncluded) || null)
          ) }
      });
    };
  
    const categoryInputs = categories.map(category => {
      return <Inputs key={category}
        label={category} 
        checked={filterStatus[table][category]}
        handler={categoryDisplay} 
      />
    });
  
    return categoryInputs
  };