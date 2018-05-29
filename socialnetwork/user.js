import React from 'react';
import {TextInput, List, Filter, Edit, Create, DateField, ReferenceField, TextField, EditButton, DisabledInput, DateInput, LongTextInput, ReferenceInput } from 'admin-on-rest/mui';

export UserIcon from 'material-ui/svg-icons/social/people';

const UserFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="name" source="name" reference="user" referenceSource="name" allowEmpty/>
    </Filter>
);

export const UserList = (props) => (
    <List title="All users" {...props} filter={UserFilter}>
        <TextField label="KEY" source="_key" />
        <TextField label="Name" source="name" />
        <TextField label="NickName" source="nickname" />
        <TextField label="Provider" source="provider" />
        <EditButton />
    </List>
);

export const UserEdit = (props) => (
    <Edit {...props}>
        <TextInput label="Name" source="name" />
        <TextInput label="Key" source="_key" options={{ multiLine: true }} />
        <DateInput label="Key Date" source="keydate" />
        <TextInput label="Role" source="role" />
        <TextInput label="Provider" source="provider" />
        <TextInput label="Operator" source="operator" />

        <TextInput label="email" source="email" />
        <TextInput label="description" source="description" />
        <TextInput label="userid" source="userid" />
        <TextInput label="avatarurl" source="avatarurl" />
        <TextInput label="location" source="location" />
        <TextInput label="accesstoken" source="accesstoken" options={{ multiLine: true }} />
        <TextInput label="accesstokensecret" source="accesstokensecret" options={{ multiLine: true }} />
        <TextInput label="rawdata" source={"rawdata"} options={{ multiLine: true }} />

    </Edit>
);

export const UserCreate = (props) => (
    <Create {...props}>
        <ReferenceInput label="User" source="news" reference="news" referenceSource="news" allowEmpty />
        <TextInput label="Name" source="name" />
        <TextInput label="Key" source="key" options={{ multiLine: true }} />
        <DateInput label="Key Date" source="keydate" />
        <TextInput label="Role" source="role" />
        <TextInput label="Provider" source="provider" />
        <TextInput label="Operator" source="operator" />

        <TextInput label="email" source="email" />
        <TextInput label="description" source="description" />
        <TextInput label="userid" source="userid" />
        <TextInput label="avatarurl" source="avatarurl" />
        <TextInput label="location" source="location" />
        <TextInput label="accesstoken" source="accesstoken" options={{ multiLine: true }} />
        <TextInput label="accesstokensecret" source="accesstokensecret" options={{ multiLine: true }} />
        <TextInput label="rawdata" source={"rawdata"} options={{ multiLine: true }} />
    </Create>
);
