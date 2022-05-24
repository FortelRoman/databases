import { Col, Row, Statistic, Table, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import Diagramm from "../components/diagramm";
import myService from "../services/my";
import { LineChartOutlined, BorderlessTableOutlined } from '@ant-design/icons';
import Statistics from "../components/statistic";
const { TabPane } = Tabs;
const {Title} = Typography;

const MyStatisticsPage = () => {

    const [data, setData] = useState()

    const getLevelCount = async () => {

        const item = await myService.getLevelCount();
        setData(items => ({ ...items, levelCount: item }))
    }

    const getCityCount = async () => {

        const item = await myService.getCityCount();
        setData(items => ({ ...items, cityCount: item }))
    }

    const getExperienceCount = async () => {

        const item = await myService.getExperienceCount();
        setData(items => ({ ...items, experienceCount: item }))
    }

    const getEnglishCount = async () => {

        const item = await myService.getEnglishCount();
        setData(items => ({ ...items, englishCount: item }))
    }

    const getVacanciesCount = async () => {
        const count = await myService.getCount('vacancy');
        setData(items => ({ ...items, vacanciesCount: count }))
    }

    const getSpecializationCount = async () => {
        const count = await myService.getSpecializationCount();
        setData(items => ({ ...items, specializationCount: count }))
    }

    const getSpecializationsCount = async () => {
        const count = await myService.getCount('specialization');
        setData(items => ({ ...items, specializationsCount: count }))
    }

    const getCompaniesCount = async () => {
        const count = await myService.getCount('company');
        setData(items => ({ ...items, companiesCount: count }))
    }

    const getAverageStartSalary = async () => {
        const count = await myService.getAverageStartSalary();
        setData(items => ({ ...items, averageSalary: count }))
    }


    useEffect(() => {
        getLevelCount();
        getExperienceCount();
        getVacanciesCount();
        getSpecializationsCount();
        getCompaniesCount();
        getCityCount();
        getEnglishCount();
        getAverageStartSalary();
        getSpecializationCount();
    }, [])



    return (
        <div className="page__container">
            <Title level={1}>Статистика</Title>
            <Statistics data={data} />
        </div >
    )
}

export default MyStatisticsPage;
