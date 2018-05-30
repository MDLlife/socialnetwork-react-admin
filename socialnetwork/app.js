import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import { comentarismoAPI, Admin, Resource } from 'admin-on-rest';
import { Delete } from 'admin-on-rest/mui';

import { UserList, UserEdit, UserCreate, UserIcon } from './user';

import Dashboard from './dashboard';
import Settings from './settings';

const restClient = comentarismoAPI('https://api.mdl.live/v1');
// const restClient = comentarismoAPI('http://localhost:3010/v1');
render(
    <Admin dashboard={Dashboard} settings={Settings} restClient={restClient}>
        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} icon={UserIcon} />
    </Admin>,
    document.getElementById('root')
);
