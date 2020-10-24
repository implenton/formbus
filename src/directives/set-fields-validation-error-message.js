import isEmpty from 'lodash/isEmpty';

const setFieldsValidationErrorMessage = (responseData, wrapperElement, strategyHelpers, formBusConfig) => {
    const directiveElements = wrapperElement.querySelectorAll(`[${formBusConfig.directives.fieldValidationErrorMessage}]`);

    if (isEmpty(directiveElements)) {
        return;
    }

    directiveElements.forEach(directiveElement => {
        const fieldName = directiveElement.getAttribute(formBusConfig.directives.fieldValidationErrorMessage);

        directiveElement.innerHTML = strategyHelpers.getFieldValidationErrorMessage(responseData, fieldName);
    });
};

export default setFieldsValidationErrorMessage;
