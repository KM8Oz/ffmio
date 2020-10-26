import { Admin, Resource } from 'react-admin';
import dataProvider from './dataprovider';
import { DbList } from './databases';
import React from 'react';
// import simpleRestProvider from './ra-strapi-rest';


// const dataProvider = simpleRestProvider('http://localhost:1337');

const DataMg = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="contries" list={DbList} />
    </Admin>
);

export default DataMg;