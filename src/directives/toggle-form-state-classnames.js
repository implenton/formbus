import isNull from 'lodash/isNull';

const toggleFormStateClassNames = (responseData, wrapperElement, strategyHelpers, formBusConfig) => {
    const directiveElement = wrapperElement.querySelector(`[${formBusConfig.directives.formStateClassNames}]`);

    if (isNull(directiveElement)) {
        return;
    }

    const formValidationErrorClassNames = formBusConfig.classNames.formValidationError.split(' ');
    const formSubmissionErrorClassNames = formBusConfig.classNames.formSubmissionError.split(' ');
    const formSubmissionSuccessClassNames = formBusConfig.classNames.formSubmissionSuccess.split(' ');

    directiveElement.classList.remove(...[
        ...formValidationErrorClassNames,
        ...formSubmissionErrorClassNames,
        ...formSubmissionSuccessClassNames
    ]);

    if (strategyHelpers.isFormValidationError(responseData)) {
        directiveElement.classList.add(...formValidationErrorClassNames);
    }

    if (strategyHelpers.isFormSubmissionError(responseData)) {
        directiveElement.classList.add(...formSubmissionErrorClassNames);
    }

    if (strategyHelpers.isFormSubmissionSuccess(responseData)) {
        directiveElement.classList.add(...formSubmissionSuccessClassNames);
    }
};

export default toggleFormStateClassNames;
