import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import ruRu from 'antd/lib/locale/ru_RU';
import { ConfigProvider } from 'antd';
import RouterComponent from './routing';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={ruRu}>
        <RouterComponent/>
    </ConfigProvider>
);

