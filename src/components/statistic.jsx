import { Col, Row, Statistic, Table, Tabs, Typography } from "antd";
import Diagramm from "./diagramm";
import { LineChartOutlined, BorderlessTableOutlined } from '@ant-design/icons';
import { cityCountColumns, englishCountColumns, experienceCountColumns, levelCountColumns, specializationCountColumns } from "../data/statistic-columns";
import Spinner from "./spinner/spinner";

const { TabPane } = Tabs;
const { Title } = Typography;

const Statistics = ({ data }) => {

    if (!data || !data.levelCount || !data.experienceCount || !data.cityCount || !data.englishCount || !data.averageSalary || !data.specializationCount) {
        return <Spinner />
    }


    return (
        <>

            {
                data && data.levelCount && data.experienceCount && data.cityCount && data.englishCount && data.averageSalary && data.specializationCount && (
                    <div className="statistic">
                        <Row className="statistic__row">
                            <Col md={8} xs={24}>
                                <Statistic size="large" title="Количество вакансий" value={data.vacanciesCount} />
                            </Col>

                            <Col md={8} xs={24}>
                                <Statistic size="large" title="Количество направлений" value={data.specializationsCount} />

                            </Col>
                            <Col md={8} xs={24}>
                                <Statistic size="large" title="Количество компаний" value={data.companiesCount} />
                            </Col>
                        </Row>


                        <div>
                            <Title level={1}>Зарплата</Title>
                            <Row className="statistic__row">
                                <Col md={6} xs={24}>
                                    <Statistic size="large" title="Минимальная стартовая" value={Math.round(data.averageSalary.minFrom) + " $"} />
                                </Col>

                                <Col md={6} xs={24}>
                                    <Statistic size="large" title="Максимальная стартовая" value={Math.round(data.averageSalary.maxFrom) + " $"} />

                                </Col>
                                <Col md={6} xs={24}>
                                    <Statistic size="large" title="Минимальная конечная" value={Math.round(data.averageSalary.minTo) + " $"} />
                                </Col>

                                <Col md={6} xs={24}>
                                    <Statistic size="large" title="Максимальная конечная" value={Math.round(data.averageSalary.maxTo) + " $"} />

                                </Col>
                            </Row>

                            <Row className="statistic__row">
                                <Col md={6} xs={24}>
                                    <Statistic size="large" title="Средняя стартовая" value={Math.round(data.averageSalary.averageFrom) + " $"} />
                                </Col>

                                <Col md={6} xs={24}>
                                    <Statistic size="large" title="Средняя" value={Math.round(data.averageSalary.average) + " $"} />

                                </Col>
                                <Col md={6} xs={24}>
                                    <Statistic size="large" title="Средняя конечная" value={Math.round(data.averageSalary.averageTo) + " $"} />
                                </Col>
                            </Row>


                        </div>


                        <div>
                            <Title level={1}>Количество вакансий</Title>
                            <Title level={2}>Уровень</Title>
                            <Tabs size="large" defaultActiveKey="1" >
                                <TabPane tab={<span><BorderlessTableOutlined />Таблица</span>} key="1">
                                    <Row>
                                        <Col md={24} xs={24}>
                                            <Table size="large"
                                                columns={levelCountColumns}
                                                dataSource={data.levelCount}
                                            />
                                        </Col>
                                    </Row>

                                </TabPane>
                                <TabPane tab={<span><LineChartOutlined />Диаграмма</span>} key="2">
                                    <Row>
                                        <Col md={24} xs={24}>
                                            <Diagramm title="Уровень" titles={data.levelCount.map(el => el.title)} counts={data.levelCount.map(el => el.count)} />
                                        </Col>
                                    </Row>
                                </TabPane>
                            </Tabs>
                        </div>


                        <div>

                            <Title level={2}>Опыт</Title>
                            <Tabs size="large" defaultActiveKey="1" >
                                <TabPane tab={<span><BorderlessTableOutlined />Таблица</span>} key="1">
                                    <Row>
                                        <Col md={24} xs={24}>
                                            <Table size="large"
                                                columns={experienceCountColumns}
                                                dataSource={data.experienceCount}
                                            />
                                        </Col>
                                    </Row>

                                </TabPane>
                                <TabPane tab={<span><LineChartOutlined />Диаграмма</span>} key="2">
                                    <Row>
                                        <Col md={24} xs={24}>
                                            <Diagramm title="Опыт" titles={data.experienceCount.map(el => el.title)} counts={data.experienceCount.map(el => el.count)} />
                                        </Col>
                                    </Row>
                                </TabPane>
                            </Tabs>
                        </div>

                        <div>

                            <Title level={2}>Город</Title>
                            <Tabs size="large" defaultActiveKey="1" >
                                <TabPane tab={<span><BorderlessTableOutlined />Таблица</span>} key="1">
                                    <Row>
                                        <Col md={24} xs={24}>
                                            <Table size="large"
                                                columns={cityCountColumns}
                                                dataSource={data.cityCount}
                                            />
                                        </Col>
                                    </Row>

                                </TabPane>
                                <TabPane tab={<span><LineChartOutlined />Диаграмма</span>} key="2">
                                    <Row>
                                        <Col md={24} xs={24}>
                                            <Diagramm title="Опыт" titles={data.cityCount.map(el => el.title)} counts={data.cityCount.map(el => el.count)} />
                                        </Col>
                                    </Row>
                                </TabPane>
                            </Tabs>
                        </div>

                        <div>

                            <Title level={2}>Уровень английского</Title>
                            <Tabs size="large" defaultActiveKey="1" >
                                <TabPane tab={<span><BorderlessTableOutlined />Таблица</span>} key="1">
                                    <Row>
                                        <Col md={24} xs={24}>
                                            <Table size="large"
                                                columns={englishCountColumns}
                                                dataSource={data.englishCount}
                                            />
                                        </Col>
                                    </Row>

                                </TabPane>
                                <TabPane tab={<span><LineChartOutlined />Диаграмма</span>} key="2">
                                    <Row>
                                        <Col md={24} xs={24}>
                                            <Diagramm title="Опыт" titles={data.englishCount.map(el => el.title)} counts={data.englishCount.map(el => el.count)} />
                                        </Col>
                                    </Row>
                                </TabPane>
                            </Tabs>
                        </div>

                        <div>

                            <Title level={2}>Специализация</Title>
                            <Tabs size="large" defaultActiveKey="1" >
                                <TabPane tab={<span><BorderlessTableOutlined />Таблица</span>} key="1">
                                    <Row>
                                        <Col md={24} xs={24}>
                                            <Table size="large"
                                                columns={specializationCountColumns}
                                                dataSource={data.specializationCount}
                                            />
                                        </Col>
                                    </Row>

                                </TabPane>
                                <TabPane tab={<span><LineChartOutlined />Диаграмма</span>} key="2">
                                    <Row>
                                        <Col md={24} xs={24}>
                                            <Diagramm title="Опыт" titles={data.specializationCount.map(el => el.title)} counts={data.specializationCount.map(el => el.count)} />
                                        </Col>
                                    </Row>
                                </TabPane>
                            </Tabs>
                        </div>


                    </div>)
            }



        </>
    )
}

export default Statistics;
