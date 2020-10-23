import head from 'lodash/head';
import isBool from 'lodash/isBoolean';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';

const CONFIRMATION_MESSAGE_KEY = 'confirmation_message';
const IS_VALID_KEY = 'is_valid';
const VALIDATION_MESSAGES_KEY = 'validation_messages';

const getValidationErrorKeyFromFieldName = (fieldName) => {
    const fieldNameWithoutPrefix = fieldName.replace('input_', '');
    const fieldNameParts = fieldNameWithoutPrefix.split('_');

    return head(fieldNameParts);
};

const getFieldValidationErrorMessage = (response, fieldName) => {
    if (!isFieldValidationError(response, fieldName)) {
        return null;
    }

    const validationErrorKey = getValidationErrorKeyFromFieldName(fieldName);

    return response[VALIDATION_MESSAGES_KEY][validationErrorKey];
};

const getFormSubmissionErrorMessage = (response = {}) => {
    if (!isFormSubmissionError(response)) {
        return null;
    }

    return 'There was a problem with your submission. Try again later.';
};

const getFormSubmissionSuccessMessage = (response = {}) => {
    if (!isFormSubmissionSuccess(response)) {
        return null;
    }

    if (isUndefined(response[CONFIRMATION_MESSAGE_KEY])) {
        return 'Your submission was successful. Thank you.';
    }

    return response[CONFIRMATION_MESSAGE_KEY];
};

const getFormValidationErrorMessage = (response = {}) => {
    if (!isFormValidationError(response)) {
        return null;
    }

    return 'There was a problem with your submission. Please review the fields below.';
};

const isFieldValidationError = (response, fieldName) => {
    if (!isFormValidationError(response)) {
        return false;
    }

    const validationErrorKey = getValidationErrorKeyFromFieldName(fieldName);

    if (isUndefined(response[VALIDATION_MESSAGES_KEY][validationErrorKey])) {
        return false;
    }

    if (isEmpty(response[VALIDATION_MESSAGES_KEY][validationErrorKey])) {
        return false;
    }

    return true;
};

const isFormSubmissionError = (response = {}) => {
    if (isUndefined(response[IS_VALID_KEY])) {
        return false;
    }

    if (!isBool(response[IS_VALID_KEY])) {
        return false;
    }

    if (response[IS_VALID_KEY] === true) {
        return false;
    }

    return true;
};

const isFormSubmissionSuccess = (response = {}) => {
    if (isUndefined(response[IS_VALID_KEY])) {
        return false;
    }

    if (!isBool(response[IS_VALID_KEY])) {
        return false;
    }

    if (response[IS_VALID_KEY] === false) {
        return false;
    }

    return true;
};

const isFormValidationError = (response = {}) => {
    if (isUndefined(response[VALIDATION_MESSAGES_KEY])) {
        return false;
    }

    if (isEmpty(response[VALIDATION_MESSAGES_KEY])) {
        return false;
    }

    return true;
};

const gravityFormsStrategy = {
    getFieldValidationErrorMessage,
    getFormSubmissionErrorMessage,
    getFormSubmissionSuccessMessage,
    getFormValidationErrorMessage,
    isFieldValidationError,
    isFormSubmissionError,
    isFormSubmissionSuccess,
    isFormValidationError
};

export default gravityFormsStrategy;
