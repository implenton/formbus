import setFieldsValidationErrorMessage from '../directives/set-fields-validation-error-message';
import setFormSubmissionErrorMessage from '../directives/set-form-submission-error-message';
import setFormSubmissionSuccessMessage from '../directives/set-form-submission-success-message';
import setFormValidationErrorMessage from '../directives/set-form-validation-error-message';
import toggleFieldsValidationErrorClassNames from '../directives/toggle-fields-validation-error-classnames';
import toggleFormSubmissionErrorClassNames from '../directives/toggle-form-submission-error-classnames';
import toggleFormSubmissionSuccessClassNames from '../directives/toggle-form-submission-success-classnames';
import toggleFormValidationErrorClassNames from '../directives/toggle-form-validation-error-classnames';

const directivesHandlerMap = {
    fieldsValidationErrorClassNames: setFieldsValidationErrorMessage,
    fieldsValidationErrorMessage: toggleFieldsValidationErrorClassNames,
    formSubmissionErrorClassNames: toggleFormSubmissionErrorClassNames,
    formSubmissionErrorMessage: setFormSubmissionErrorMessage,
    formSubmissionSuccessClassNames: toggleFormSubmissionSuccessClassNames,
    formSubmissionSuccessMessage: setFormSubmissionSuccessMessage,
    formValidationErrorClassNames: toggleFormValidationErrorClassNames,
    formValidationErrorMessage: setFormValidationErrorMessage
};

export default directivesHandlerMap;
