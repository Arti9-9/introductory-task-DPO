import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, } from "react-admin";

const UserList: React.FC<any> = (props) => {
  return (
      <List {...props}>
          <Datagrid>
              <TextField source='id' />
              <TextField source='userLogin' />
              <EditButton basePath='/users' />
              <DeleteButton basePath='/users' />
          </Datagrid>
      </List>
  );
}

export default UserList;