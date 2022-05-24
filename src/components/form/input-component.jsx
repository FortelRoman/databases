import { Input } from "antd";
import { Field, ErrorMessage } from "formik";
import ErrorText from "./error-component"

const InputComponent = ({
    name,
    type = 'text',
    label,
    placeholder,
    disabled,
    allowClear,
    size = 'default',
    prefix,
    step
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
                            <Input
                                {...field}
                                id={name}
                                name={name}
                                type={type}
                                size={size}
                                placeholder={placeholder}
                                disabled={disabled}
                                allowClear={allowClear}
                                className={className}
                                prefix={prefix}
                                step={step}
                            />
                        )
                    }
                }
            </Field>
            <ErrorMessage name={name} component={ErrorText} />
        </div>
    )
}

export default InputComponent;