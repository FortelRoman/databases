import { Col, Row, Statistic, Table, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import Diagramm from "../components/diagramm";
import devbyService from "../services/devby";
import { LineChartOutlined, BorderlessTableOutlined } from '@ant-design/icons';
import Statistics from "../components/statistic";


const {Title} = Typography;
const { TabPane } = Tabs;

const DevbyStatisticsPage = () => {

    const [data, setData] = useState()

    const getLevelCount = async () => {

        const item = await devbyService.getLevelCount();
        setData(items => ({ ...items, levelCount: item }))
    }

    const getCityCount = async () => {

        const item = await devbyService.getCityCount();
        setData(items => ({ ...items, cityCount: item }))
    }

    const getExperienceCount = async () => {

        const item = await devbyService.getExperienceCount();
        setData(items => ({ ...items, experienceCount: item }))
    }

    const getEnglishCount = async () => {

        const item = await devbyService.getEnglishCount();
        setData(items => ({ ...items, englishCount: item }))
    }

    const getVacanciesCount = async () => {
        const count = await devbyService.getCount('vacancy');
        setData(items => ({ ...items, vacanciesCount: count }))
    }

    const getSpecializationCount = async () => {
        const count = await devbyService.getSpecializationCount();
        setData(items => ({ ...items, specializationCount: count }))
    }

    const getSpecializationsCount = async () => {
        const count = await devbyService.getCount('specialization');
        setData(items => ({ ...items, specializationsCount: count }))
    }

    const getCompaniesCount = async () => {
        const count = await devbyService.getCount('company');
        setData(items => ({ ...items, companiesCount: count }))
    }

    const getAverageStartSalary = async () => {
        const count = await devbyService.getAverageStartSalary();
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

export default DevbyStatisticsPage;
