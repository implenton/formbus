import merge from 'lodash/merge';
import defaultConfig from './core/default-config';
import directivesHandlerMap from './core/directives-handler-map';
import { dispatchCustomEvent, getTrackedElements, isEveryStrategyMethodDefined, sendRequest } from './core/utils';

const FormBus = (selectorOrElement, strategy = {}, formBusUserConfig = {}) => {
    let formBusConfig = null;
    let trackedWrapper = null;
    let trackedForm = null;

    const init = () => {
        if (!isEveryStrategyMethodDefined(strategy)) {
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
        const formBody = new FormData(form);
        const { action, method } = form;

        dispatchCustomEvent(trackedWrapper, 'beforeFormBusRequest', formBody);

        const response = sendRequest(action, formBody, method, formBusConfig.request);

        response.then((responseData) => {
            for (const directive in directivesHandlerMap) {
                directivesHandlerMap[directive](responseData, trackedWrapper, strategy, formBusConfig);
            }

            dispatchCustomEvent(trackedWrapper, 'afterFormBusResponse', responseData);
        });
    };

    return {
        init,
        destroy,
        responseHelpers: strategy
    };
};

export default FormBus;
