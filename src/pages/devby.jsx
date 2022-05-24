import { Col, Row, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import FormSearch from '../components/form-search';
import InfoComponent from '../components/info';
import ListComponent from '../components/list';
import devbyService from '../services/devby';
import { BarChartOutlined, DesktopOutlined } from '@ant-design/icons';
import DevbyStatisticsPage from './devby-statistics';
import Header from '../components/header'
const { TabPane } = Tabs;


const DevbyPage = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    const pageId = Number(id);

    const [isLoading, setIsLoading] = useState({ vacancy: false, vacancies: false });

    const [data, setData] = useState({vacancy: null, vacancies: null})

    const getVacancy = async () => {

        setIsLoading((isLoading) => ({ ...isLoading, vacancy: true }));
        const vacancy = await devbyService.getVacancy(Number(id));
        setData((data) => ({ ...data, vacancy: vacancy }));
        setIsLoading((isLoading) => ({ ...isLoading, vacancy: false }));
    }

    const getVacancies = async () => {

        setIsLoading((isLoading) => ({ ...isLoading, vacancies: true }));
        const vacancies = await devbyService.getVacancies();
        setData((data) => ({ ...data, vacancies: vacancies }));
        setIsLoading((isLoading) => ({ ...isLoading, vacancies: false }));
    }


    useEffect(() => {

        if (( !Number.isNaN(pageId)) &&  Number(data.vacancy?.id) !== pageId) {
            getVacancy();
        }
    }, [data, pageId])

    useEffect(() => {

        if (!data.vacancies && !isLoading.vacancies) {
            getVacancies();
        }

    }, [data.vacancies, isLoading.vacancies]);


    const onSubmit = async (values, props) => {
        setIsLoading((isLoading) => ({ ...isLoading, vacancies: true }));
        const vacancies = await devbyService.searchVacansies({
            text: values.search.text,
            city: values.search.city,
            specialization: values.search.specialization,
            level: values.search.level,
            salary: values.search.salary

        });
        setData((data) => ({ ...data, vacancies: vacancies }));
        props.setSubmitting(true);
        navigate('/devby')
        setIsLoading((isLoading) => ({ ...isLoading, vacancies: false }));
    }


    return (
        <>
            <Header/>
            <div className='page__container'>
                <Tabs defaultActiveKey="1" className='page__tabs' size='large'>
                    <TabPane tab={<span><DesktopOutlined />Просмотр</span>} key="1">
                        <Row>
                            <Col md={24} xs={24}>
                                <FormSearch onSubmit={onSubmit} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={!Number.isNaN(pageId) ? 7 : 24} xs={24}>
                                {
                                    <ListComponent isLoading={isLoading.vacancies} vacancies={data.vacancies} link={'devby'} />
                                }
                            </Col>
                            <Col md={!Number.isNaN(pageId) ? 17 : 0} xs={24}>
                                {
                                    (!Number.isNaN(pageId)) &&  <InfoComponent isLoading={isLoading.vacancy} vacancy={data.vacancy} />
                                }
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={<span><BarChartOutlined />Статистика</span>} key="2">
                        <DevbyStatisticsPage/>
                    </TabPane>
                </Tabs>

            </div>


        </>
    )
}

export default DevbyPage;
