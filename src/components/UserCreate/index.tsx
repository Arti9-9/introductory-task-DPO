import React from 'react';
import { Create, SimpleForm, TextInput } from "react-admin";

const UserCreate: React.FC<any> = (props) => {
  return (
      <Create title='Добавление нового пользователя' {...props}>
          <SimpleForm>
              <TextInput source='userLogin' />
          </SimpleForm>
      </Create>
  );
}

export default UserCreate;