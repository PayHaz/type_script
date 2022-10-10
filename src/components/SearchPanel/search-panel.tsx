import { Input, Space } from 'antd';
import React from 'react';

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const SearchPanel: React.FC = () => (
    <Space direction="vertical">
        <Search placeholder="Введите ключевое слово для поиска" onSearch={onSearch} style={{ width: 300 }} />
    </Space>
);

export default SearchPanel;