import isNull from 'lodash/isNull';

const setFormStateMessage = (responseData, wrapperElement, strategyHelpers, formBusConfig) => {
    const directiveElement = wrapperElement.querySelector(`[${formBusConfig.directives.formStateMessage}]`);

    if (isNull(directiveElement)) {
        return;
    }

    directiveElement.innerHTML = null;

    if (strategyHelpers.isFormValidationError(responseData)) {
        directiveElement.innerHTML = strategyHelpers.getFormValidationErrorMessage(responseData);
    }

    if (strategyHelpers.isFormSubmissionError(responseData)) {
        directiveElement.innerHTML = strategyHelpers.getFormSubmissionErrorMessage(responseData);
    }

    if (strategyHelpers.isFormSubmissionSuccess(responseData)) {
        directiveElement.innerHTML = strategyHelpers.getFormSubmissionSuccessMessage(responseData);
    }
};

export default setFormStateMessage;
