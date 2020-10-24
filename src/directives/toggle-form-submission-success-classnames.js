import isNull from 'lodash/isNull';

const toggleFormSubmissionSuccessClassNames = (responseData, wrapperElement, strategyHelpers, formBusConfig) => {
    const directiveElement = wrapperElement.querySelector(`[${formBusConfig.directives.formSubmissionSuccessClassNames}]`);

    if (isNull(directiveElement)) {
        return;
    }

    const classNames = formBusConfig.classNames.formSubmissionSuccess.split(' ');
    const classListAction = strategyHelpers.isFormSubmissionSuccess(responseData) ? 'add' : 'remove';

    directiveElement.classList[classListAction](...classNames);
};

export default toggleFormSubmissionSuccessClassNames;
