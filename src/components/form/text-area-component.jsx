import {  Field } from "formik";
import { Input } from 'antd';

const { TextArea } = Input;

const TextAreaComponent = ({
    name,
    label,
    placeholder,
    disabled,
    allowClear,
    size
}) => {

    return (
        
        <div className="form__control">
            {
                label && <label htmlFor={name}>{label}</label>
            }
            <Field name={name}>
                {
                    ({ field, meta: { touched, error } }) => {

                        const className = (touched && error) ? 'form__input form__error' : 'form__input';

                        return (
                            <TextArea 
                                {...field}
                                id={name}
                                name={name}
                                placeholder={placeholder}
                                disabled={disabled}
                                allowClear={allowClear}
                                className={className}
                                rows={5}
                                size={size}
                            />
                        )
                    }
                }
            </Field>
            {/* <ErrorMessage name={name} component={ErrorComponent} /> */}
        </div>
    )
}

export default TextAreaComponent;