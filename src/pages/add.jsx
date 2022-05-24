// import './style.less';
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import InputComponent from "../components/form/input-component";
import { Row, Col, Button } from "antd"
import SelectComponent from "../components/form/select-component";
import CheckboxComponent from "../components/form/checkbox-component";
import DinamicInputComponent from "../components/form/dinamic-input-component";
import myService from "../services/my";
import { useNavigate } from "react-router";
import QuillComponent from "../components/form/quill-component";
import { cityOptions, englishOptions, experienceOptions, levelOptions, specializationOptions, timeWorkOptions } from "../data/options";

const initialData = {
    vacancy: {
        vacancy: '',
        specialization: undefined,
        salary_from: undefined,
        salar_to: undefined,
        level: undefined,
        experience: undefined,
        english_level: undefined,
        city: undefined,
        work_time: undefined,
        company: '',
        company_size: undefined,
        distance_work: false,
        skills: [],
        description: '',
    }
}

const validationSchema = Yup.object({
    
    vacancy: Yup.object().shape({
        vacancy: Yup.string().required("Обязательно для заполнения"),
        specialization: Yup.string().required("Обязательно для заполнения"),
        salary_from: Yup.number().required("Обязательно для заполнения").moreThan(0, "Только положительное"),
        salary_to: Yup.string().test('Должно быть больше, чем <Зарплата от>', 'Должно быть больше, чем <Зарплата от>', function(value) {
            const otherFieldValue = this.parent.salary_from
            if (!otherFieldValue) {
              return true;
            }
            return value > otherFieldValue;
          }),
        level: Yup.string().required("Обязательно для заполнения"),
        experience: Yup.string().required("Обязательно для заполнения"),
        english_level: Yup.string().required("Обязательно для заполнения"),
        city: Yup.string().required("Обязательно для заполнения"),
        work_time: Yup.string().required("Обязательно для заполнения"),
        company: Yup.string().required("Обязательно для заполнения"),
        company_size: Yup.number().required("Обязательно для заполнения").moreThan(0, "Только положительное"),
        distance_work: Yup.boolean(),
        skills: Yup.array().of(Yup.object().shape({
            value: Yup.string().required("Обязательно для заполнения"),
        })),
        description: Yup.string().required("Обязательно для заполнения")
    }),
});


const AddPage = () => {

    const navigate = useNavigate();


    const onCancelClick = () => {
        navigate('/my')
    }

    const onSubmit = async (values, props) => {
        const newId = await myService.createVacancy(values.vacancy);
        navigate('/my/' + Number(newId))
        props.setSubmitting(true);
    }

    return <>
        <Formik
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                ({ isValid, isSubmitting, errors, values, touched }) => {

                    return (
                        <div className="form form__add">
                            <h1>Добавление вакансии</h1>
                            <Form>
                                <h2>Компания</h2>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Название компании
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <InputComponent size="large" name="vacancy.company" placeholder="Введите название вакансии" allowClear={true} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Размер компании
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <InputComponent size="large" type="number" name="vacancy.company_size" placeholder="Введите размер компании" allowClear={true} />
                                    </Col>
                                </Row>
                                <h2>Вакансия</h2>

                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Название
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <InputComponent size="large" name="vacancy.vacancy" placeholder="Введите название вакансии" allowClear={true} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Специализация
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <SelectComponent size="large" name="vacancy.specialization" options={specializationOptions} placeholder="Выберите специализацию" showSearch={true} />
                                    </Col>
                                </Row>




                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Город
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <SelectComponent size="large" name="vacancy.city" options={cityOptions} placeholder="Выберите город" showSearch={true} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Режим работы
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <SelectComponent size="large" name="vacancy.work_time" options={timeWorkOptions} placeholder="Выберите режим работы" showSearch={true} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8} xs={8} className="form__label form__label--left">
                                        Возможна удаленная работа
                                    </Col>
                                    <Col md={16} xs={16} className="form__checkbox">
                                        <CheckboxComponent size="large" name="vacancy.distance_work" value={true} />
                                    </Col>
                                </Row>





                                <h2>Требования</h2>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Уровень
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <SelectComponent size="large" name="vacancy.level" options={levelOptions} placeholder="Выберите уровень" showSearch={true} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Опыт
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <SelectComponent size="large" name="vacancy.experience" options={experienceOptions} placeholder="Выберите опыт" showSearch={true} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Уровень английского
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <SelectComponent size="large" name="vacancy.english_level" options={englishOptions} placeholder="Выберите уровень английского" showSearch={true} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={24} xs={24} className="form__label form__label--left">
                                        Навыки
                                    </Col>
                                    <Col md={24} xs={24} className="form__checkbox">
                                        <DinamicInputComponent size="large" name='vacancy.skills' />
                                    </Col>
                                </Row>


                                <h2>Зарплата $</h2>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Зарплата от
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <InputComponent size="large" name="vacancy.salary_from" type="number" placeholder="Зарплата от $" showSearch={true} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8} xs={8} className="form__label">
                                        Зарплата до
                                    </Col>
                                    <Col md={16} xs={16}>
                                        <InputComponent size="large" name="vacancy.salary_to" type="number" placeholder="Зарплата до $" showSearch={true} />
                                    </Col>
                                </Row>

                                <h2>Описание</h2>
                                <Row>
                                    <Col md={24} xs={24} className="form__description">
                                        <QuillComponent name="vacancy.description" placeholder="Введите описание проекта" />
                                    </Col>
                                </Row>

                                <div className="form__submit">
                                    <Button type="secondary" onClick={onCancelClick} >Отмена</Button>
                                    <Button type="primary" htmlType="submit">Добавить</Button>
                                </div>
                            </Form>
                        </div>
                    )
                }
            }
        </Formik>
    </>
}

export default AddPage;