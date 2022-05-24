const ErrorText = (props) => {

    return (
        <p className="form__error">
            {   
                props.children
            }
        </p>
    )
}

export default ErrorText;