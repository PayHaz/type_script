import React from 'react';
import 'antd/dist/antd.min.css';
import { Tabs } from 'antd';
import TabsContent from "../tabs-content";
import SearchPanel from "../SearchPanel";
import SingInModal from "../sing-in-modal";
import "./tabs-components.css"


const onChange = (key: string) => {
    console.log(key);
};

const TabsComponents: React.FC = () => (
    <div>
        <div className="up-group">
            <SearchPanel />
            <SingInModal />
        </div>
        <Tabs
            defaultActiveKey="1"
            onChange={onChange}
            className="tabs"
            items={[
                {
                    label: `Сотрудники`,
                    key: '1',
                    children: <TabsContent />,
                },
                {
                    label: `Сервера`,
                    key: '2',
                    children: `Content of Tab Pane 2`,
                },
                {
                    label: `Программное обеспечение`,
                    key: '3',
                    children: `Content of Tab Pane 3`,
                },
                {
                    label: `Услуги`,
                    key: '4',
                    children: `Content of Tab Pane 4`,
                },
                {
                    label: `Информационные системы`,
                    key: '5',
                    children: `Content of Tab Pane 5`,
                },
            ]}
        />
    </div>

);

export default TabsComponents;