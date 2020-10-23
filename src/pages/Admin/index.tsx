import React from 'react';
// @ts-ignore
import { Admin, Resource } from 'react-admin';
// @ts-ignore
import restProvider from 'ra-data-simple-rest';
import UserList from '../../components/UserList';
import UserCreate from '../../components/UserCreate';
import UserEdit from '../../components/UserEdit';

const AdminPage: React.FC = () => {
  return (
      <Admin dataProvider={restProvider('http://31.148.99.34:3000')}>
          <Resource name='users' 
                    list={UserList} 
                    create={UserCreate} 
                    edit={UserEdit}/>
      </Admin>
  );
}

export default AdminPage;