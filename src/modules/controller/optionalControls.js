import React from 'react';

import { categoryTemplate } from './app';
import { Categories } from './categoryControls';
import { Fieldsets } from './controlTemplates';
import { Days } from './dayControls';
import { Temperatures } from './temperatureControls';


export function OptionalInputs() {
  const categories = Object.keys(categoryTemplate),

  fieldsetContent = [
    ['Unit measurements', <Temperatures />],
    ['div', 'Only include (categories selected)'],
    ['"Current Weather" table',
    <Categories table="current" categories={['Date', 'Time', ...categories]} /> ],
    ['"8 Day Forecast" table', 
    <Categories table="daily" categories={categories} /> ],
    ['div', 'Only include (days selected)'],
    ['"8 Day Forecast" table', <Days />]
  ],

  fieldsets = fieldsetContent.map(([header, element], i) => {
      return header === 'div' 
        ? <div key={i.toString()}>{element}</div>
        : <Fieldsets key={i.toString()} header={header} element={element} />
      });

  return fieldsets
};