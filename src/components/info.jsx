
import { Button, Col, Row } from 'antd';
import Spinner from './spinner/spinner';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import myService from '../services/my';

import { Typography } from 'antd';
const { Text, Link, Title } = Typography;

const InfoComponent = ({ isLoading, vacancy, edit = false, HandleDeleteClick, HandleEditClick }) => {

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            {
                vacancy && (
                    <div className='info'>
                        <Title className='info__title' level={1}>{vacancy.vacancy}</Title>

                        {
                            edit ?
                                <div className='info__buttons'>
                                    <div className='info__buttons-container'>
                                        <Button onClick={HandleEditClick} size='large' shape="circle" type="default" icon={<EditOutlined />}></Button>
                                        <Button onClick={HandleDeleteClick} size='large' shape="circle" type='default' icon={<DeleteOutlined />}></Button>
                                    </div>
                                </div>
                                : <></>
                        }

                        <div className='info__block'>
                            <Row>
                                <Col md={12} xl={12}>
                                    <Text>Компания: </Text>
                                    <Text strong={true}>{vacancy.company}</Text>
                                </Col>
                                <Col md={12} xl={12}>
                                    <Link href={vacancy.link}>{vacancy.link}</Link>
                                </Col>
                            </Row>
                        </div>

                        <Row>
                            <Col md={12} xl={12}>
                                <Text>Специализация: </Text>
                                <Text strong={true}>{vacancy.specialization}</Text>
                            </Col>
                            <Col md={12} xl={12}>
                                <Text>Город: </Text>
                                <Text strong={true}>{vacancy.city}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} xl={12}>
                                <Text>Уровень: </Text>
                                <Text strong={true}>{vacancy.level}</Text>
                            </Col>
                            <Col md={12} xl={12}>
                                <Text>Режим работы: </Text>
                                <Text strong={true}>{vacancy.work_time}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} xl={12}>
                                <Text>Опыт: </Text>
                                <Text strong={true}>{vacancy.experience}</Text>
                            </Col>
                            <Col md={12} xl={12}>
                                <Text>Размер компании: </Text>
                                <Text strong={true}>{Number(vacancy.company_size)}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} xl={12}>
                                <Text>Уровень английского: </Text>
                                <Text strong={true}>{vacancy.english_level}</Text>
                            </Col>
                            <Col md={12} xl={12}>
                                <Text>Возможна удаленная работа: </Text>
                                <Text strong={true}>{vacancy.distance_work}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} xl={12}>
                                <Text>Зарплата: </Text>
                                {
                                    (+vacancy.salary_from !== -1 && +vacancy.salary_to !== -1) && <Text strong={true}>{+vacancy.salary_from}$ - {+vacancy.salary_to}$</Text>
                                }
                                {
                                    (+vacancy.salary_from === -1 && +vacancy.salary_to !== -1) && <Text strong={true}>{'до ' + +vacancy.salary_to + '$'}</Text>
                                }
                                {
                                    (+vacancy.salary_from !== -1 && +vacancy.salary_to === -1) && <Text strong={true}>{'от ' + +vacancy.salary_from + ' $'}</Text>
                                }
                                {
                                    (+vacancy.salary_from === -1 && +vacancy.salary_to === -1) && <Text strong={true}>Не указана</Text>
                                }

                            </Col>
                        </Row>

                        <div className='info__skills'>
                            {
                                vacancy.skills.map((el) => (
                                    (el.value !== 'Не требуются') && <Text size="large" code>{el.value}</Text>
                                ))
                            }
                        </div>

                        <div dangerouslySetInnerHTML={{ __html: vacancy.description }}></div>

                    </div>
                )
            }
        </>
    )
}

export default InfoComponent;
