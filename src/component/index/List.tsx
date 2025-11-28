import {Descriptions, Table} from 'antd';
import {useEffect} from 'react';

import useIndexStroe from '@/store/useIndexStroe';

const COLUMNS = [
    {
        title: '项目名称',
        dataIndex: 'project_name',
        key: 'project_name',
    },
    {
        title: 'progress',
        dataIndex: 'progress',
        key: 'progress',
    },
    {
        title: 'pro_firm_number',
        dataIndex: 'pro_firm_number',
        key: 'pro_firm_number',
    },
    {
        title: 'pro_firm_type',
        dataIndex: 'pro_firm_type',
        key: 'pro_firm_type',
    },

    {
        title: 'project_create_user',
        dataIndex: 'project_create_user',
        key: 'project_create_user',
    },

    {
        title: 'firm',
        dataIndex: 'firm',
        key: 'firm',
    },

    {
        title: 'expect_finish_time',
        dataIndex: 'expect_finish_time',
        key: 'expect_finish_time',
    },
];

export default function Count() {
    let request = useIndexStroe((state) => state.request);
    let data = useIndexStroe((state) => state.data);

    useEffect(() => {
        request();
    }, [request]);

    return (
        <>
            <Descriptions title="Project Info">
                {data?.fields &&
                    Object.keys(data.fields)?.map((key) => (
                        <Descriptions.Item label={key} key={key}>
                            {JSON.stringify(data?.fields[key])}
                        </Descriptions.Item>
                    ))}
            </Descriptions>
            <Table dataSource={Array.isArray(data?.detail) ? data.detail : []} columns={COLUMNS} />
        </>
    );
}
