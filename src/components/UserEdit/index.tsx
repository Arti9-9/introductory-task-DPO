import React from 'react';
import { Edit, SimpleForm, TextInput } from "react-admin";

const UserEdit: React.FC<any> = (props) => {
    return (
        <Edit title='Изменение данных пользователя' {...props}>
            <SimpleForm>
                <TextInput disabled source='id' />
                <TextInput source='userLogin' />
            </SimpleForm>
        </Edit>
    );
}

export default UserEdit;