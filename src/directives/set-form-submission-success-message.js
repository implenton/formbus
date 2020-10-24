import isNull from 'lodash/isNull';

const setFormSubmissionSuccessMessage = (responseData, wrapperElement, strategyHelpers, formBusConfig) => {
    const directiveElement = wrapperElement.querySelector(`[${formBusConfig.directives.formSubmissionSuccessMessage}]`);

    if (isNull(directiveElement)) {
        return;
    }

    directiveElement.innerHTML = strategyHelpers.getFormSubmissionSuccessMessage(responseData);
};

export default setFormSubmissionSuccessMessage;
