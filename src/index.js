import FormBus from './formbus';
import gravityFormsStrategy from './strategies/gravity-forms';
import contactForm7Strategy from './strategies/contact-form-7';

export const gravityFormsBus = (selectorOrElement, formBusUserConfig = {}) => {
    return FormBus(selectorOrElement, gravityFormsStrategy, formBusUserConfig);
};

export const contactForm7Bus = (selectorOrElement, formBusUserConfig = {}) => {
    return FormBus(selectorOrElement, contactForm7Strategy, formBusUserConfig);
};
