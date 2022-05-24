// import './style.less';
import { Form, Formik } from "formik";
import InputComponent from "../components/form/input-component";
import { Row, Col, Button } from "antd"
import SelectComponent from "../components/form/select-component";
import CheckboxComponent from "../components/form/checkbox-component";
import DinamicInputComponent from "../components/form/dinamic-input-component";
import myService from "../services/my";
import { useNavigate, useParams } from "react-router";
import QuillComponent from "../components/form/quill-component";
import { cityOptions, englishOptions, experienceOptions, levelOptions, specializationOptions, timeWorkOptions } from "../data/options";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner/spinner";


const EditPage = () => {

    const navigate = useNavigate();

    const [initialData, setInitialData] = useState()

    const { id } = useParams();
    const pageId = Number(id);


    const getVacancy = async () => {
        const data = await myService.getVacancy(pageId);
        setInitialData(data);
    }

    useEffect(() => {
        getVacancy();
    }, [])



    const onCancelClick = () => {
        navigate('/my')
    }

    const onSubmit = async (values, props) => {
        alert(JSON.stringify(values));
        props.setSubmitting(true);

        const newId = await myService.editVacancy(values);
        navigate('/my/' + Number(newId))
    }


    if (!initialData) {
        return <Spinner />
    }

    return <>
        <Formik
            initialValues={initialData ? initialData : null}
            // validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                ({ isValid, isSubmitting, errors, values, touched }) => {

                    return (
                        <div className="form form__add">
                            <h1>Редактирование вакансии</h1>
                            <Form>
                                <h2>Компания</h2>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Название компании
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <InputComponent size="large" name="company" placeholder="Введите название вакансии" allowClear={true} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Размер компании
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <InputComponent size="large" type="number" name="company_size" placeholder="Введите размер компании" allowClear={true} />
                                    </Col>
                                </Row>
                                <h2>Вакансия</h2>

                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Название
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <InputComponent size="large" name="vacancy" placeholder="Введите название вакансии" allowClear={true} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Специализация
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <SelectComponent size="large" name="specialization" options={specializationOptions} placeholder="Выберите специализацию" showSearch={true} />
                                    </Col>
                                </Row>




                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Город
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <SelectComponent size="large" name="city" options={cityOptions} placeholder="Выберите город" showSearch={true} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Режим работы
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <SelectComponent size="large" name="work_time" options={timeWorkOptions} placeholder="Выберите режим работы" showSearch={true} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8} xs={8} className="form__label form__label--left">
                                        Возможна удаленная работа
                                    </Col>
                                    <Col md={16} xs={16} className="form__checkbox">
                                        <CheckboxComponent size="large" name="distance_work" value={true} />
                                    </Col>
                                </Row>





                                <h2>Требования</h2>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Уровень
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <SelectComponent size="large" name="level" options={levelOptions} placeholder="Выберите уровень" showSearch={true} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Опыт
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <SelectComponent size="large" name="experience" options={experienceOptions} placeholder="Выберите опыт" showSearch={true} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Уровень английского
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <SelectComponent size="large" name="english_level" options={englishOptions} placeholder="Выберите уровень английского" showSearch={true} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={24} xs={24} className="form__label form__label--left">
                                        Навыки
                                    </Col>
                                    <Col md={24} xs={24} className="form__checkbox">
                                        <DinamicInputComponent size="large" name='skills' />
                                    </Col>
                                </Row>


                                <h2>Зарплата $</h2>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Зарплата от
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <InputComponent size="large" name="salary_from" type="number" placeholder="Зарплата от $" showSearch={true} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Зарплата до
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <InputComponent size="large" name="salary_to" type="number" placeholder="Зарплата до $" showSearch={true} />
                                    </Col>
                                </Row>

                                <h2>Описание</h2>
                                <Row>
                                    <Col md={24} xs={24} className="form__description">
                                        <QuillComponent name="description" placeholder="Введите описание проекта" />
                                    </Col>
                                </Row>

                                <div className="form__submit">
                                    <Button type="secondary" onClick={onCancelClick}>Отмена</Button>
                                    <Button type="primary" htmlType="submit">Применить</Button>
                                </div>
                            </Form>
                        </div>
                    )
                }
            }
        </Formik>
    </>
}

export default EditPage;