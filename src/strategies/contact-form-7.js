import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';

const INVALID_FIELDS_KEY = 'invalid_fields';
const MESSAGE_KEY = 'message';
const STATUS_KEY = 'status';

const MAIL_FAILED_STATUS = 'mail_failed';
const MAIL_SENT_STATUS = 'mail_sent';
const VALIDATION_FAILED_STATUS = 'validation_failed';

const extractFieldNameFromValidationMessageInto = (message) => {
    return message.into.replace('span.wpcf7-form-control-wrap.', '');
};

const getFieldValidationErrorMessage = (response, fieldName) => {
    if (!isFieldValidationError(response, fieldName)) {
        return null;
    }

    const foundValidationError = response[INVALID_FIELDS_KEY].filter(message => {
        const messageKey = extractFieldNameFromValidationMessageInto(message);

        return messageKey === fieldName;
    });

    return head(foundValidationError).message;
};

const getFormSubmissionErrorMessage = (response) => {
    if (isUndefined(response[MESSAGE_KEY])) {
        return null;
    }

    if (!isFormSubmissionError(response)) {
        return null;
    }

    return response[MESSAGE_KEY];
};

const getFormSubmissionSuccessMessage = (response) => {
    if (isUndefined(response[MESSAGE_KEY])) {
        return null;
    }

    if (!isFormSubmissionSuccess(response)) {
        return null;
    }

    return response[MESSAGE_KEY];
};

const getFormValidationErrorMessage = (response) => {
    if (isUndefined(response[MESSAGE_KEY])) {
        return null;
    }

    if (!isFormValidationError(response)) {
        return null;
    }

    return response[MESSAGE_KEY];
};

const isFieldValidationError = (response, fieldName) => {
    if (!isFormValidationError(response)) {
        return false;
    }

    if (isEmpty(response[INVALID_FIELDS_KEY])) {
        return false;
    }

    const foundValidationError = response[INVALID_FIELDS_KEY].filter(message => {
        const messageKey = extractFieldNameFromValidationMessageInto(message);

        return messageKey === fieldName;
    });

    if (isEmpty(foundValidationError)) {
        return false;
    }

    return true;
};

const isFormSubmissionError = (response) => {
    if (isUndefined(response[STATUS_KEY])) {
        return false;
    }

    if (response[STATUS_KEY] !== MAIL_FAILED_STATUS) {
        return false;
    }

    return true;
};

const isFormSubmissionSuccess = (response) => {
    if (isUndefined(response[STATUS_KEY])) {
        return false;
    }

    if (response[STATUS_KEY] !== MAIL_SENT_STATUS) {
        return false;
    }

    return true;
};

const isFormValidationError = (response) => {
    if (isUndefined(response[STATUS_KEY]) || isUndefined(response[INVALID_FIELDS_KEY])) {
        return false;
    }

    if (response[STATUS_KEY] !== VALIDATION_FAILED_STATUS) {
        return false;
    }

    return true;
};

const contactForm7Strategy = {
    getFieldValidationErrorMessage,
    getFormSubmissionErrorMessage,
    getFormSubmissionSuccessMessage,
    getFormValidationErrorMessage,
    isFieldValidationError,
    isFormSubmissionError,
    isFormSubmissionSuccess,
    isFormValidationError
};

export default contactForm7Strategy;
