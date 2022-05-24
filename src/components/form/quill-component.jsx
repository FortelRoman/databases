import { ErrorMessage, Field } from "formik";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // ES6
import ErrorText from "./error-component";
// import ErrorComponent from "./error-component";

const QuillComponent = ({
    name,
    label,
    placeholder,
}) => {

    return (
        <div className="form__control">
            {
                label && <label htmlFor={name}>{label}</label>
            }
            <Field name={name}>
                {
                    ({ field: { value }, form: { setFieldTouched, setFieldValue } }) => {

                        const onChange = (value) => {
                            setFieldValue(name, value)
                        }

                        const onBlur = () => {
                            setFieldTouched(name);
                        }

                        return (
                            <>
                                <ReactQuill
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    placeholder={placeholder}
                                    id={name}
                                />
                            </>
                        )
                    }
                }
            </Field >
            <ErrorMessage name={name} component={ErrorText} />
        </div >
    )


}

export default QuillComponent;