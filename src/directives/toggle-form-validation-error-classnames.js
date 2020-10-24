import isNull from 'lodash/isNull';

const toggleFormValidationErrorClassNames = (responseData, wrapperElement, strategyHelpers, formBusConfig) => {
    const directiveElement = wrapperElement.querySelector(`[${formBusConfig.directives.formValidationErrorClassNames}]`);

    if (isNull(directiveElement)) {
        return;
    }

    const classNames = formBusConfig.classNames.formValidationError.split(' ');
    const classListAction = strategyHelpers.isFormValidationError(responseData) ? 'add' : 'remove';

    directiveElement.classList[classListAction](...classNames);
};

export default toggleFormValidationErrorClassNames;
