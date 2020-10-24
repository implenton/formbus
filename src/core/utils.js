import difference from 'lodash/difference';
import isElement from 'lodash/isElement';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import isString from 'lodash/isString';
import keys from 'lodash/keys';
import merge from 'lodash/merge';

const INVALID_SELECTOR_TYPE_ERROR_MESSAGE = 'Invalid selector provided. It must be a CSS selector or HTML element.';
const SELECTOR_DOES_NOT_MATCH_ELEMENT_ERROR_MESSAGE = 'No element matches the CSS selector.';
const NO_FORM_ELEMENT_FOUND_ERROR_MESSAGE = 'No form found inside the wrapper element.';

export const getTrackedElements = (selectorOrElement) => {
    if (!isString(selectorOrElement) && !isElement(selectorOrElement)) {
        throw new Error(INVALID_SELECTOR_TYPE_ERROR_MESSAGE);
    }

    let wrapper;

    if (isElement(selectorOrElement)) {
        wrapper = selectorOrElement;
    }

    if (isString(selectorOrElement)) {
        wrapper = document.querySelector(selectorOrElement);

        if (isNull(wrapper)) {
            throw new Error(SELECTOR_DOES_NOT_MATCH_ELEMENT_ERROR_MESSAGE);
        }
    }

    if (wrapper.tagName === 'FORM') {
        return [wrapper, wrapper];
    }

    const form = wrapper.querySelector('form');

    if (isNull(form)) {
        throw new Error(NO_FORM_ELEMENT_FOUND_ERROR_MESSAGE);
    }

    return [wrapper, form];
};

export const sendRequest = async (
    url,
    body = null,
    method = 'POST',
    requestUserConfig = {}
) => {
    const config = merge({}, {
        body,
        method
    }, requestUserConfig);

    const response = await fetch(url, config);

    return await response.json();
};

export const dispatchCustomEvent = (element, key, detail = null) => {
    const event = new CustomEvent(key, { detail });

    element.dispatchEvent(event);
};

export const isEveryStategyMethodDefined = (strategy = {}) => {
    if (isEmpty(strategy)) {
        return false;
    }

    const expectedMethods = [
        'getFieldValidationErrorMessage',
        'getFormSubmissionErrorMessage',
        'getFormSubmissionSuccessMessage',
        'getFormValidationErrorMessage',
        'isFieldValidationError',
        'isFormSubmissionError',
        'isFormSubmissionSuccess',
        'isFormValidationError'
    ];
    const definedMethods = keys(strategy);

    return difference(expectedMethods, definedMethods).length === 0;
};
