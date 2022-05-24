import { Button, Card, List, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import Header from "../components/header";
const { Title } = Typography;

const App = () => {

    const data = [
        {
            title: 'Dev.by database',
            content: "Database of vacancies from dev.by",
            link: '/devby'
        },
        {
            title: 'My database',
            content: 'Database, when you can view, add, edit, search your own vacancies',
            link: '/my'
        },
    ];


    return (
        <>
            <Header />
            <div className="page__container app">
                <Title level={1}>Выберите базу данных</Title>

                <List size="large"
                    grid={{ gutter: 10, column: 2 }}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item size="large">
                            <Card size="large" title={item.title}>
                                {item.content}
                                <Row>
                                    <Link to={item.link}>go to database</Link>
                                </Row>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </>
    )
}

export default App;
