import isNull from 'lodash/isNull';

const setFormSubmissionErrorMessage = (responseData, wrapperElement, strategyHelpers, formBusConfig) => {
    const directiveElement = wrapperElement.querySelector(`[${formBusConfig.directives.formSubmissionErrorMessage}]`);

    if (isNull(directiveElement)) {
        return;
    }

    directiveElement.innerHTML = strategyHelpers.getFormSubmissionErrorMessage(responseData);
};

export default setFormSubmissionErrorMessage;
