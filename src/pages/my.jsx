import { Button, Col, Collapse, Row, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import FormSearch from '../components/form-search';
import InfoComponent from '../components/info';
import ListComponent from '../components/list';
import myService from '../services/my';
import { BarChartOutlined, DesktopOutlined, PlusCircleOutlined } from '@ant-design/icons';
import MyStatisticsPage from './my-statistics';
import Header from '../components/header';
const { TabPane } = Tabs;


const MyPage = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    const pageId = Number(id);

    const [isLoading, setIsLoading] = useState({ vacancy: false, vacancies: false });

    const [data, setData] = useState({ vacancy: null, vacancies: null })

    const getVacancy = async () => {

        setIsLoading((isLoading) => ({ ...isLoading, vacancy: true }));
        const vacancy = await myService.getVacancy(Number(id));
        setData((data) => ({ ...data, vacancy: vacancy }));
        setIsLoading((isLoading) => ({ ...isLoading, vacancy: false }));
    }

    const getVacancies = async () => {

        setIsLoading((isLoading) => ({ ...isLoading, vacancies: true }));
        const vacancies = await myService.getVacancies();
        setData((data) => ({ ...data, vacancies: vacancies }));
        setIsLoading((isLoading) => ({ ...isLoading, vacancies: false }));
    }


    useEffect(() => {

        if ((!Number.isNaN(pageId)) && Number(data.vacancy?.id) !== pageId) {
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
        const vacancies = await myService.searchVacansies({
            text: values.search.text,
            city: values.search.city,
            specialization: values.search.specialization,
            level: values.search.level,
            salary: values.search.salary

        });
        setData((data) => ({ ...data, vacancies: vacancies }));
        props.setSubmitting(true);
        navigate('/my')
        setIsLoading((isLoading) => ({ ...isLoading, vacancies: false }));
    }

    const handleAddClick = () => {
        navigate('/my/add')
    }

    const HandleEditClick = () => {
        navigate('edit')
    }

    const HandleDeleteClick = async () => {

        const result = await myService.deleteVacancy(Number(pageId));

        if (result) {
            navigate('/my');
            getVacancies();

        }

    }



    return (
        <>
            <Header />
            <div className='page__container'>
                <Tabs defaultActiveKey="1" className='page__tabs' size='large'>
                    <TabPane tab={<span><DesktopOutlined />Просмотр</span>} key="1">

                        <Row>
                            <Col md={24} xs={24}>
                                <FormSearch onSubmit={onSubmit} />
                            </Col>
                        </Row>

                        <div className="button-add__container">
                            <Button
                                shape="round"
                                size='large'
                                icon={<PlusCircleOutlined />}
                                onClick={handleAddClick}
                            >
                                Добавить вакансию
                            </Button>
                        </div>





                        <Row>
                            <Col md={!Number.isNaN(pageId) ? 7 : 24} xs={24}>
                                {
                                    <ListComponent isLoading={isLoading.vacancies} vacancies={data.vacancies} link='my' />
                                }
                            </Col>
                            <Col md={!Number.isNaN(pageId) ? 17 : 0} xs={24}>
                                {
                                    (!Number.isNaN(pageId)) && <InfoComponent isLoading={isLoading.vacancy} vacancy={data.vacancy} edit={true} HandleDeleteClick={HandleDeleteClick} HandleEditClick={HandleEditClick} />
                                }
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={<span><BarChartOutlined />Статистика</span>} key="2">
                        <MyStatisticsPage />
                    </TabPane>
                </Tabs>

            </div>


        </>
    )
}

export default MyPage;
