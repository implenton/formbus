import isNull from 'lodash/isNull';

const toggleFormSubmissionErrorClassNames = (responseData, wrapperElement, strategyHelpers, formBusConfig) => {
    const directiveElement = wrapperElement.querySelector(`[${formBusConfig.directives.formSubmissionErrorClassNames}]`);

    if (isNull(directiveElement)) {
        return;
    }

    const classNames = formBusConfig.classNames.formSubmissionError.split(' ');
    const classListAction = strategyHelpers.isFormSubmissionError(responseData) ? 'add' : 'remove';

    directiveElement.classList[classListAction](...classNames);
};

export default toggleFormSubmissionErrorClassNames;
