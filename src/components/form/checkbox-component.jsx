import { Checkbox } from "antd"
import { ErrorMessage, Field } from "formik"
import React from "react"
import ErrorComponent from "./error-component"

const CheckboxComponent = ({
    label,
    name,
    disabled,
    size
}) => {

    return (
        <div className='form__control'>
            <Field name={name}>
                {
                    ({ field }) => {

                        return (
                            <Checkbox
                                {...field}
                                name={name}
                                id={field.name}
                                checked={field.value}
                                disabled={disabled}
                                size={size}
                            >
                                {
                                    label && <label htmlFor={field.name}>{label}</label>
                                }
                            </Checkbox>
                        )
                    }
                }
            </Field>
            <ErrorMessage component={ErrorComponent} name={name} />
        </div>
    )
}

export default CheckboxComponent;