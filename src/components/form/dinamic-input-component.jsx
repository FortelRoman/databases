import { Row, Col, Button } from "antd";
import { FieldArray } from "formik";
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { nanoid } from "nanoid";
import InputComponent from "./input-component";


export const getProperty = (obj, path) => {

    let object = JSON.parse(JSON.stringify(obj));

    const pathArray = path.split('.')

    for (var i = 0; i < pathArray.length; i++) {
        object = object[pathArray[i]];
        if (!object) break;
    }
    return object;
}


const DinamicInputComponent = ({ name, size }) => {

    return (
        <FieldArray name={name}>
            {
                ({ push, remove, form: { errors, values } }) => {

                    const items = getProperty(values, name);

                    const onAddClick = () => {
                        push({ id: nanoid() })
                    }

                    return (
                        <>
                            {
                                items.map((item, index) => (
                                    <Row key={item.id}>
                                        <Col md={23} xs={23}>
                                            <InputComponent size={size} name={`${name}[${index}].value`} placeholder="Введите навык" />
                                        </Col>
                                        <Col md={1} xs={1}>
                                            <Button icon={<DeleteOutlined />} className="form__delete" onClick={() => remove(index)}></Button>
                                        </Col>
                                    </Row>
                                ))
                            }
                            <Button
                                type="link"
                                icon={<PlusCircleOutlined />}
                                onClick={onAddClick}>
                                Добавить навык
                            </Button>
                        </>
                    );
                }
            }
        </FieldArray>
    )
}

export default DinamicInputComponent;