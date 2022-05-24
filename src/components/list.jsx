import { Table } from 'antd';
import { Link } from 'react-router-dom';

const ListComponent = ({ vacancies, isLoading, link }) => {

    const listColumns = [
        {
            title: 'Вакансии',
            dataIndex: 'title',
            render: (text, row, index) => <Link key={index} to={'/' + link + '/' + String(vacancies[index].id)}>{text}</Link>
        },
    ]

    return (
        <div className='list'>
            <Table
                showHeader={false}
                size='large'
                columns={listColumns}
                loading={isLoading}
                bordered
                dataSource={vacancies}
                pagination={{ defaultPageSize: 8, showSizeChanger: false, size: "small" }}
            />
        </div>
    )
}

export default ListComponent;
