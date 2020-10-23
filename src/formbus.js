import merge from 'lodash/merge';
import defaultConfig from './core/default-config';
import { dispatchCustomEvent, getTrackedElements, isEveryStategyMethodDefined, postRequest } from './core/utils';

const FormBus = (selectorOrElement, strategy = {}, formBusUserConfig = {}) => {
    let formBusConfig = null;
    let trackedWrapper = null;
    let trackedForm = null;

    const init = () => {
        if (!isEveryStategyMethodDefined(strategy)) {
            throw new Error('Invalid strategy. Make sure you implement all methods.');
        }

        const [wrapper, form] = getTrackedElements(selectorOrElement);

        trackedWrapper = wrapper;
        trackedForm = form;

        formBusConfig = merge({}, defaultConfig, formBusUserConfig);

        trackedForm.addEventListener('submit', onFormSubmit);
    };

    const destroy = () => {
        trackedForm.removeEventListener('submit', onFormSubmit);

        formBusConfig = null;

        trackedForm = null;
        trackedWrapper = null;
    };

    const onFormSubmit = (submitEvent) => {
        submitEvent.preventDefault();

        const form = submitEvent.target;
        const body = new FormData(form);
        const { action, method } = form;

        const response = postRequest(action, body, method, formBusConfig.request.config);

        response.then((data) => {
            dispatchCustomEvent(trackedWrapper, 'formBusResponse', data);
        });
    };

    return {
        init,
        destroy,
        responseHelpers: strategy
    };
};

export default FormBus;
