import isEmpty from 'lodash/isEmpty';

const toggleFieldsValidationErrorClassNames = (responseData, wrapperElement, strategyHelpers, formBusConfig) => {
    const directiveElements = wrapperElement.querySelectorAll(`[${formBusConfig.directives.fieldValidationErrorClassNames}]`);

    if (isEmpty(directiveElements)) {
        return;
    }

    directiveElements.forEach(directiveElement => {
        const fieldName = directiveElement.getAttribute(formBusConfig.directives.fieldValidationErrorClassNames);

        const classNames = formBusConfig.classNames.fieldValidationError.split(' ');
        const classListAction = strategyHelpers.isFieldValidationError(responseData, fieldName) ? 'add' : 'remove';

        directiveElement.classList[classListAction](...classNames);
    });
};

export default toggleFieldsValidationErrorClassNames;
