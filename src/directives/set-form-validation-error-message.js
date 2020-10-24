import isNull from 'lodash/isNull';

const setFormValidationErrorMessage = (responseData, wrapperElement, strategyHelpers, formBusConfig) => {
    const directiveElement = wrapperElement.querySelector(`[${formBusConfig.directives.formValidationErrorMessage}]`);

    if (isNull(directiveElement)) {
        return;
    }

    directiveElement.innerHTML = strategyHelpers.getFormValidationErrorMessage(responseData);
};

export default setFormValidationErrorMessage;
