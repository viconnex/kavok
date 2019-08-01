import React from 'react';
import { List, Datagrid, TextField, BooleanField, NumberField } from 'react-admin';

export const QuestionList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="option1" label="Option 1" />
      <TextField source="option2" label="Option 2" />
      <NumberField source="category.name" label="Catégorie" />
      <BooleanField source="isClassic" label="Classique ?" />
      <NumberField source="option1Votes" label="Votes 1" />
      <NumberField source="option2Votes" label="Votes 2" />
    </Datagrid>
  </List>
);
