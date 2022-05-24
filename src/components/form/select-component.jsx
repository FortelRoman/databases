import { ErrorMessage, Field } from "formik";
import ErrorComponent from "./error-component";
import { Select } from "antd";
const { Option } = Select;

const SelectComponent = ({
    label,
    name = '',
    options,
    multiple,
    placeholder = '',
    showSearch,
    disabled,
    allowClear,
    size
}) => {

    const filterOption = (input, option) => {
        return (option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0)
    }

    return (
        <div className="form__control">
            {label && <label htmlFor={name}>{label}</label>}
            <Field name={name} id={name}>
                {
                    ({ form: { setFieldValue, setFieldTouched }, field: { value }, meta: { error, touched } }) => {

                        const className = touched && error ? 'form__select form__error' : 'form__select';
                        const mode = multiple ? 'multiple' : undefined;

                        const onChange = (value) => {
                            setFieldValue(name, value)
                        }

                        const onBlur = (_event) => {
                            setFieldTouched(name)
                        }

                        return (
                            <Select
                                placeholder={placeholder}
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                mode={mode}
                                size={size}
                                showSearch={showSearch}
                                filterOption={filterOption}
                                disabled={disabled}
                                className={className}
                                allowClear={allowClear}
                            >
                                {
                                    options.map((option) => (
                                        <Option key={option.value} value={option.value} disabled={option.disabled}>{option.key}</Option>
                                    ))
                                }
                            </Select>
                        )
                    }
                }
            </Field>
            <ErrorMessage name={name} component={ErrorComponent} />
        </div >
    )
}

export default SelectComponent;