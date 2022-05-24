import { Form, Formik } from "formik";
import InputComponent from "./form/input-component";
import { Row, Col, Button, Collapse } from "antd"
import SelectComponent from "./form/select-component";
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { cityOptions, levelOptions, specializationOptions } from "../data/options";
import * as Yup from 'yup';

const { Panel } = Collapse;

const initialData = {
    search: {
        text: '',
        specialization: null,
        city: null,
        level: null,
        salary: null,
    }
}

const validationSchema = Yup.object({
    search: Yup.object().shape({
        salary: Yup.number().moreThan(0, "Введите положительное число").notRequired().nullable(),
    }),
});

const FormSearch = ({ onSubmit }) => {

    return <div>
        <Formik
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                ({ errors, values, touched }) => {

                    return (
                        <div className='form'>
                            <Form>
                                <Row>
                                    <Col md={24} xs={24}>
                                        <Row gutter={50}>
                                            <Col md={24} xs={24}>
                                                <InputComponent prefix={<SearchOutlined />} type="search" size="large" name="search.text" placeholder="Введите должность, название компании или технологию" allowClear={true} />
                                            </Col>
                                        </Row>
                                        <Collapse size="large">
                                            <Panel header="Расширенный поиск" key="1">
                                                <Row gutter={50}>
                                                    <Col md={12} xs={24}>
                                                        Специализация
                                                        <SelectComponent name="search.specialization" options={specializationOptions} size="large" placeholder="Выберите специализацию" showSearch={true} allowClear={true} />
                                                    </Col>
                                                    <Col md={12} xs={24}>
                                                        Город
                                                        <SelectComponent name="search.city" options={cityOptions} size="large" placeholder="Выберите город" showSearch={true} allowClear={true} />
                                                    </Col>
                                                </Row>
                                                <Row gutter={50}>
                                                    <Col md={12} xs={24}>
                                                        Уровень
                                                        <SelectComponent name="search.level" options={levelOptions} size="large" placeholder="Выберите уровень" showSearch={true} allowClear={true} />
                                                    </Col>
                                                    <Col md={12} xs={24}>
                                                        Зарплата $
                                                        <InputComponent type="number" size="large" step={100} name="search.salary" placeholder="Зарплата $" allowClear={true} />
                                                    </Col>
                                                </Row>
                                            </Panel>
                                        </Collapse>
                                        <div className="form__submit">
                                            <Button size="large" shape="round" icon={<RedoOutlined />} type="secondary" htmlType="reset">Сбросить</Button>
                                            <Button size="large" shape="round" icon={<SearchOutlined />} type="primary" htmlType="submit">Поиск</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    )
                }
            }
        </Formik>
    </div>
}

export default FormSearch;